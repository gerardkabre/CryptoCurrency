var XHR = new XMLHttpRequest(); 

XHR.onreadystatechange = function () {
    if (XHR.readyState == 4) {
        if(XHR.status == 200) {
            console.log(XHR.responseText);
        } else {
            console.log("There was a fucking problem.");
        }
    }
}

XHR.open("GET", "https://api.blockchain.info/charts/transactions-per-second?timespan=5weeks&rollingAverage=8hours&format=json");
XHR.send();