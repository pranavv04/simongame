// alert("hello budbaak");
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("level-title").text("Level" + level);
    nextSequence();
    started = true;
  }
})

// randomChosenColour = $["#"+buttonColours];
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function () {
        nextSequence();

      }, 1000)
    }
  }
  else {
    console.log("wrong");

    playSound("wrong");

  
    $("#level-title").text("Game-over,Press any key to reset");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);


    Startover();
  }
}
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("level-title").text("Level" + level);
  var randomNumber = Math.floor(Math.random() * 3) + 1;
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // console.log(randomNumber);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);


}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function Startover() {
  level = 0;
  gamePattern = [];
  started = false;
}