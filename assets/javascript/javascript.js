
//Format Page
//Clean up code
//Change API to Para feature

$( document ).ready(function() {
//Dynamically Generate Buttons based on an array

var buttons = ["The Office", "Game of Thrones", "Big Bang Theory","Blackish","Modern Family"]

renderButtons(); 

// Function for displaying the buttons in the array
function renderButtons() {
    for (var i = 0; i < buttons.length; i++) {
        var a = $("<button>");
        a.addClass("show-buttons");
        a.attr("data-name", buttons[i]);  // Adding a data-attribute
        a.text(buttons[i]);  // Providing the button's text 
        $("#buttons-appear-here").append(a);
    }    
  }

  // Adds a User Input button
  $("#add-button").on("click", function(event) {
    event.preventDefault(); //makes buttons stick
    var newShow = $("#tv-input").val().trim(); //trim cuts out extra spaces
    buttons.push(newShow);
    $("#buttons-appear-here").empty();
    renderButtons();
    $("#tv-input").val("");
  });

//Click event search buttton
// change to parameter format!

$(document).on('click', '.show-buttons', function() {
//$(".show-buttons").on("click", function() {
   // event.preventDefault();
    $("#gifs-appear-here").empty(); //replace past gifs

    var tvShow = $(this).attr("data-name");
      
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        tvShow + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
       
        .then(function(response) {
          
          
          var results = response.data;
            console.log(results);
          // Looping over every result item
          for (var i = 0; i < results.length; i++) {
             if (results[i].rating !== "r") {
              var gifDiv = $("<div>");
              var rating = results[i].rating;
              var p = $("<p>").text("Rating: " + rating);
              var tvImage = $("<img>");
              gifDiv.attr("class", "gifDiv"); 
              tvImage.attr("src", results[i].images.fixed_height_still.url);
              tvImage.attr("data-state", "still");
              tvImage.attr("data-still", results[i].images.fixed_height_still.url);
              tvImage.attr("data-animate",results[i].images.fixed_height.url);
              tvImage.attr("class", "gif");
              gifDiv.append(p);
              gifDiv.append(tvImage);
              $("#gifs-appear-here").prepend(gifDiv);
             }
          }
        });
    });

    $(document).on("click", ".gif", function() {
    console.log("clicked");  
    var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

});