// Track game state
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;
var score = 0;
var listenForClicks = false;


// Detect keypress to start game
$(document).on("keydown", function () {
    if (!started) {
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
    userClickedPattern = [];
    level++;
    score = level - 1 // increase score with each level passed
    $("#level-title").text("Level " + level + " | Score: " + score);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}


// Check user's answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // Check is user is correct so far
        if (userClickedPattern.length === gamePattern.length) {
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

        $("#level-title").text("Game Over 😢 | Your Score: " + score + " | Press Any Key to Restart");

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
}