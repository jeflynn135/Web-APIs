var answerEl = document.getElementById("answer");
var choicesEl = document.getElementById("choices");
var timerEl = document.getElementById("timer");
var countdownEl = document.getElementById("countdown");
var startBtn = document.getElementById("start");
var submitBtn = document.getElementById("submit");
var buttonEl = document.getElementById("buttons");
var initialsEl = document.getElementById("initials");
var endScreen = document.getElementById("end-screen");
var finalScore = document.getElementById("final-score");
var timerInterval;
var secondsLeft = 60;
var questionIndex = 0;
console.log(questions);

// The startQuiz function is called when the start button is clicked
function startQuiz() {
  console.log("Game Started");
  document.querySelector("#quiz-intro").classList.add("hide");
  document.querySelector("#quiz-questions").classList.remove("hide");
}

function questionDisplay() {
  document.querySelector("#question-h1").textContent =
    questions[questionIndex].title;
  buttonEl.innerHTML = "";

  for (var i = 0; i < 4; i++) {
    var btn = document.createElement("button");
    btn.textContent = questions[questionIndex].choices[i];
    btn.onclick = checkAnswers;
    document.querySelector("#buttons").append(btn);
  }
}

function checkAnswers() {
  console.log(this);
  // check if answer is correct
  if (this.textContent === questions[questionIndex].answer) {
    correct();
  } else {
    incorrect();
  }
  questionIndex++;
  if (questionIndex >= questions.length) {
    // run end of game logic here
    quizEnd();
  } else {
    questionDisplay();
  }
}

function correct() {
  answerEl.textContent = "Correct!";
  setTimeout(function () {
    answerEl.textContent = "";
  }, 1000);
}

function incorrect() {
  answerEl.textContent = "Incorrect!";
  setTimeout(function () {
    answerEl.textContent = "";
  }, 1000);

  secondsLeft -= 10;

  if (secondsLeft < 0) {
    secondsLeft = 0;
  }
  // display new time on page
  timerEl.textContent = secondsLeft;
}

function setTime() {
  // Sets interval in variable
  timerInterval = setInterval(function () {
    secondsLeft--;
    timerEl.textContent = secondsLeft;

    if (secondsLeft <= 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // run end game function here
      quizEnd();
    }
  }, 1000);
}

function quizEnd() {
  clearInterval(timerInterval);
  // show end screen
  document.querySelector("#end-screen").classList.remove("hide");
  // show final score
  finalScore.textContent = secondsLeft;
  // hide questions section
  document.querySelector("#quiz-questions").classList.add("hide");
}

function saveHighscore() {
  var leaderboard = JSON.parse(window.localStorage.getItem('score')) || []
  // create score object
  var score = {
    score: secondsLeft,
    initials: initialsEl.value,
  };
  leaderboard.push(score)

  // set new submission to local storage
  localStorage.setItem("score", JSON.stringify(leaderboard));

  // redirect to next page
  window.location.href = "highscores.html";
}

submitBtn.onclick = saveHighscore;

startBtn.addEventListener("click", function () {
  setTime();
  startQuiz();
  questionDisplay();
});
