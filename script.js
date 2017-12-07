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
        $.ajax({ //ajax needs to be inside the function calling the location in order to wait for the geolocation parameters to run.
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
                    var celsiusRd = Number((celsius).toFixed(2));
                    document.getElementById("temp").innerHTML = celsiusRd + " deg C";

                    var fahrenheitMin = data.main.temp_min;
                    var celsiusMin = (fahrenheitMin - 32) * 0.5556;
                    var celsiusRdMin = Number((celsiusMin).toFixed(2));
                    document.getElementById("tempMin").innerHTML = celsiusRdMin + " deg C";

                    var fahrenheitMax = data.main.temp_max;
                    var celsiusMax = (fahrenheitMax - 32) * 0.5556;
                    var celsiusRdMax = Number((celsiusMax).toFixed(2));
                    document.getElementById("tempMax").innerHTML = celsiusRdMax + " deg C";

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

                $.ajax({ //ajax needs to be inside the function calling the location in order to wait for the geolocation parameters to run.
                    method: "GET",
                    url: "https://api.openweathermap.org/data/2.5/forecast",
                    data: { lat: location.lat, lon: location.lon, units: "imperial", appid: APIKEY }, //units: imperial
                    dataType: "json",
                    success: function(data) {
                        console.log(data);
                        for (var i = 0; i < data.list[6]; i++) {
                            data.list[i].dt_txt;
                            data.list[i].main.temp_max;
                            data.list[i].main.temp_min;

                        }

                        // $("#bg-img").change(function(event){
                        //     var backgroundImg = weather(data.weather[0].main);
                        //     function weather(main) {
                        //         // if (weather == "cloudy") {
                        //         //     return "bgimg.jpg"
                        //         // }
                        //         if (weather == "clear") {
                        //             return "ak-ocean-sm.jpg";
                        //         }
                        //     $("body").css("background", "url(" + backgroundImg + ")");
                        //     }

                        //     });

                    }
                });
            }

        });
    }
});
