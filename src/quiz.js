// Core quiz logic.
// This file has NO browser (DOM) code so it can be tested with Node.js.

/**
 * Returns a new array with the items in random order.
 * The original array is not changed.
 */
function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Returns true when the selected option is the correct one.
 */
function isCorrect(question, selectedIndex) {
  return question.answer === selectedIndex;
}

/**
 * Converts a score into a whole-number percentage (0-100).
 */
function calculatePercentage(score, total) {
  if (total === 0) return 0;
  return Math.ceil((score / total) * 100);
}

/**
 * Turns a percentage into a grade.
 * A = 90% or more, B = 75% or more, C = 50% or more.
 */
function getGrade(percentage) {
  if (percentage >= 90) return "A";
  if (percentage >= 75) return "B";
  if (percentage >= 50) return "C";
  return "Keep practicing";
}

/**
 * Formats the remaining countdown time for display.
 */
function formatTimeLeft(seconds) {
  return `⏱ ${seconds}s`;
}

/**
 * Returns true when the current percentage beats the saved best percentage.
 */
function isNewBestScore(current, best) {
  return best === null || current > best;
}

/**
 * Creates the initial quiz state without changing the supplied questions.
 */
function createQuiz(questions) {
  return { questions: [...questions], current: 0, score: 0, answered: false };
}

/**
 * Records an answer and returns the resulting state plus whether it was correct.
 */
function answerQuestion(state, selectedIndex) {
  if (state.answered) return { state: { ...state }, correct: false };

  const question = state.questions[state.current];
  const correct = selectedIndex !== null && isCorrect(question, selectedIndex);
  return {
    state: {
      ...state,
      score: state.score + (correct ? 1 : 0),
      answered: true,
    },
    correct,
  };
}

/**
 * Advances to the next question without changing the supplied state.
 */
function nextQuestion(state) {
  return { ...state, current: state.current + 1, answered: false };
}

/**
 * Returns true when there are no more questions to display.
 */
function isQuizFinished(state) {
  return state.current >= state.questions.length;
}

// Lets Node.js tests load this file. Browsers ignore this block.
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    shuffle,
    isCorrect,
    calculatePercentage,
    getGrade,
    formatTimeLeft,
    isNewBestScore,
    createQuiz,
    answerQuestion,
    nextQuestion,
    isQuizFinished,
  };
}
