/* global $ APIKEY navigator data imperial*/
$(document).ready(function() {
    var location = {};
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
        console.log(location);
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
        // document.getElementById("lat").innerHTML = location.lat;
        // document.getElementById("lon").innerHTML = location.lon;
        console.log("success");
        weather(position);
    }

    function weather(position) {
        $.ajax({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather",
            data: { lat: location.lat, lon: location.lon, units: "imperial", appid: APIKEY }, //units: imperial
            dataType: "json",
            success: function(data) {
                console.log(data);
                // var date = new Date();   unix time conversion for sunrise
                // date.setTime(unixTime * 1000);
                document.getElementById('main').innerHTML = data.weather[0].main;
                document.getElementById('description').innerHTML = data.weather[0].description;
                document.getElementById('icon').src = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
                document.getElementById("temp").innerHTML = data.main.temp + " deg F";
                document.getElementById("name").innerHTML = data.name;
                document.getElementById("humidity").innerHTML = data.main.humidity;
                document.getElementById("tempMin").innerHTML = data.main.temp_min;
                document.getElementById("tempMax").innerHTML = data.main.temp_max;
                document.getElementById("windSp").innerHTML = data.wind.speed;
                console.log("call data");
                console.log(data);

                $("#convertC").click(function() { //onClick function
                    console.log("start");
                    var fahrenheit = data.main.temp;
                    var celsius = (fahrenheit - 32) * 0.5556;
                    document.getElementById("temp").innerHTML = celsius + " deg C";

                    var fahrenheitMin = data.main.temp_min;
                    var celsiusMin = (fahrenheitMin - 32) * 0.5556;
                    document.getElementById("tempMin").innerHTML = celsiusMin + " deg C";

                    var fahrenheitMax = data.main.temp_max;
                    var celsiusMax = (fahrenheitMax - 32) * 0.5556;
                    document.getElementById("tempMax").innerHTML = celsiusMax + " deg C";

                    console.log("convert");
                });

                $("#convertF").click(function() { //onClick function
                    console.log("start");
                    var fahrenheit = data.main.temp;
                    document.getElementById("temp").innerHTML = fahrenheit + " deg F";
                    document.getElementById("tempMin").innerHTML = data.main.temp_min + " deg F";
                    document.getElementById("tempMax").innerHTML = data.main.temp_max + " deg F";
                    console.log("convert");
                });


                // function convertToCelsius(fahrenheit) {
                //     console.log("start conversion");
                //     var fahrenheit = data.main.temp;
                //     var celsius = (fahrenheit - 32) * 0.5556;
                //     document.getElementById("conversion").innerHTML = celsius;
                //     console.log("celsius");
                //return celsius;
                //}

            }
            // }
        });

        // $("#convert").click(function() {
        //     var fahrenheit = data.main.temp;
        //     var celsius = (fahrenheit - 32) * 0.5556;
        //     document.getElementById("conversion").innerHTML = celsius;

        // });

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
