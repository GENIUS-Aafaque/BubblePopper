var timer = 30;
var currentScore = 0;
var counter = 0;

var highScore = parseInt(localStorage.getItem("highScore")) || 0;
document.querySelector(".high-score").textContent = highScore;

function generateBubbles() {
  var generate = setInterval(function () {
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
  }, 750);
}

function gameLoop() {
  generateBubbles();
  var timeRunner = setInterval(function () {
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

// Make this the initiator that runs the gameLoop - also css
document.addEventListener("keydown", function (event) {
  if (event.key === " ") {
    location.reload();
  }
});

gameLoop();
