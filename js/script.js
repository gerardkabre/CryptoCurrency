var button = document.querySelector("#refresh"); 

var price = document.querySelector("#price");
var currency = "EUR";

button.addEventListener("click", priceRequest);


function priceRequest(){

    var XHR = new XMLHttpRequest();
    XHR.onreadystatechange = function(){
        if (XHR.readyState == 4 && XHR.status == 200 ) {
            var data = JSON.parse(XHR.responseText); 
            var currentEurPrice = data.bpi[currency].rate; 
            price.textContent = currentEurPrice + " " + currency; 
        }
    }

    XHR.open("GET", "https://api.coindesk.com/v1/bpi/currentprice.json");
    XHR.send(); 

}

priceRequest();


fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
.then((response) => {
    console.log(response);
    return response.json() 
  })
  .then((data) => {
    var eurRate = data.bpi.EUR.rate;
    console.log(eurRate);
});





