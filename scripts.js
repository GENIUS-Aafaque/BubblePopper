var timer;
var currentScore;
var counter;
var generate;
var timeRunner;
var isPaused = true;

const playButton = document.querySelector(".play");
const pauseButton = document.querySelector(".pause");
const canvas = document.querySelector(".canvas");
const startButton = document.querySelector(".start-button");

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
      bubble.style.left = `${Math.floor(Math.random() * 70) + 10}%`;
      canvas.appendChild(bubble);
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
  canvas.innerHTML = "";
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
        canvas.innerHTML = `<h1>GAME OVER!</h1>`;
        setTimeout(function () {
          canvas.innerHTML = `<button class="start-button">Start</button>`;
        }, 3000);
        startButton.style.setProperty("display", "block");
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

canvas.addEventListener("click", function (event) {
  if (event.target.classList.contains("bubble")) {
    event.target.style.setProperty("display", "none");
    updateScore(parseInt(event.target.dataset.score));
  }
});

playButton.addEventListener("click", togglePlayPause);
pauseButton.addEventListener("click", togglePlayPause);

function togglePlayPause() {
  bubbles = document.querySelectorAll(".bubble");
  if (isPaused) {
    // Resume the game
    // isPaused = false;
    pauseButton.classList.remove("hidden");
    playButton.classList.add("hidden");
    bubbles.forEach(function (bubble) {
      bubble.style.setProperty("animation-play-state", "running");
    });
  } else {
    // Pause the game
    // isPaused = true;
    playButton.classList.remove("hidden");
    pauseButton.classList.add("hidden");
    bubbles.forEach(function (bubble) {
      bubble.style.setProperty("animation-play-state", "paused");
    });
  }
  isPaused = !isPaused;
}

document.querySelector(".restart").addEventListener("click", function () {
  window.location.reload();
});

startButton.addEventListener("click", function () {
  startButton.style.setProperty("display", "none");
  togglePlayPause();
  gameLoop();
});
