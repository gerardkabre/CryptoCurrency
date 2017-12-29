class App {
  constructor() {
    this.getElements();
    this.addEvents();
    this.getData();
  }
  getElements() {
    this.min = document.getElementById("min");
    this.max = document.getElementById("max");
    this.individualsContainer = document.querySelector(".individualsContainer");
  }
  addEvents() {
    this.min.addEventListener("input", this.eventHandler.bind(this));
    this.max.addEventListener("input", this.eventHandler.bind(this));
  }
  eventHandler() {
    this.filterData(this.min.value, this.max.value);
  }
  getData() {
    fetch("https://api.coinmarketcap.com/v1/ticker/")
      .then(response => response.json())
      .then(data => (this.data = data))
      .then(data => this.filterData(20, 20000));
  }
  filterData(min, max) {
    this.filteredItems = this.data.filter(x => x.price_usd > min && x.price_usd < max)
    .sort((a, b) => parseFloat(a.price_usd) > parseFloat(b.price_usd) ? -1
    : parseFloat(a.price_usd) < parseFloat(b.price_usd) ? 1 : 0);
    this.displayChartData();
    this.displayGridData();
  }
  displayChartData() {
    myChart.data.datasets[0].data = this.filteredItems.map(x => parseFloat(x.price_usd).toFixed(2));
    myChart.data.labels = this.filteredItems.map(x => x.id);
    myChart.update();
  }
  displayGridData() {
    this.individualsContainer.innerHTML = "";
    this.filteredItems.map(x => {
      var individualDiv = document.createElement("div");
      individualDiv.classList.add("individual");
      individualDiv.innerHTML = ` 
        <div class="left"> ${x.id}</div> 
        <div class="right"> $${x.price_usd}</div> 
        <div class="right ${x.percent_change_24h > 0 ? "positive" : "negative"}"> 
            ${x.percent_change_24h}% 
        </div>         
        <div class="right ${x.percent_change_7d > 0 ? "positive" : "negative"} "> 
            ${x.percent_change_7d}% 
        </div>`;
      this.individualsContainer.appendChild(individualDiv);
    })
  }
}
const app = new App();
