var level = 1;
var simon = [];
var index = 0;
var c = 0;

function playSound(file) {
  var audio = new Audio("sounds/" + file + ".mp3");
  audio.play();
}

function gameOver() {
  playSound("wrong");
  simon = [];
  level = 1;
  index = 0;
  c = 0;
  $("body").css("background-color", "rgb(212, 47, 59)");
  $("#top-text").text("GAME OVER!");
  $("#top-text").after('<p class="temp-para"> Refresh to Restart </p>');

  $(".button").off("click");
  $(document).off("keydown");

  // $(document).off("keydown").on("keydown", function () {
  //   $(".temp-para").remove();
  //   onPlay();
  // });
}

function check(val) {
  if (simon[index] === val) {
    index += 1;
    if (index === simon.length) {
      level += 1;
      setTimeout(onPlay, 1000);
    }
    return 1;
  } else {
    return 0;
  }
}

function gameCheck() {
  $(".button").off("click");

  $("#y-but").on("click", function () {
    playSound("yellow");
    buttonPress(0, this);
  });

  $("#b-but").on("click", function () {
    playSound("blue");
    buttonPress(1, this);
  });

  $("#r-but").on("click", function () {
    playSound("red");
    buttonPress(2, this);
  });

  $("#g-but").on("click", function () {
    playSound("green");
    buttonPress(3, this);
  });
}

function buttonPress(val, element) {
  $(element).addClass("pressed");
  setTimeout(() => $(element).removeClass("pressed"), 500);
  if (!check(val)) gameOver();
}

function simonDisplay(val) {
  let button;
  $("#top-text").text("Watch!");
  switch (val) {
    case 0:
      button = $("#y-but");
      playSound("yellow");
      break;
    case 1:
      button = $("#b-but");
      playSound("blue");
      break;
    case 2:
      button = $("#r-but");
      playSound("red");
      break;
    case 3:
      button = $("#g-but");
      playSound("green");
      break;
  }
  button.addClass("pressed");
  setTimeout(() => {
    button.removeClass("pressed");
  }, 500);
}

function simonPlay() {
  for (let i = 0; i < simon.length; i++) {
    setTimeout(() => {
      simonDisplay(simon[i]);
    }, i * 1000);
  }
  setTimeout(() => {
    $("#top-text").text("Level " + level);
  }, simon.length * 1000);
}

function onPlay() {
  $("body").css("background-color", "rgb(30, 30, 77)");
  $("#top-text").text("Level " + level);
  simon.push(Math.floor(Math.random() * 4));
  index = 0;
  simonPlay();
  gameCheck();
}

$(document).ready(function () {
  $(document).on("keydown", function () {
    if (c === 0) {
      c = 1;
      console.log("Write the command - 'console.log(simon)'");
      console.log("0 - yellow, 1 - blue, 2 - red, 3 - green.");
      $("#top-text").text("Welcome!");
      playSound("start");
      setTimeout(() => {
        onPlay();
      }, 2500);
    }
  });

  gameCheck();
});

