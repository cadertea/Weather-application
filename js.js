var historycity = JSON.parse(localStorage.getItem('history')) || []

$("#search-button").on("click", function () {

  var cityInput = $('#city-input').val();
  callingforcast(cityInput);
  query3(cityInput);
  //issues putting data into array and giving it a unique index


});

function callingforcast(cityInput) {

  // Constructing a URL to search Giphy for the name of the person who said the quote
  var queryURL = " http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=c2346b5853a5f70fdfb971c5c6033ff2";

  // Performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After the data comes back from the API
    .then(function (response) {
      // console.log(queryURL);
      console.log(response);

      if (historycity.indexOf(cityInput) === -1) {

        historycity.push(cityInput)
        localStorage.setItem("history", JSON.stringify(historycity))
        display()
      }
      // storing properties into variables for easy access
      var name = response.name;
      var temp = response.main.temp
      var tempF = (((temp - 273.15) * 1.8) + 32).toFixed(2)
      var humidity = response.main.humidity;
      var windSpeed = response.wind.speed

      var lat = response.coord.lat
      var lon = response.coord.lon

      //adding properties into my html dynamically

      $('#city-name').html('<h3>' + name + ' ' + moment().format('L'))
      $('#temperature').html('<h6>' + 'Temperature: ' + tempF + '<b>℉</b>')
      $('#humidity').html('<h6>' + 'Humidity: ' + humidity + '%')
      $('#wind-speed').html('<h6>' + 'Wind-Speed: ' + windSpeed + ' MPH')
      // $('#UV-index').html('<h6>'+ 'UV-Index: ' + windSpeed + ' MPH')

      var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=c2346b5853a5f70fdfb971c5c6033ff2";
      // console.log(queryURL2);
      $.ajax({
        url: queryURL2,
        method: "GET"
      })
        // After the data comes back from the API
        .then(function (response2) {
          console.log(response2);
          var uv = response2.value;
          // sets the uv index is to a var color
          var color = $("#UV-index").html('<h6>' + 'UV: ' + uv)

          // changes color based on uv value
          if (uv <= 3) {
            color.css('background-color', 'red')
            color.css('color', 'black')

          } else if (uv > 3 && uv <= 7) {
            color.css('background-color', 'yellow')
            color.css('color', 'black')

          } else {
            color.css('background-color', 'purple')
            color.css('color', 'white')
          }
        });
    });

};
//end of funciton paren. 
function query3(cityInput) {

  var queryURL3 = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=c2346b5853a5f70fdfb971c5c6033ff2&units=imperial";
  // console.log(queryURL3);
  $.ajax({
    url: queryURL3,
    method: "GET"
  })

    .then(function (response3) {
      console.log(response3);
      var forcast = "";
      for (let i = 0; i < response3.list.length; i = i + 8) {
        forcast += `<div class="col forecast bg-primary text-white ml-3 mb-3 rounded">
        ${response3.list[i].dt_txt}
       <p> Temperature: ${response3.list[i].main.temp}</p>
        <img src="http://openweathermap.org/img/wn/${response3.list[i].weather[0].icon}@2x.png" />
        <p>wind speed :${response3.list[i].wind.speed}<p>
        <p>Description: ${response3.list[i].weather[0].description}<p>
        </div>
        `


      }

      $('#forcast').html(forcast)



    });

}

function display() {
  var historycity = JSON.parse(localStorage.getItem('history')) || []
  var html = ""
  for (var q = 0; q < historycity.length; q++) {
    html += `<button class='previuosCity'>${historycity[q]}</button>`


  }
  console.log(html)
  $('#history').html(html)

}
$('#history').on('click', ".previuosCity", function () {
  var cityInput = $(this).text()
  console.log(cityInput);
  callingforcast(cityInput);
  query3(cityInput);

});
display()
  // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
 // api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
