// Document ready function
$(document).ready(function () {

    // array of starting animals
    var animals = ["dog", "cat", "kangaroo", "ostrich", "bird", "camel", "turtle", "hamster", "goose", "turkey"];

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
            animalBtn.addClass("btn new-btn");
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
        }).then(function (response) {
            var results = response.data;
            console.log(results);
            // clear previous gifs
            $("#gifs-view").html(" ");

            // looping through animal results (var a)
            for (var a = 0; a < results.length; a++) {

                // setting the rating for the gifs
                if (results[a].rating !== "r" && results[a].rating !== "pg-13") {
                    // div to hold the gifs
                    var gifDiv = $("<div>");
                    gifDiv.addClass(".giphy");
                    // Storing an array of results in the results variable
                    var rating = results[a].rating;
                    // creating an area for text and to display the rating
                    var p = $("<p>").text("Rated: " + results[a].rating);

                    // using the src attributes for the display of the gifs
                    var animated = results[a].images.fixed_height.url;
                    var still = results[a].images.fixed_height_still.url;

                    // creating var gif attributes for still and animated
                    var gif = $("<img>").addClass("giphy").attr({
                        "src": still,
                        "data-still": still,
                        "data-animate": animated,
                        "data-state": "still"
                    });

                    // displays them in the div
                    gifDiv.append(p);
                    gifDiv.append(gif)
                    $("#gifs-view").prepend(gifDiv);
                }
            }
        });
    };

    // On click function for start/stop animation of gifs
    $("#gifs-view").on("click", ".giphy", function () {
        // Jquery for still and animate
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            console.log("animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            console.log("");
        }
    });

    // on click event to trigger ajax call
    $(".animal-btn").on("click", function () {
        event.preventDefault();
        if ($("#animal-input").val() === "") {
            return;
        } else {
            // grabs animal name to create a button. Value, lower case and remove white space
            var animalName = $("#animal-input").val().trim();
            // animal is sent to array
            animals.push(animalName);
            //renderButtons
            renderButtons();
        }
    });

    // click event listener
    $(document).on("click", ".new-btn", displayGifInfo);
    renderButtons();
});