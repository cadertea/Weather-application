$("#search-button").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var cityInput = $('#city-input').val();

    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = " http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=c2346b5853a5f70fdfb971c5c6033ff2";

    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function(response) {
          console.log(queryURL);
          console.log(response);
// storing properties into variables for easy access
          var name = response.name;
          var temp = response.main.temp
          var humidity = response.main.humidity;
          var wind = response.wind.
          //adding properties into my html dynamically
          $('#city-name').html('<h3>'+ name)
          $('#temperature').html('<h6>'+ 'Temperature: ' + temp)
          $('#humidity').html('<h6>'+ 'Humidity: ' + humidity+ '%')
          $('#wind-speed').html('<h6>'+ 'Wind-Speed: ' + wind + ' MPH')
        // Storing an array of results in the results variable
        // var results = response.data;

        // // Looping over every result item
        // for (var i = 0; i < results.length; i++) {

        //   // Only taking action if the photo has an appropriate rating
        //   if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
        //     // Creating a div for the gif
        //     var gifDiv = $("<div>");

        //     // Storing the result item's rating
        //     var rating = results[i].rating;

        //     // Creating a paragraph tag with the result item's rating
        //     var p = $("<p>").text("Rating: " + rating);

        //     // Creating an image tag
        //     var personImage = $("<img>");

        //     // Giving the image tag an src attribute of a proprty pulled off the
        //     // result item
        //     personImage.attr("src", results[i].images.fixed_height.url);

        //     // Appending the paragraph and personImage we created to the "gifDiv" div we created
        //     gifDiv.append(p);
        //     gifDiv.append(personImage);

        //     // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
        //     $("#gifs-appear-here").prepend(gifDiv);
          // }
        // }
      });
  });

  // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

