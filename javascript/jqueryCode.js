$(function() {
  console.log('running');
});

$(document).ready(function() {

  //array holding starting search button topics
  var topics = [
  "cat",
  "dog",
  "kid",
  "baby",
  "car",
  "sports",
  "ladder", 
  "weather"
  ];

  //add buttons for topics in array
  function createButtons() {
    $("#topicButtons").empty();
    for (var i=0; i<topics.length; i++) {
      var a = $("<button>")
      .addClass("failButton")
      .attr("data-name", topics[i])
      .text(topics[i]);
      $("#topicButtons").append(a);
    }
  }

  //add new topic button
  $(document).on("click", "#addTopic", function(e) {
    e.preventDefault();
    var newTopic = $("#newTopic").val().trim();
    topics.push(newTopic);
    createButtons();
  });

  createButtons();

  // Adding click event listen listener to all buttons
  $(document).on("click", "#topicButtons .failButton", function() {
    $("#gifDiv").empty();
    // Grabbing and storing the data-animal property value from the button
    var fail = $(this).attr("data-name");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      fail + "+fail&api_key=dc6zaTOxFJmzC&limit=12";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
      })
    // After data comes back from the request
    .done(function(response) {
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var failCol = $("<div class='col-md-3'>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var failImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        failImage.attr("src", results[i].images.fixed_width.url);

        // Appending the paragraph and image tag to the animalDiv
        failCol.append(p);
        failCol.append(failImage);

        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifDiv").append(failCol);
      }
    });
  });
});