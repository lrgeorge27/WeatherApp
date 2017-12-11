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
                document.getElementById('main').innerHTML = data.weather[0].main;
                document.getElementById('description').innerHTML = data.weather[0].description;
                document.getElementById('icon').src = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
                document.getElementById("temp").innerHTML = data.main.temp + " deg F";
                document.getElementById("name").innerHTML = data.name;
                document.getElementById("humidity").innerHTML = data.main.humidity;
                document.getElementById("tempMin").innerHTML = data.main.temp_min;
                document.getElementById("tempMax").innerHTML = data.main.temp_max;
                document.getElementById("windSp").innerHTML = data.wind.speed;
                // console.log("call data");
                // console.log(data);

                $("#convertC").click(function() { //onClick function
                    // console.log("start");
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

                    // console.log("convert");
                });

                $("#convertF").click(function() { //onClick function
                    // console.log("start");
                    var fahrenheit = data.main.temp;
                    document.getElementById("temp").innerHTML = fahrenheit + " deg F";
                    document.getElementById("tempMin").innerHTML = data.main.temp_min + " deg F";
                    document.getElementById("tempMax").innerHTML = data.main.temp_max + " deg F";
                    // console.log("convert");
                });

                // $("#background").replaceWith(function(w) {
                //     console.log("bg start");
                //     for (var i = 0; i < data.weather; i++) { don't need
                var w = data.weather[0].id;
                //         console.log("bg loop");
                if (w == 800) {
                    document.getElementById("background").style.backgroundImage = "url('ak-ocean-sm.jpg')";
                }
                else if (w >= 801 && w <= 804) {
                    document.getElementById("background").style.backgroundImage = "url('cl-skyscraper-sm.jpg')";
                }
                else if (w >= 300 && w <= 531) {
                    document.getElementById("background").style.backgroundImage = "url('wk-rain-sm.jpg')";
                }
                else if (w >= 600 && w <= 622) {
                    document.getElementById("background").style.backgroundImage = "url('tk-deer-sm.jpg')";
                }
                else if (w >= 200 && w <= 232) {
                    document.getElementById("background").style.backgroundImage = "url('bm-lighting-sm.jpg')";
                }
                console.log("today");
                //     };
                $.ajax({ //ajax needs to be inside the function calling the location in order to wait for the geolocation parameters to run.
                    method: "GET",
                    url: "https://api.openweathermap.org/data/2.5/forecast",
                    data: { lat: location.lat, lon: location.lon, units: "imperial", appid: APIKEY }, //units: imperial
                    dataType: "json",
                    success: function(data) {
                        console.log(data);
                        for (var i = 0; i <= 8; i++) {
                            console.log("start");
                            var date = document.createElement("P");
                            date.innerHTML = data.list[i].dt_txt;
                            console.log("date");
                            document.getElementById("day").appendChild(date);

                            var temp = document.createElement("P");
                            temp.innerHTML = "Temp:" + data.list[i].main.temp + "deg F";
                            document.getElementById("day").appendChild(temp);

                            for (var j = 0; j < data.list[i].weather.length; j++) {
                                var weather = document.createElement("P");
                                weather.innerHTML = data.list[i].weather[j].main;
                                document.getElementById("day").appendChild(weather);

                                var icon = document.createElement("IMG");
                                icon.src = "https://openweathermap.org/img/w/" + data.list[i].weather[j].icon + ".png";
                                document.getElementById("day").appendChild(icon);
                            }
                        }


                    }

                });
            }
        });

    }
});
