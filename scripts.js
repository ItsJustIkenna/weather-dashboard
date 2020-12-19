$(function () {
  //Dom Variables
  var LiEl = $("<li>");
  var cardEl = $("<div>");
  var search = $("#search");
  //JavaScript Variables
  var now = moment().format("MMMM Do YYYY, h:mm:ss a");
  var API_key = "a2e3bbaa7fcbfdcff54e3b11604bb2fb";

  //Function Definitions
  function searchCity(cityName) {
    var queryUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      API_key;

    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function (response) {
      console.log(response);
    });
  }

  function pageLoad() {}
  //Function Calls
  //Event Listeners
  $("#btn").on("click", function (e) {
    e.preventDefault();
    var input = search.val().trim();
    searchCity(input);
  });
});
