var timer;
var currentScore;
var counter;
var generate;
var timeRunner;
var isPaused = false;

var highScore = parseInt(localStorage.getItem("highScore")) || 0;
document.querySelector(".high-score").textContent = highScore;

function generateBubbles() {
  generate = setInterval(function () {
    if (!isPaused) {
      counter += 1;
      bubble = document.createElement("div");
      bubble.className = `bubble c${counter}`;
      const size = Math.floor(Math.random() * 3);
      const bubbleSizeClass =
        size === 0 ? "small" : size === 1 ? "medium" : "large";
      bubble.classList.add(bubbleSizeClass);
      const score = size === 0 ? 20 : size === 1 ? 10 : 5;
      bubble.dataset.score = score;
      bubble.style.left = `${Math.floor(Math.random() * 80) + 10}%`;
      document.querySelector(".canvas").appendChild(bubble);
      if (timer == 0) {
        clearInterval(generate);
      }
    }
  }, 750);
}

function gameLoop() {
  timer = 30;
  currentScore = 0;
  counter = 0;
  document.querySelector(".canvas").innerHTML = "";
  generateBubbles();
  timeRunner = setInterval(function () {
    if (!isPaused) {
      if (timer > 0) {
        timer--;
        if (timer < 10) timer = "0" + timer;
        else timer = timer;
        document.querySelector(".timer").textContent = timer;
      } else {
        updateHighScore();
        document.querySelector(".canvas").innerHTML = "<h1>GAME OVER!</h1>";
        clearInterval(timeRunner);
      }
    }
  }, 1000);
}

function updateHighScore() {
  if (currentScore >= highScore) {
    highScore = currentScore;
    document.querySelector(".high-score").textContent = highScore;
    localStorage.setItem("highScore", highScore);
  }
}

function updateScore(score) {
  currentScore += score;
  document.querySelector(".score").textContent = currentScore;
}

document.querySelector(".canvas").addEventListener("click", function (event) {
  if (event.target.classList.contains("bubble")) {
    event.target.style.setProperty("display", "none");
    updateScore(parseInt(event.target.dataset.score));
  }
});

// document.addEventListener("keydown", function (event) {
//   if (event.key === " ") {
//     location.reload();
//   }
// });

document.querySelector(".game-control").addEventListener("click", function () {
  console.log(isPaused, !isPaused);
  isPaused = !isPaused;
  if (isPaused == true) {
    // Resume the game
    // isPaused = false;
    document.querySelector(".pause").classList.remove("hidden");
    document.querySelector(".play").classList.add("hidden");
    // console.log(document.querySelector(".play").classList);
    // console.log(document.querySelector(".pause").classList);
  } else {
    // Pause the game
    // isPaused = true;
    document.querySelector(".play").classList.remove("hidden");
    document.querySelector(".pause").classList.add("hidden");
  }
});

document.querySelector("#restart").addEventListener("click", function () {
  clearInterval(timeRunner);
  clearInterval(generate);
  gameLoop();
});

// document.querySelector("#restart").addEventListener("click", function () {
//   setTimeout(function () {
//     clearInterval(timeRunner);
//     clearInterval(generate);
//     gameLoop();
//   }, 1500);
// });
