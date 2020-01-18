



    // when animal is entered in search bar, it searches this animal for the attributes requested
    var animal = $(this).attr("#data-animal");

// on click event to trigger ajax call
$("#find-animal").on("click", function(event) {

    event.preventDefault();

    // grabs animal name to create a button
    var animal = $("#animal-input").val();

    // queryURL for Giphy API
    var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=EtOjyyjV4C6sFsomZOJOvzCzDfURjFqA";

    // Get request using AJAX
    $.ajax({
      url: queryURL,
      method: "GET"
      // data comes back from the API
    }).then(function(response) {
      console.log(response);
    });

         // Storing an array of results in the results variable
        var results = response.data;

    }