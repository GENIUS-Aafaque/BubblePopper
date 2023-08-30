var timer = 10;
var currentScore = 0;
var counter = 0;

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

function runTimer() {
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
  var highScore = document.querySelector(".high-score").textContent;
  if (currentScore >= highScore) {
    highScore = currentScore;
    document.querySelector(".high-score").textContent = highScore;
  }
}

function updateScore() {
  currentScore += 10;
  document.querySelector(".score").textContent = currentScore;
}

document.querySelector(".canvas").addEventListener("click", function (dets) {
  if (dets.target.classList.contains("bubble")) {
    dets.target.style.setProperty("display", "none");
    updateScore();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === " ") {
    location.reload();
  }
});

generateBubbles();
runTimer();
