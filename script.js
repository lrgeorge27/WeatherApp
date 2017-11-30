/* global $ APIKEY  */
$(document).ready(function() {
    var location = {};
    if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        console.log("start");
    }
    else {
        alert("Geolocation unsupported");
        console.log("stop");
    }

    function error() {
        alert("Your location is unavailable.");
        console.log(error);
    }

    function success() {
        location.lat = position.coords.latitude;
        location.lon = position.coords.longitude;
        document.getElementById("latLong").innerHTML = location.lat + location.lon;
        console.log(success);
    }
    // navigator.geolocation.getCurrentPosition(function(position) {
    //     $("#data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
});

var weather = "api.openweathermap.org.data/2.5/weather/lat=" + location.lat + "&lon=" + location.lon + "&appid=" + APIKEY;
$.ajax({
    method: "GET",
    url: weather,
    // "api.openweathermap.org.data/2.5/weather",
    // data: { lat: location.lat, lon: location.lon, appid: APIKEY },
    dataType: "json",
    success: function(data) {
        if (data.status == "ok") {
            console.log(data);
            // for (var i = 0; i < data.sources.length; i++) { //did not do sources[] because we are running through entire array
            //     var source = document.createElement("OPTION");
            //     source.setAttribute("value", data.sources[i].id)
            //     source.innerHTML = data.sources[i].name;
            //     document.getElementById("selection").appendChild(source);
            //     console.log("display");

        }
    }
});

// });


//     $("#source").submit(function(event) {
//         event.preventDefault();
//         var value = document.getElementById("selection").value;
//         $.ajax({
//             method: "GET",
//             url: "https://newsapi.org/v2/top-headlines",
//             data: { sources: value, apiKey: APIKEY },
//             success: function(data) {
//                 for (var i = 0; i < data.articles.length; i++) {
//                     console.log("start")
//                     var display = document.createElement("LI");
//                     display.innerHTML = data.articles[i].title;
//                     document.getElementById("display").appendChild(display);
//                 }
//                 console.log(data);
//             }
//         });
//     });
// });
