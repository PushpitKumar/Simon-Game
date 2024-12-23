var level = 0;
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gameStarted = false;

$(document).ready(function() {
    $(document).keydown(function() { 
        if (!gameStarted) { //first keydown event
            $("#level-title").text("Level " + level);
            nextSequence();
            gameStarted = true; //ignore all subsequent keydown events
        }
    });

    $(".btn").click(function() {
        var userChosenColor = this.id; //or $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        //console.log(userClickedPattern);
        $("#" + userChosenColor).animate({
            opacity: "0.1"
        }, 100).animate({
            opacity: "1"
        },100);
        //console.log(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    });

});

function nextSequence() {
    userClickedPattern = []; //Reset the user pattern for every sequence
    level += 1;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.random();
    randomNumber *= 4;
    randomNumber = Math.floor(randomNumber);

    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    //console.log(randomChosenColor);
    var button = $("#" + randomChosenColor);

    button.animate({
        opacity: "0.1"
    }, 100).animate({
        opacity: "1"
    }, 100);

    animatePress(randomChosenColor);
    playSound(randomChosenColor);

}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(matchColor) {
    //console.log("UserPattern: " + userClickedPattern);
    //console.log("Game Pattern: " + gamePattern);
    if (userClickedPattern[matchColor] === gamePattern[matchColor]) { //Check if color is matched correctly
        //console.log("success");
        if (userClickedPattern.length === gamePattern.length) { //Check if the sequence is completed by user
            setTimeout(function() { //Generate new sequence
                nextSequence();
            }, 1000);
        }
    } else {
        //console.log("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    //Reset all values
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
    $(document).keydown(function() {
        if (!gameStarted) {
            $("#level-title").text("Level " + level);
            nextSequence();
            gameStarted = true;
        }
    });
}