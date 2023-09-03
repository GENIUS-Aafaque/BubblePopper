var timer = 10;
var currentScore = 0;
var counter = 0;

var highScore = parseInt(localStorage.getItem("highScore")) || 0;
document.querySelector(".high-score").textContent = highScore;

function generateBubbles() {
  var generate = setInterval(function () {
    counter += 1;
    bubble = document.createElement("div");
    bubble.className = `bubble c${counter}`;
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

function updateScore() {
  currentScore += 10;
  document.querySelector(".score").textContent = currentScore;
}

document.querySelector(".canvas").addEventListener("click", function (event) {
  if (event.target.classList.contains("bubble")) {
    event.target.style.setProperty("display", "none");
    updateScore();
  }
});

// Make this the initiator that runs the gameLoop - also css
document.addEventListener("keydown", function (event) {
  if (event.key === " ") {
    location.reload();
  }
});

gameLoop();
