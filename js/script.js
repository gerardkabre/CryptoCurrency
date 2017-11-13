var button = document.querySelector("#refresh"); 
var price = document.querySelector("#price");
var ctx = document.getElementById("myChart").getContext('2d');

var min = document.getElementById("min");
var max = document.getElementById("max");

fetch("https://api.coinmarketcap.com/v1/ticker/")
.then((response) => {
    return response.json() 
  })
  .then((data) => {
      
    var bitcoin = data[0].price_usd;
    var etherum = data[1].price_usd;
    var bitcoinCash = data[2].price_usd;
    
    var filteredData = data.filter((x) => x.price_usd > 100 && x.price_usd < 2000)

   

    var eurRate = bitcoin; 
    price.textContent = eurRate;

    var gradientStroke = ctx.createLinearGradient(1000, 0, 100, 0);
    gradientStroke.addColorStop(0, '#ff92e0');
    gradientStroke.addColorStop(1, '#5AF5FA');

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: '',
                    borderColor: gradientStroke,
                    pointBorderColor: gradientStroke,
                    pointBackgroundColor: gradientStroke,
                    data: [],
                    /* backgroundColor: 'rgba(90, 247, 250, 0.1)',
                       borderColor: 'rgba(90, 247, 250, 1)',
                        'rgba(90, 247, 250, 1)',
                         *'rgba(255, 146, 224, 1)',
                         */  
                    borderWidth: 1
                }
            ]
        },
        options: {
            legend: {
                display: false,
            },
            animation: {
                duration: 1,
                onComplete: function () {
                    var chartInstance = this.chart,
                        ctx = chartInstance.ctx;
                        ctx.font = Chart.helpers.fontString(
                        Chart.defaults.global.defaultFontSize, 
                        Chart.defaults.global.defaultFontStyle, 
                        Chart.defaults.global.defaultFontFamily
                        );
                        ctx.textAlign = 'center';
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
            }
        }
    });

    var dataArr = myChart.data.datasets[0].data;
    var labelArr = myChart.data.labels; 

    for(var i = 0; i < data.length; i++) {
        if (data[i].price_usd > 100 && data[i].price_usd < 10000) {
        dataArr.push(data[i].price_usd); 
        labelArr.push(data[i].id);
        myChart.update();
    }
} 

    
    max.addEventListener("change", function(){
        var newarr =  dataArr.filter((x) => x.price_usd < 1000)

        myChart.update();

})

    
});



//Añadir Barra para seleciconar el mínimo de precio con .filter() 
//1 solo gráfico de barras con el precio de todas las cryptos mostradas en ese momento por el graph. 



