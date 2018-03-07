//Dynamically Generate Buttons based on an array

var buttons = ["The Office", "Game of Thrones", "Big Bang Theory"]

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
    var tvShow = $("#tv-input").val().trim(); //trim cuts out extra spaces
    console.log(tvShow);
    buttons.push(tvShow);
    console.log(tvShow);
    $("#buttons-appear-here").empty();
    renderButtons();
  });

//Click event search buttton
$("button").on("click", function() {
    $("#gifs-appear-here").empty(); //replace past gifs

    var tvShow = $(this).attr("data-name");
      
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        tvShow + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
       
        .then(function(response) {
          
          console.log(response);
          var results = response.data;
            console.log(results);
          // Looping over every result item
          for (var i = 0; i < results.length; i++) {
             if (results[i].rating !== "r") {
              var gifDiv = $("<div>");
              var rating = results[i].rating;
              var p = $("<p>").text("Rating: " + rating);
              var tvImage = $("<img>");
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

 $(".gif").on("click", function() {
      var state = $(this).attr("data-state");
      
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

    

    