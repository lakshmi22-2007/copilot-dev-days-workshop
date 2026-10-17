// Checks the quiz data in src/questions.js.
// These tests catch mistakes in new questions, whether you or Copilot wrote them.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { QUESTIONS } = require("../src/questions.js");

test("there are at least 5 questions", () => {
  assert.ok(QUESTIONS.length >= 5, `expected at least 5 questions, found ${QUESTIONS.length}`);
});

test("every question has text, 4 options and a valid answer index", () => {
  QUESTIONS.forEach((q, i) => {
    assert.equal(typeof q.question, "string", `question ${i + 1} needs question text`);
    assert.ok(q.question.trim().length > 0, `question ${i + 1} has empty text`);
    assert.equal(q.options.length, 4, `question ${i + 1} should have exactly 4 options`);
    assert.ok(
      Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length,
      `question ${i + 1} has an invalid answer index: ${q.answer}`
    );
  });
});

test("question texts are unique", () => {
  const texts = QUESTIONS.map((q) => q.question.trim().toLowerCase());
  assert.equal(new Set(texts).size, texts.length, "two questions have the same text");
});
