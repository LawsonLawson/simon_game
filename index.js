// user clicked pattern
userClickedPattern = [];

// game pattern
gamePattern = [];

// array of colors
buttonColors = ["red", "green", "green", "yellow"];


/**
 * @function: nextSequence
 * @returns random number between 0 to 3.
 */
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    return randomNumber;
}

// select a random color
randomChosenColor = buttonColors[nextSequence()];

// add the random chosen color to the game pattern array to keep track
gamePattern.push(randomChosenColor);

// selecting the button with the same id as the chosen color so the user can know what the correct button to click is
$("#" + randomChosenColor).fadeOut(100).fadeIn(100);

// play sound for the respective button when the user clicks the correct button
$("#" + randomChosenColor).on("click", function() {
    playSound(randomChosenColor);
});

// listen for the user's click and add that click to the user click pattern array
$(".btn").on("click", function() {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
        animatePress(userChosenColor);
});


/**
 * @function: playSound
 * @param fileName: name of sound file
 * @returns a corresponding sound to the button.
 */
function playSound(fileName) {
    var audio = new Audio("./sounds/" + fileName + ".mp3");
    audio.play();
}


/**
 * 
 * @function: animatePress
 * @param currentColor: the current color being pressed
 * @returns: animated button.
 */
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    
    setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}