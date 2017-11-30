/* global $ APIKEY navigator */
$(document).ready(function() {
    var location = {};
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
        console.log(location);
    }
    else {
        alert("Geolocation unsupported");
        console.log("stop");
    }

    function error() {
        alert("Your location is unavailable.");
        console.log(error);
    }

    function success(position) {
        location.lat = position.coords.latitude;
        console.log("lat");
        location.lon = position.coords.longitude;
        console.log("lon");
        document.getElementById("lat").innerHTML = location.lat
        document.getElementById("lon").innerHTML = location.lon;
        console.log("success");
        $.ajax({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather",
            data: { lat: location.lat, lon: location.lon, appid: APIKEY },
            dataType: "json",
            success: function(data) {
                if (data.status == "ok") {
                    console.log("call data");
                    console.log(data);
                    document.getElementById('main').innerHTML = data.weather[0].main;
                    // data.weather[0].description;
                    // data.weather[0].icon;
                    // data.main.temp;
                    // data.main.humidity;
                    // data.main.temp_min;
                    // data.main.temp_max;
                    // data.wind.speed;
                    // data.wind.deg;

                    console.log(data);
                }
            }
        });

        // var main;
        // var temp;
        // var tempMin;
        // var tempMax;
        // var description;
        // var humidity;
        // var windSp;
        // var windDeg;
        // var icon =
        //     window.onload = function() {
        //         var main = document.getElementById('main');
        //         var temp = document.getElementById('temp');
        //         var tempMin = document.getElementById('tempMin');
        //         var tempMax = document.getElementById('tempMax');
        //         var description = document.getElementById('description');
        //         var humidity = document.getElementById('humidity');
        //         var windSp = document.getElementById('windSp');
        //         var windDeg = document.getElementById('windDeg');
        //         var icon = document.getElementById('icon');

        //         update(weather);
        //     }

        // function update(weather) {
        //     main.innerHTML = weather.main;
        //     temp.innerHTML = weather.temp;
        //     tempMin.innerHTML = weather.tempMin;
        //     tempMax.innerHTML = weather.tempMax;
        //     description.innerHTML = weather.description;
        //     humidity.innerHTML = weather.humidity;
        //     windSp.innerHTML = weather.windSp;
        //     windDeg.innerHTML = weather.windDeg;
        //     icon.src = weather.icon + "jpg"

        // }

        // // for (var i = 0; i < data.sources.length; i++) { //did not do sources[] because we are running through entire array
        // //     var source = document.createElement("OPTION");
        // //     source.setAttribute("value", data.sources[i].id)
        // //     source.innerHTML = data.sources[i].name;
        // //     document.getElementById("selection").appendChild(source);
        // //     console.log("display");


    }
});
