// UI code: connects the quiz logic (quiz.js) to the page (index.html).

const BEST_SCORE_KEY = "dev-days-quiz-best-score";

function loadBestScore() {
  try {
    const savedScore = localStorage.getItem(BEST_SCORE_KEY);
    if (savedScore === null) return null;

    const score = Number(savedScore);
    return Number.isFinite(score) && score >= 0 && score <= 100 ? score : null;
  } catch {
    return null;
  }
}

function saveBestScore(score) {
  try {
    localStorage.setItem(BEST_SCORE_KEY, String(score));
  } catch {
    // Storage may be unavailable, but the quiz should still work.
  }
}

let state = createQuiz([]);
let timeLeft = 0;
let timerId = null;
let bestScore = loadBestScore();

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const progressText = document.getElementById("progress");
const timerText = document.getElementById("timer");
const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options");
const feedbackText = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const scoreText = document.getElementById("score-text");
const gradeText = document.getElementById("grade-text");
const startBestScoreText = document.getElementById("start-best-score");
const resultBestScoreText = document.getElementById("result-best-score");
const newBestMessage = document.getElementById("new-best-message");

function renderBestScore() {
  const message = bestScore === null ? "No best score yet." : `Best score: ${bestScore}%`;
  startBestScoreText.textContent = message;
  resultBestScoreText.textContent = message;
}

function showScreen(screenToShow) {
  [startScreen, quizScreen, resultScreen].forEach((screen) => {
    screen.hidden = screen !== screenToShow;
  });
}

function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

function updateTimer() {
  timerText.textContent = formatTimeLeft(timeLeft);
  timerText.classList.toggle("warning", timeLeft <= 5);
}

function startTimer() {
  stopTimer();
  timeLeft = 15;
  updateTimer();
  timerId = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft === 0) {
      stopTimer();
      selectAnswer(null, true);
    }
  }, 1000);
}

function startQuiz() {
  stopTimer();
  state = createQuiz(shuffle(QUESTIONS));
  newBestMessage.textContent = "";
  renderBestScore();
  showScreen(quizScreen);
  renderQuestion();
}

function renderQuestion() {
  stopTimer();
  const question = state.questions[state.current];
  progressText.textContent = `Question ${state.current + 1} of ${state.questions.length}`;
  questionText.textContent = question.question;
  feedbackText.textContent = "";
  nextButton.hidden = true;
  optionsList.innerHTML = "";

  question.options.forEach((option, index) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.className = "option";
    button.textContent = option;
    button.addEventListener("click", () => selectAnswer(index, false, button));
    item.appendChild(button);
    optionsList.appendChild(item);
  });

  startTimer();
}

function selectAnswer(selectedIndex, timedOut, selectedButton) {
  if (state.answered) return;
  const result = answerQuestion(state, selectedIndex);
  state = result.state;
  stopTimer();
  const question = state.questions[state.current];
  const buttons = optionsList.querySelectorAll("button");
  buttons.forEach((button) => (button.disabled = true));

  if (timedOut) {
    buttons[question.answer].classList.add("correct");
    feedbackText.textContent = "Time's up!";
  } else if (result.correct) {
    selectedButton.classList.add("correct");
    feedbackText.textContent = "Correct!";
  } else {
    selectedButton.classList.add("wrong");
    buttons[question.answer].classList.add("correct");
    feedbackText.textContent = "Not quite. The correct answer is highlighted.";
  }

  nextButton.hidden = false;
  nextButton.focus();
}

function goToNextQuestion() {
  state = nextQuestion(state);
  if (!isQuizFinished(state)) {
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  stopTimer();
  const total = state.questions.length;
  const percentage = calculatePercentage(state.score, total);
  const previousBest = bestScore;
  if (isNewBestScore(percentage, bestScore)) {
    bestScore = percentage;
    saveBestScore(bestScore);
  }
  scoreText.textContent = `You scored ${state.score} out of ${total} (${percentage}%)`;
  gradeText.textContent = `Grade: ${getGrade(percentage)}`;
  renderBestScore();
  newBestMessage.textContent = isNewBestScore(percentage, previousBest)
    ? "🏆 New best score!"
    : "";
  showScreen(resultScreen);
}

document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("restart-btn").addEventListener("click", startQuiz);
nextButton.addEventListener("click", goToNextQuestion);
renderBestScore();
