
var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
var d = new Date();
var dayCount = d.getDay();
var cityLog = []

$(document).ready(function () {
    // generateHistory();

    $("#searchBtn").on("click", function () {
        generateWeather();
    })

    function generateWeather() {
        $("#forecast-div").attr("style", "display:block")
        var cityCall = $(".form-control").val();
        var APIKey = "03c182d75b6114b6d28b903eec007921";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
            "q=" + cityCall + "&units=imperial&appid=" + APIKey;
        console.log(queryURL)

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(cityCall)
            console.log(response)
            var latitude = response.coord.lat;
            var longtitude = response.coord.lon;
            cityLog.push(response.name)
            localStorage.setItem("cityName", cityLog)
            $("#sideBar").append('<button id ="' + response.name + '" class = "cityHistory"></button><br>')
            $("#" + response.name).text(response.name)
            $(".city").text("City: " + response.name);
            // Change to standard units
            $(".temp").text("Temperature F: " + response.main.temp)
            $(".humidity").text("Humidity: " + response.main.humidity)
            $(".wind-speed").text("Wind Speed: " + response.wind.speed)

            var forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longtitude + "&exclude=current,minutely,hourly,alerts&units=imperial&appid=" + APIKey;
            console.log(forecastURL)

            $.ajax({
                url: forecastURL,
                method: "GET",
            }).then(function (response) {
                console.log(response)
                for (var i = 0; i < 5; i++) {
                    $("#" + i + "-0").text(weekdays[dayCount + i + 1])
                    $("#" + i + "-1").attr("src", "http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png")
                    $("#" + i + "-2").text("High: " + response.daily[i].temp.max)
                    $("#" + i + "-3").text("Low: " + response.daily[i].temp.min)
                    $(".uvIndex").text("UVindex: " + response.daily[i].uvi)
                    if (response.daily[i].uvi > 7) {
                        $(".uvIndex").css('background-color', "red")
                    }
                    else {
                        $(".uvIndex").css('background-color', "cyan")
                    }
                }
            })
            console.log($(".uvIndex").text())
            

        });
    }
    $(".cityHistory").on("click", function () {
        $(".form-control").text(JSON.stringify(this))
        console.log(this)
        generateWeather();

    })
})
