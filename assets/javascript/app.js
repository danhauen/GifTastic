// array of starting animals
var animals = ["dog", "cat", "kangaroo", "ostrich", "bird", "camel", "turtle", "hamster", "goose"]

// creates buttons for entered animals
function renderButtons() {

    // clears buttons prior to adding more to stop repeating buttons
    $("#buttons-animals").empty();

    // loop for the array of animals
    for (var i = 0; i < animals.length; i++) {

        // var for creating a button
        var animalBtn = $("<button>");
        // adds class
        animalBtn.addClass("animal btn btn-success btn-sm");
        // adds data attribute
        animalBtn.attr("data-name", animals[i]);
        // provides text to the button
        animalBtn.text(animals[i]);
        // adds the button to html
        $("#buttons-animals").append(animalBtn);
        $("#animal-input").text()
    }
}

function displayGifInfo() {

    // when animal is entered in search bar, it searches this animal for the attributes requested
    var animalData = $(this).attr("data-name");
    
    // queryURL for Giphy API
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=EtOjyyjV4C6sFsomZOJOvzCzDfURjFqA&limit=10";

    // Get request using AJAX
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        
    // data comes back from the API
    .then(function(response) {
    console.log(queryURL);
    console.log(response);
        
    // Storing an array of results in the results variable
    var results = response.animalData;

      // looping through animal results
      for (var i = 0; i < results.length; i++) {
        // setting the rating for the gifs
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // creating a div tag and storing it
            var animalDiv = $("<div>");
            // creating an area for text and to display the rating
            var p = $("<p>").text("Rating: " + results[i].rating);
            // creating an area for the gif and a place to display it
            var gif = $("<img>");
            // using the src attributes for the display of the gifs
            gif.attr("src", results[i].images.fixed_height.url);
            // displays them in the div
            animalDiv.append(p);
            animalDiv.append(gif)
            $("#gif-div").prepend(animalDiv);
        }
      }
    });
};



// on click event to trigger ajax call
$("#add-animal").on("click", function() {

    // prevents the form from trying to submit itself
    event.preventDefault();

    // grabs animal name to create a button. Value, lower case and remove white space
    var animal = $("#animal-input").val().trim();

    // animal is sent to array
    animals.push(animal);
    console.log(animals);
    
    //renderButtons
    renderButtons();
});

// click event listener
$(document).on("click", ".add-animal", displayGifInfo);

renderButtons();

