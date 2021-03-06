var colourList = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomNumber;
var randomChosenColor;
var level = 0;
var started = false;
var containerWidth;
var startGameButton;

$(document).keypress(function () {
  if (!started) {
    nextSequence();
    started = true;
    setButtonListeners();
  }
});

function setButtonListeners() {
  if (started) {
    $(".btn").click(function () {
      var clickedColor = $(this).attr("id");
      userClickedPattern.push(clickedColor);
      console.log(
        "gamePattern = " +
          gamePattern[userClickedPattern.length - 1] +
          "\nuserClicked= " +
          userClickedPattern[userClickedPattern.length - 1]
      );

      buttonFlash(clickedColor);
      // buttonSound(clickedColor);
      checkAnswer(userClickedPattern.length - 1, clickedColor);
    });
  }
}

function showH1Level() {
  $("h1").text("Level " + level);
}

function checkAnswer(currentIndex, clickedColor) {
  if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {
    buttonSound(clickedColor);
    if (gamePattern.length === userClickedPattern.length) {
      userClickedPattern = [];
      $("h1").text("Correct!");
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    buttonSound("wrong");
    loserScreen();
  }
}

function loserScreen() {
  $("h1").text("Wrong! LOSER!!");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  setTimeout(function () {
    $("h1").text("You reached Level " + level);
  }, 1000);
  setTimeout(function () {
    reset();
  }, 2000);
}

function nextSequence() {
  if ($("button").hasClass("start-game")) {
    // console.log("Button exists");
    $(".start-game").remove();
  }

  showH1Level();
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = colourList[randomNumber];
  gamePattern.push(randomChosenColor);
  buttonFlash(randomChosenColor);
  buttonSound(randomChosenColor);
  level++;
}

function buttonFlash(color) {
  $("." + color).addClass("pressed");
  setTimeout(function () {
    $("." + color).removeClass("pressed");
  }, 100);
}

function buttonSound(color) {
  switch (color) {
    case "red":
      var redSound = new Audio("sounds/red.mp3");
      redSound.play();
      break;
    case "yellow":
      var yellowSound = new Audio("sounds/yellow.mp3");
      yellowSound.play();
      break;
    case "green":
      var greenSound = new Audio("sounds/green.mp3");
      greenSound.play();
      break;
    case "blue":
      var blueSound = new Audio("sounds/blue.mp3");
      blueSound.play();
      break;
    case "wrong":
      var wrongSound = new Audio("sounds/wrong.mp3");
      wrongSound.play();
    default:
      break;
  }
}

function reset() {
  gamePattern = [];
  userClickedPattern = [];
  if (containerWidth > 800) {
    $("h1").text("Press A Key to Start");
  } else {
    $("h1").text("Click the Button Below to Start");
    $("h1").after("<button class='start-game'>Start Game</button>");
  }

  level = 0;
  started = false;
  $(".btn").unbind();
}

function evalWindow() {
  containerWidth = $(window).width();
  if (containerWidth > 800) {
    if ($("h1").text() === "Click the Button Below to Start") {
      $("h1").text("Press A Key to Start");
    }
    $(".start-game").remove();
    startGameButton = false;
    // $(".start-game").unbind();
  } else {
    if (!startGameButton) {
      if ($("h1").text() === "Press A Key to Start") {
        $("h1").text("Click the Button Below to Start");
        startGameButton = true;
        $("h1").after("<button class='start-game'>Start Game</button>");
      }
    }

    $(".start-game").click(function () {
      if (!started) {
        nextSequence();
        started = true;
        setButtonListeners();
      }
    });
  }
}

$(document).ready(function () {
  evalWindow(); //run when page first loads
});

$(window).resize(function () {
  evalWindow(); //run on every window resize
});
