$(function () {
  //Dom Variables
  var LiEl = $("<li>");
  var cardEl = $("<div>");
  var cardBody = $("<div>");
  var search = $("#search");
  //JavaScript Variables
  var now = moment().format("L");
  var API_key = "a2e3bbaa7fcbfdcff54e3b11604bb2fb";

  //Function Definitions
  function searchCity(cityName) {
    var queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_key}&units=imperial`;

    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function (response) {
      cardBody.empty();
      var icon = $("<img>").attr(
        "src",
        `https://api.openweathermap.org/img/w/${response.weather[0].icon}.png`
      );

      var headLineTag = $("<h1>").text(`${response.name} (${now})`);
      var temp = $("<p>").text(`Temperature: ${response.main.temp} F`);
      var humidity = $("<p>").text(`Humidity: ${response.main.humidity} %`);
      var windSpeed = $("<p>").text(`Wind Speed: ${response.wind.speed} MPH`);
      headLineTag.append(icon);
      cardBody.append(headLineTag, temp, humidity, windSpeed);
      $("#current").append(cardBody);

      var lat = response.coord.lat;
      var lon = response.coord.lon;

      uvIndex(lat, lon);
      fiveDayForecast(lat, lon);
    });
  }

  function uvIndex(lat, lon) {
    var queryUrl = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_key}`;

    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function (response) {
      var uvIndex = $("<p>").text(`UV Index:`);
      var btn = $("<button>").text(`${response.value}`);
      if (response.value < 3) {
        btn.addClass("btn-success");
      } else if (response.value < 7) {
        btn.addClass("btn-warning");
      } else {
        btn.addClass("btn-danger");
      }
      uvIndex.append(btn);
      cardBody.append(uvIndex);
    });
  }

  function fiveDayForecast(lat, lon) {
    var queryUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${API_key}`;

    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function (response) {
      console.log(response);

      for (i = 0; i < 5; i++) {
        var forecast = $("<div>");
        forecast.addClass(
          "card shadow-lg text-white bg-primary mx-auto mb-10 p-2 float-left"
        );
        forecast.attr("style", "width: 8.5rem; height: 11rem;");
        var headLineTag = $("<h5>").text(
          `${new Date(response.daily[i].dt * 1000).toLocaleDateString("en-US")}`
        );
        var icon = $("<img>").attr(
          "src",
          `https://api.openweathermap.org/img/w/${response.daily[i].weather[0].icon}.png`
        );
        var temp = $("<p>").text(
          `Temperature: ${response.daily[i].temp.max} F`
        );
        var humidity = $("<p>").text(
          `Humidity: ${response.daily[i].humidity} %`
        );
        forecast.append(headLineTag, icon, temp, humidity);
        $("#forecast").append(forecast);
      }
    });
  }

  //Function Calls
  //Event Listeners
  $("#btn").on("click", function (e) {
    e.preventDefault();
    var input = search.val().trim();
    searchCity(input);
  });
});
