var timer;
var currentScore;
var counter;
var generate;
var timeRunner;
var isPaused = true;

let startButton;
const playButton = document.querySelector(".play");
const pauseButton = document.querySelector(".pause");
const gameControl = document.querySelector(".game-control");
const canvas = document.querySelector(".canvas");

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
  if (!isPaused) {
    if (timer > 0) {
      timer--;
      document.querySelector(".timer").textContent = timer
        .toString()
        .padStart(2, "0");
    } else {
      endGame();
    }
  }
}

function startGame() {
  startButton = document.querySelector(".start-button");
  startButton.style.setProperty("display", "none");
  gameControl.classList.toggle("is-clickable");
  togglePlayPause();
  timer = 3;
  currentScore = 0;
  counter = 0;
  updateScore(0);
  generateBubbles();
  timeRunner = setInterval(gameLoop, 1000);
}

function endGame() {
  updateHighScore();
  togglePlayPause();
  gameControl.classList.toggle("is-clickable");
  canvas.innerHTML = `<h1>GAME OVER!</h1>`;
  clearInterval(timeRunner);
  setTimeout(function () {
    canvas.innerHTML = `<button class="start-button" onclick="startGame()">Start</button>`; // Alternatively, use forEach to remove the bubbles
  }, 3000);
}

function updateScore(score) {
  currentScore += score;
  document.querySelector(".score").textContent = currentScore
    .toString()
    .padStart(2, "0");
}

function updateHighScore() {
  if (currentScore >= highScore) {
    highScore = currentScore;
    document.querySelector(".high-score").textContent = highScore;
    localStorage.setItem("highScore", highScore);
  }
}

function togglePlayPause() {
  if (gameControl.classList.contains("is-clickable")) {
    bubbles = document.querySelectorAll(".bubble");
    if (isPaused) {
      // Resume the game
      pauseButton.classList.remove("hidden");
      playButton.classList.add("hidden");
      bubbles.forEach(function (bubble) {
        bubble.style.setProperty("animation-play-state", "running");
      });
    } else {
      // Pause the game
      playButton.classList.remove("hidden");
      pauseButton.classList.add("hidden");
      bubbles.forEach(function (bubble) {
        bubble.style.setProperty("animation-play-state", "paused");
      });
    }
    isPaused = !isPaused;
  }
}

canvas.addEventListener("click", function (event) {
  if (event.target.classList.contains("bubble") && !isPaused) {
    event.target.style.setProperty("display", "none");
    updateScore(parseInt(event.target.dataset.score));
  }
});

playButton.addEventListener("click", togglePlayPause);
pauseButton.addEventListener("click", togglePlayPause);

document.querySelector(".restart").addEventListener("click", function () {
  window.location.reload();
});

// startButton.addEventListener("click", startGame);
