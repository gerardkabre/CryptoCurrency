class App {
  constructor() {
    this.getElements();
    this.addEvents();
    this.getData();
  }
  getElements() {
    this.min = document.getElementById("min");
    this.max = document.getElementById("max");
    this.individuals = document.querySelector(".individuals");
  }
  addEvents() {
    this.min.addEventListener("input", this.minEventHandler.bind(this));
    this.max.addEventListener("input", this.maxEventHandler.bind(this));
  }
  minEventHandler(event) {
    var minValue = parseFloat(event.target.value);
    var maxValue = parseFloat(this.max.value);
    this.filterAndDisplayData(minValue, maxValue);
  }
  maxEventHandler() {
    var minValue = parseFloat(min.value);
    var maxValue = parseFloat(event.target.value);
    this.filterAndDisplayData(minValue, maxValue);
  }
  getData() {
    fetch("https://api.coinmarketcap.com/v1/ticker/")
      .then(response => response.json())
      .then(data => (this.data = data))
      .then(data => this.cleanData());
  }
  cleanData() {
    this.data.sort((a, b) => parseFloat(a.price_usd) > parseFloat(b.price_usd) ? -1
          : parseFloat(a.price_usd) < parseFloat(b.price_usd) ? 1 : 0);

    this.prices = this.data.map(x => parseFloat(x.price_usd).toFixed(2));
    this.ids = this.data.map(x => x.id);
    this.dayChange = this.data.map(x => x.percent_change_24h);
    this.weekChange = this.data.map(x => x.percent_change_7d);

    this.filterAndDisplayData(20, 20000);
  }
  filterAndDisplayData(min, max) {
    //Filter the data of the array based one the price.
    var itemsToShow = this.prices.filter(x => x > min && x < max);
    /* we get an array with the items we want to show in the prices array
      * so now we get the index of those items to be able to also get his 
      * labels from the label array */

    var itemsToShowIndex = itemsToShow.map(x => this.prices.indexOf(x));
    /* We pass the values of our data to the arrays that will show the data of the chart. 
      * "x" is the index we want to show from the arrays and update the chart */
    myChart.data.datasets[0].data = itemsToShowIndex.map(x => this.prices[x]);
    myChart.data.labels = itemsToShowIndex.map(x => this.ids[x]);
    myChart.update();

    // Create div's under the chart with individual crypto data
    var data = myChart.data.datasets[0].data;
    var labels = myChart.data.labels;
    var dayChangeToShow = itemsToShowIndex.map(x => this.dayChange[x]);
    var weekChangeToShow = itemsToShowIndex.map(x => this.weekChange[x]);
    this.individuals.innerHTML = "";

    for (var i = 0; i < itemsToShow.length; i++) {
      //Create each individual div with it's inside content
      var individualDiv = document.createElement("div");
      individualDiv.classList.add("individual");
      individualDiv.innerHTML = ` 
          <div class="left"> ${labels[i]} </div> 
          <div class="right"> $${data[i]} </div> 
          <div class="right daychange"> ${dayChangeToShow[i]}% </div>         
          <div class="right weekchange"> ${weekChangeToShow[i]}% </div>`;
      this.individuals.appendChild(individualDiv);

      // change color from % changes Positive or negative.
      var days = document.querySelectorAll(".daychange");
      var weeks = document.querySelectorAll(".weekchange");
      dayChangeToShow[i] > 0
        ? days[i].classList.add("positive")
        : days[i].classList.add("negative");
      weekChangeToShow[i] > 0
        ? weeks[i].classList.add("positive")
        : weeks[i].classList.add("negative");
    }
  }
}

const app = new App();
