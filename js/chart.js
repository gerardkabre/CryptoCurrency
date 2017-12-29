var ctx = document.getElementById("myChart").getContext("2d");
var gradientStroke = ctx.createLinearGradient(1000, 0, 100, 0);
gradientStroke.addColorStop(0, "#ff92e0");
gradientStroke.addColorStop(1, "#5AF5FA");

var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "",
        backgroundColor: "rgba(90, 247, 250, 0.1)",
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
      display: false
    },
    tooltips: {
      enabled: true
    },
    hover: {
      animationDuration: 1
    },
    animation: {
      duration: 1,
      onComplete: function() {
        var chartInstance = this.chart,
          ctx = chartInstance.ctx;
        ctx.textAlign = "center";
        ctx.fillStyle = gradientStroke;
        ctx.textBaseline = "bottom";

        this.data.datasets.forEach(function(dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function(bar, index) {
            var data = dataset.data[index];
            ctx.fillText(data, bar._model.x, bar._model.y - 5);
          });
        });
      }
    },
    scales: {
      xAxes: [
        {
          stacked: false,
          beginAtZero: true,
          scaleLabel: {
            labelString: "Month"
          },
          ticks: {
            stepSize: 1,
            min: 0,
            autoSkip: false
          }
        }
      ]
    },
    maintainAspectRatio: false
  }
});



