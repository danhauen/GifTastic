$(document).ready(function() {
// array of starting animals
var animals = ["dog", "cat", "kangaroo", "ostrich", "bird", "camel", "turtle", "hamster", "goose"];



// creates buttons for entered animals
function renderButtons() {
    // clears buttons prior to adding more to stop repeating buttons
    $("#buttons").empty();
        // loop for the array of animals
        for (var i = 0; i < animals.length; i++) {
            // var for creating a button
            var animalBtn = $("<button>");
            // clears input box
            $("#animal-input").val("");
            // adds class
            animalBtn.addClass("btn animal-btn btn-success btn-sm");
            // adds data attribute and places in the array
            animalBtn.attr("data-animal", animals[i]);
            // provides text to the button
            animalBtn.text(animals[i]);
            // adds the button to html
            $("#buttons").append(animalBtn);
        }
    }



function displayGifInfo() {

    // when animal is entered in search bar, it searches this animal for the attributes requested
    var animal = $(this).attr("data-animal");
    
    // queryURL for Giphy API
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=EtOjyyjV4C6sFsomZOJOvzCzDfURjFqA&q=" + animal + "&limit=10&offset=0&rating=PG-13&lang=en";

    // AJAX
        $.ajax({
          url: queryURL,
          method: "GET"
        // data comes back from the API
        }) .then(function(response) {
            console.log(response);
            var results = response.data;
            // clear previous gifs
            $("#gifs-view").html(" ");
        
     // looping through animal results (var a)
    for (var a = 0; a < results.length; a++) {

            // setting the rating for the gifs
            if (results[a].rating !== "r" && results[a].rating !== "pg-13") {
                     // div to hold the gifs
                    var gifDiv = $("<div>");
                    // Storing an array of results in the results variable
                    var rating = results[a].rating;
                    // creating an area for text and to display the rating
                    var p = $("<p>").text("Rating: " + results[a].rating);
                    // creating an area for the gif and a place to display it
                    var gif = $("<img>");
                    // using the src attributes for the display of the gifs
                    gif.attr("src", results[a].images.fixed_height.url);
                    // displays them in the div
                    gifDiv.append(p);
                    gifDiv.append(gif)
                    $("#gifs-view").prepend(gifDiv);
                }
            }
        });
};

            // on click event to trigger ajax call
            $("#add-animal").on("click", function() {
                event.preventDefault();
                // grabs animal name to create a button. Value, lower case and remove white space
                var animalName = $("#animal-input").val().trim();
                // animal is sent to array
                animals.push(animalName);
                //renderButtons
                renderButtons();
            });




            // click event listener
           $(document).on("click", ".animal-btn", displayGifInfo);

            renderButtons();

});