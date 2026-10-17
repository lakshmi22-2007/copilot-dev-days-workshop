# Project Guidelines

## Stack and boundaries

- Use plain JavaScript only: no frameworks, build tools, or npm dependencies.
- Keep quiz logic pure and DOM-free in [src/quiz.js](src/quiz.js).
- Export testable logic from `src/quiz.js` with `module.exports`.
- Keep browser and DOM behavior in [src/app.js](src/app.js).
- Keep quiz data in [src/questions.js](src/questions.js).

## Styling and accessibility

- Define all colors as CSS custom properties in `:root` in [src/style.css](src/style.css), then use `var(...)`.
- Use native `<button>` elements for actions; preserve visible `:focus-visible` styles.
- Put changing user feedback or status messages in an `aria-live` region.
- Preserve semantic HTML and keyboard-accessible interactions.

## Tests and workflow

- Run `npm test` after logic or question-data changes.
- Tests use Node's built-in `node:test`; add focused tests in [tests/quiz.test.js](tests/quiz.test.js) or [tests/questions.test.js](tests/questions.test.js).
- Keep logic changes independent of browser APIs so they remain runnable under Node.
- Follow the broader workshop flow and prerequisites in [README.md](README.md) and [workshops/vscode.md](workshops/vscode.md).