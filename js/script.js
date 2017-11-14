var button = document.querySelector("#refresh"); 
var price = document.querySelector("#price");
var ctx = document.getElementById("myChart").getContext('2d');
var min = document.getElementById("min");
var max = document.getElementById("max");

var individuals = document.querySelector(".individuals");


fetch("https://api.coinmarketcap.com/v1/ticker/")
.then((response) => {
    return response.json() 
  })
  .then((data) => {
/****************** CHART *********************/
    var gradientStroke = ctx.createLinearGradient(1000, 0, 100, 0);
    gradientStroke.addColorStop(0, '#ff92e0');
    gradientStroke.addColorStop(1, '#5AF5FA');

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: '',
                    backgroundColor: 'rgba(90, 247, 250, 0.1)',
                    borderColor: gradientStroke,
                    pointBorderColor: gradientStroke,
                    pointBackgroundColor: gradientStroke,
                    data: [],
                    borderWidth: 1
                }
            ]
        },
        options: {
            legend: {
                display: false,
            },
            tooltips: {
                enabled: true
            },
            hover: {
                animationDuration: 1
            },
            animation: {
                duration: 1,
                onComplete: function () {
                    var chartInstance = this.chart,
                        ctx = chartInstance.ctx;
                    ctx.textAlign = 'center';
                    ctx.fillStyle = gradientStroke;
                    ctx.textBaseline = 'bottom';
                    
                    this.data.datasets.forEach(function (dataset, i) {
                        var meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function (bar, index) {
                            var data = dataset.data[index];
                            ctx.fillText(data, bar._model.x, bar._model.y - 5);
                        });
                    });
                }
        },
        scales: {
            xAxes: [{
                stacked: false,
                beginAtZero: true,
                scaleLabel: {
                    labelString: 'Month'
                },
                ticks: {
                    stepSize: 1,
                    min: 0,
                    autoSkip: false
                }
            }]
        },
        maintainAspectRatio: false        
    }});
/****************** FUNCTIONALITY *********************/
    // Sort From Max to Min all the the data of the object based up on the price.
    data.sort((a,b) => 
    (parseFloat(a.price_usd) > parseFloat(b.price_usd)) ? -1 : 
    (parseFloat(a.price_usd) < parseFloat(b.price_usd)) ?  1 : 0); 
    // Get an array of the prices and id's of each cryptocurrency.
    var prices = data.map( x => parseFloat(x.price_usd).toFixed(2));  
    var ids = data.map(x => x.id);
    // Default Data on start
    filterAndDisplayData(20, 10000);
    // Events for Data imput
    min.addEventListener("input", function () { 
        var minValue = parseFloat(this.value);
        var maxValue = parseFloat(max.value); 
        filterAndDisplayData(minValue, maxValue);
      })
    max.addEventListener("input", function () { 
        var minValue = parseFloat(min.value); 
        var maxValue = parseFloat(this.value);        
        filterAndDisplayData(minValue, maxValue); 
    })

    

      function filterAndDisplayData (min, max) {
      //Filter the data of the array based one the price. 
      var itemsToShow = prices.filter(x => x > min && x < max);  
      /* we get an array with the items we want to show in the prices array
       * so now we get the index of those items to be able to also get his 
       * labels from the label array */ 
      var itemsToShowIndex = itemsToShow.map(x => prices.indexOf(x)); 
      /* We pass the values of our data to the arrays that will show the data of the chart. 
       * "x" is the index we want to show from the arrays and update the chart */ 
      myChart.data.datasets[0].data = itemsToShowIndex.map(x => prices[x]) 
      myChart.data.labels = itemsToShowIndex.map(x => ids[x]) 
      myChart.update();

      var data = myChart.data.datasets[0].data;
      var labels = myChart.data.labels;
      

    //boxes under the chart
     individuals.innerHTML = "";   
      for (var i = 0; i < itemsToShow.length; i++) {
        
        var individualDiv = document.createElement('div'); 
        individualDiv.classList.add("individual");
        individualDiv.innerHTML = ` 
        <div class="left"> ${labels[i]} </div> 
        <div class="right"> $${data[i]} </div> 
        <div class="right"> $${data[i]} </div>         
        <div class="right"> $${data[i]} </div>`; 

        individuals.appendChild(individualDiv); 



      }
      

      }
})



