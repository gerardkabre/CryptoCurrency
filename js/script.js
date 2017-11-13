var button = document.querySelector("#refresh"); 
var price = document.querySelector("#price");
var ctx = document.getElementById("myChart").getContext('2d');


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

    for(var i = 0; i < data.length; i++) {
        if (data[i].price_usd > 10 && data[i].price_usd < 1000) {
        myChart.data.datasets[0].data.push(data[i].price_usd); 
        myChart.data.labels.push(data[i].id);
        /*
        myChart.data.datasets[0].backgroundColor.push('rgba(255, 146, 224, 0)'); 
        myChart.data.datasets[0].borderColor.push('rgba(255, 146, 224, 0)'); 
        */

        myChart.update();
    }

        
           
            


     }
    
});



//Añadir Barra para seleciconar el mínimo de precio con .filter() 
//1 solo gráfico de barras con el precio de todas las cryptos mostradas en ese momento por el graph. 



