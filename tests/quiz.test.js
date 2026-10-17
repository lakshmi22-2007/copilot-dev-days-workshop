// Tests use Node's built-in test runner, so nothing needs to be installed.
// Run them with:  npm test
const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
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
} = require("../src/quiz.js");

const questions = [
  { question: "First", options: ["No", "Yes"], answer: 1 },
  { question: "Second", options: ["Yes", "No"], answer: 0 },
];

test("createQuiz returns a fresh initial state", () => {
  const state = createQuiz(questions);

  assert.deepEqual(state, { questions, current: 0, score: 0, answered: false });
  assert.notStrictEqual(state.questions, questions);
});

test("answerQuestion returns a new state and records a correct answer", () => {
  const state = createQuiz(questions);
  const result = answerQuestion(state, 1);

  assert.deepEqual(result, {
    state: { questions: state.questions, current: 0, score: 1, answered: true },
    correct: true,
  });
  assert.deepEqual(state, { questions: state.questions, current: 0, score: 0, answered: false });
  assert.notStrictEqual(result.state, state);
});

test("answerQuestion returns an incorrect result without changing the score", () => {
  const state = createQuiz(questions);
  const result = answerQuestion(state, 0);

  assert.equal(result.correct, false);
  assert.equal(result.state.score, 0);
  assert.equal(result.state.answered, true);
});

test("nextQuestion advances immutably and resets answered state", () => {
  const state = answerQuestion(createQuiz(questions), 1).state;
  const nextState = nextQuestion(state);

  assert.equal(nextState.current, 1);
  assert.equal(nextState.answered, false);
  assert.equal(state.current, 0);
});

test("isQuizFinished reports whether all questions have been shown", () => {
  const state = createQuiz(questions);

  assert.equal(isQuizFinished(state), false);
  assert.equal(isQuizFinished(nextQuestion(nextQuestion(state))), true);
});

test("isCorrect returns true for the right answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 2), true);
});

test("isCorrect returns false for a wrong answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 0), false);
});

test("calculatePercentage rounds to a whole number", () => {
  assert.equal(calculatePercentage(2, 3), 67);
});

test("calculatePercentage returns 0 when there are no questions", () => {
  assert.equal(calculatePercentage(0, 0), 0);
});

test("shuffle keeps every item and does not change the original array", () => {
  const original = [1, 2, 3, 4, 5];
  const result = shuffle(original);
  assert.deepEqual([...result].sort(), [1, 2, 3, 4, 5]);
  assert.deepEqual(original, [1, 2, 3, 4, 5]);
});

test("getGrade gives an A for exactly 90%", () => {
  assert.equal(getGrade(90), "A");
});

test("formatTimeLeft formats seconds with a timer icon", () => {
  assert.equal(formatTimeLeft(12), "⏱ 12s");
  assert.equal(formatTimeLeft(0), "⏱ 0s");
});

test("isNewBestScore returns true when there is no saved best", () => {
  assert.equal(isNewBestScore(0, null), true);
});

test("isNewBestScore returns true when current score is higher", () => {
  assert.equal(isNewBestScore(81, 80), true);
});

test("isNewBestScore returns false when current score is not higher", () => {
  assert.equal(isNewBestScore(80, 80), false);
  assert.equal(isNewBestScore(79, 80), false);
});
