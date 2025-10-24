// Track game state
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;
var score = 0;
var listenForClicks = false;


// Detect keypress to start game
var deviceIsMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
var eventToStart = deviceIsMobile ? "touchstart" : "keydown"

// Should screen size be that of mobile, change prompt
if (deviceIsMobile) {
  $("#level-title").text("Tap anywhere apart from the buttons to begin");
  $("#footer-text").text("Simon Game Mobile Version 7.1 Made By Israel ©");
} else {
  $("#level-title").text("Press any key to begin");
  $("#footer-text").text("Simon Game Desktop Version 7.1 -- Made By Israel ©");
}
$(document).on(eventToStart, function () {
    if (!started && !$(event.target).hasClass("btn")) {
        $("#level-title").text("Level " + level);
        listenForClicks = true;
        started = true;
        nextSequence();
    }
});


// Detect button click
$(".btn").on("click", function () {
    if (!listenForClicks) return;
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});


// Generate next color in the sequence
function nextSequence() {
    listenForClicks = false; // don't take clicks after initial sequence is correct
    userClickedPattern = [];
    level++;
    score = level - 1 // increase score with each level passed
    $("#level-title").text("Level " + level + " | Score: " + score);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    listenForClicks = true; // re-enable clicks after next sequence shows
}


// Check user's answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // Check is user is correct so far
        if (userClickedPattern.length === gamePattern.length) {
            listenForClicks = false; // disable clicks again while the program checks answer
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        const gameOverText = "Game Over 😢 | Score: " + score + " | " +
        (deviceIsMobile ? "Tap anywhere to Restart" : "Press any key to Restart");
        $("#level-title").text(gameOverText);

        listenForClicks = false;

        startOver();

    }
}


// Play corresponding sound
function playSound(name) {
    const audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}


// Add animation effect when pressed
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


// Restart game variables
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    score = 0;
    listenForClicks = false;
}