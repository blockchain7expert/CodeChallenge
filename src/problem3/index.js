function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function getPrices(callback) {
    readTextFile("https://static.ngnrs.io/test/prices", function(text){
        var data = JSON.parse(text);
        callback(data.data);
    });
}

getPrices(function(result) {
    var html = "<table border='1|1'>";
    for (var i = 0; i < result.prices.length; i++) {
        html+="<tr>";
        var mid = (result.prices[i].sell + result.prices[i].buy) / 200;
        var unit = result.prices[i].pair.slice(3, 6);
        html+="<td> Mid price for "+ result.prices[i].pair+ " is " + mid + " " + unit +"</td>";
        html+="</tr>";

    }
    html+="</table>";
    document.getElementById("mid-prices").innerHTML = html;
})
