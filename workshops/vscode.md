# 🖥️ Guided session · VS Code: GitHub Copilot Dev Days Workshop (Intermediate)

> [← Workshop overview](../README.md) · Self-paced guides for home: [Copilot CLI](cli.md) · [Copilot app](copilot-app.md)

**10:45 – 13:30 IST · 10 chapters + bonus chapters · ≈ 16 chat requests on Copilot Free**

Take a small quiz app through a realistic workflow with GitHub Copilot in VS Code: plan, build, debug, refactor, add CI, package team know-how as a skill, and take an issue to a merged pull request. Adapted from the official [VS Code first steps](https://github-samples.github.io/copilot-workshops/first-steps/vscode/) workshop.

**You should already know:** VS Code, Git branches/commits/PRs, and basic JavaScript. We won't explain those.

---

## 📋 Contents

| # | Chapter | Time (IST) | 💬 |
|---|---|---|:---:|
| 0 | [Setup](#chapter-0-setup) | home + 10:45 – 10:50 | 0 |
| 1 | [Warm-up: completions & next edit suggestions](#chapter-1-warm-up-completions--next-edit-suggestions) | 10:50 – 11:05 | 0 |
| 2 | [Instructions: `/init` + path-specific rules](#chapter-2-instructions-init--path-specific-rules) | 11:05 – 11:20 | 1 |
| ☕ | Break | 11:20 – 11:50 | |
| 3 | [Plan mode → Agent mode: countdown timer](#chapter-3-plan-mode--agent-mode-countdown-timer) | 11:50 – 12:10 | 2–3 |
| 4 | [Debug the planted bug](#chapter-4-debug-the-planted-bug) | 12:10 – 12:20 | 1 |
| 5 | [Refactor with a safety net](#chapter-5-refactor-with-a-safety-net) | 12:20 – 12:30 | 1 |
| 6 | [Continuous integration with GitHub Actions](#chapter-6-continuous-integration-with-github-actions) | 12:30 – 12:40 | 1 |
| 7 | [Package know-how as an agent skill](#chapter-7-package-know-how-as-an-agent-skill) | 12:40 – 12:50 | 1 |
| 8 | [Build a backlog with GitHub MCP](#chapter-8-build-a-backlog-with-github-mcp) | 12:50 – 13:00 | 1 |
| 9 | [Issue → pull request → merge](#chapter-9-issue--pull-request--merge) | 13:00 – 13:25 | 3 |
| 10 | [Ship & retro](#chapter-10-ship--retro) | 13:25 – 13:30 | 0 |
| ⭐ | [Bonus chapters](#-bonus-chapters) | if you finish early / after the workshop | 1–6 |

Also: [Rules of the room](#-rules-of-the-room) · [Credit budget](#-credit-budget) · [Troubleshooting](#-troubleshooting)

---

## 🧭 Rules of the room

1. **Time-boxes are real.** Each chapter has an end time. If you're 5 minutes over, take the **🏃 Behind?** shortcut in that chapter and move on.
2. **Chapters are independent.** Skipping one never blocks a later one.
3. **One prompt, done well.** Copy prompts as written; only change `<placeholders>`. Don't re-roll a 90%-good result; finish it by hand.
4. **Review before you keep.** Read every diff. You own the code, not Copilot.
5. **Commit at every ✅.** Small commits make Undo cheap.

> 🎲 Copilot output varies between people. Don't compare code line by line; compare whether the **✅ Done when** checks pass.

## 💳 Credit budget

Copilot Free has about **2,000 completions** and **50 chat requests** per month (check <https://github.com/settings/copilot>; limits can change). One chat message = one request, however much work the agent does with it.

| | Requests |
|---|:---:|
| Core chapters 1–10 | ≈ 12–14 |
| ✨ One generated commit message + PR description | ≈ 2 |
| **Core total** | **≈ 16** |
| All bonus chapters | + up to 6 |

- **Before the day, make sure you have at least 25 requests left** this month.
- 💬 = sends a chat request · ⌨️ = completions only / no request · ✨ = may use a request.
- Use the **Auto** model (or the default). Avoid models with a cost multiplier.
- Out of requests? Pair with a neighbour and drive their session; every ⌨️ step still works for you.

**Track your usage:** before you start, note how many requests you've used (Copilot icon in the status bar, or <https://github.com/settings/copilot>). Check again at each ✅ checkpoint. You need about 16 for the core chapters.

### Shortcuts

| Action | Windows / Linux | macOS |
|---|---|---|
| Accept suggestion / next edit | `Tab` | `Tab` |
| Accept next word | `Ctrl` + `→` | `Cmd` + `→` |
| Cycle suggestions | `Alt` + `]` / `[` | `Option` + `]` / `[` |
| Inline chat | `Ctrl` + `I` | `Cmd` + `I` |
| Chat view | `Ctrl` + `Alt` + `I` | `Ctrl` + `Cmd` + `I` |
| Source Control | `Ctrl` + `Shift` + `G` | `Ctrl` + `Shift` + `G` |
| Terminal | `` Ctrl + ` `` | `` Ctrl + ` `` |

---

## Chapter 0: Setup

⏱ **At home:** tools and accounts (≈ 20 min, see the [prerequisites](../README.md#-prerequisites-complete-at-home-before-the-workshop)) · **In the hall: 10:45 – 10:50:** your repo copy and first run · 💬 0

🎯 Arrive with VS Code, Copilot and GitHub MCP ready. The workshop repo link is shared in the hall at 10:45; then you make your own copy and run it.

### 🏠 At home, before the workshop

#### 0.1 Accounts

1. Use a **personal** GitHub account (work-managed accounts may be blocked by policy).
2. Enable **Copilot Free** at <https://github.com/settings/copilot> (any paid plan also works).
3. Check you have **≥ 25 chat requests** left this month (same page, or the Copilot icon in VS Code).

#### 0.2 Tools

Choose one.

- **Local (recommended):** install the latest [VS Code](https://code.visualstudio.com/), [Git](https://git-scm.com/) and [Node.js 20+](https://nodejs.org/). Check with `git --version` and `node --version`.
- **Codespaces:** nothing to install. You'll create a codespace on your repo in the hall.

#### 0.3 Copilot and GitHub in VS Code

1. **Accounts** menu (bottom-left) → sign in with GitHub. The **Copilot icon** in the status bar should show your plan.
2. Install the **[GitHub Pull Requests](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)** extension (preinstalled in Codespaces) and sign in. A **GitHub** icon appears in the Activity Bar.
3. Open the **Chat view**. The mode dropdown under the input should list **Agent** and **Plan**. Set the model picker to **Auto**.

#### 0.4 Enable the GitHub MCP server

The GitHub MCP server lets Copilot create and read issues and pull requests (Chapters 8–9). Setting it up at home saves 10 minutes on the day.

1. Settings → search **GitHub MCP** → enable the built-in GitHub MCP server if your VS Code has it.
2. Check it's running: Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) → **MCP: List Servers** → **github** shows **Running**. Select **github** to see its options, such as **Show Output**.
3. **Optional:** if your version shows a **tools picker** (🔧) in the chat input in **Agent** mode, open it to see the GitHub tools. You can also type `/tools`. **Review** what the tools can do; they act as you.

No built-in option? You'll add a small config file in the hall (step 0.6).

### 🏛️ In the hall, 10:45 – 10:50

#### 0.5 Your copy of the repo

1. Open the workshop repo link shared by the speakers → **Use this template → Create a new repository**.
2. Owner: **you** · Name: `copilot-dev-days-workshop` · Visibility: **Public** (needed for free GitHub Pages and free Actions minutes).

#### 0.6 Open it

- **Local:**
  ```bash
  git clone https://github.com/<your-username>/copilot-dev-days-workshop.git
  cd copilot-dev-days-workshop
  code .
  ```
- **Codespaces:** on your repo, **Code → Codespaces → Create codespace on main**.

**Only if step 0.4 found no built-in GitHub MCP server:** create `.vscode/mcp.json`:
```json
{
  "servers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    }
  }
}
```
Click **Start** above `"github"`, sign in when asked, check that **MCP: List Servers** shows **github** as **Running**, and commit the file.

#### 0.7 Run it

```bash
npm test     # expect: 8 pass, 1 fail ("getGrade gives an A for exactly 90%")
npm start    # serves src/ at http://localhost:8080
```

Open the quiz (local: Command Palette → search **browser** to open it inside VS Code, or use your browser; Codespaces: **Ports** tab → 8080 → 🌐). Keep `npm start` running in one terminal; use a second terminal for everything else.

> 🐞 The 1 failing test is a **planted bug** for Chapter 4. Leave it.

### ✅ Done when
- [ ] Copilot icon shows your plan; **Agent** and **Plan** modes visible; model = Auto
- [ ] Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) → **MCP: List Servers** → **github** shows **Running**
- [ ] `npm test` → **8 pass / 1 fail**; quiz runs in a browser

---

## Chapter 1: Warm-up: completions & next edit suggestions

⏱ **10:50 – 11:05** · 💬 0 · 🔗 needs: nothing

🎯 Use the cheapest Copilot features (completions are nearly unlimited on Free) for hand-written code.

### 1.1 Comment → function ⌨️

In `src/quiz.js`, on the empty line above `// Lets Node.js tests load this file`, type:

```js
// Returns an encouraging message for a grade: "A", "B", "C" or anything else
function getFeedbackMessage(grade) {
```

Pause and press `Tab` to accept. Try `Alt+]` to see alternatives and `Ctrl+→` to accept word by word. Then add `getFeedbackMessage` to `module.exports` (type `, ` after `getGrade` and accept the suggestion).

### 1.2 Wire it into the page ⌨️

Your new `getFeedbackMessage` function exists, but nothing calls it yet. Two small changes connect it to the results screen: first add a place on the page to show the message, then fill it in when the quiz ends.

**Step A: add a place for the message in `src/index.html`**

1. Open `src/index.html` and find the results section (`<section id="result-screen" hidden>`).
2. Click at the end of this line and press `Enter`:
   ```html
   <p id="grade-text"></p>
   ```
3. Start typing `<p id="feedback-` and pause. Accept the suggestion with `Tab` so the new line reads:
   ```html
   <p id="feedback-message"></p>
   ```

**Step B: show the message when the quiz ends in `src/app.js`**

`showResults()` is the function that runs when the last question is answered. It currently looks like this:

```js
function showResults() {
  const total = state.questions.length;
  const percentage = calculatePercentage(state.score, total);
  scoreText.textContent = `You scored ${state.score} out of ${total} (${percentage}%)`;
  gradeText.textContent = `Grade: ${getGrade(percentage)}`;
  // 👉 put your cursor at the end of the line above and press Enter
  showScreen(resultScreen);
}
```

1. Open `src/app.js` and find `function showResults()`. Tip: press `Ctrl+F` (`Cmd+F` on Mac) and search for `showResults`.
2. Click at the **end** of the `gradeText.textContent = ...` line and press `Enter`. You now have an empty line just above `showScreen(resultScreen);`.
3. Type this, then pause:
   ```js
   document.getElementById("feedback-message").textContent =
   ```
4. Copilot suggests the rest in grey. Press `Tab` to accept. The finished line should look like this:
   ```js
   document.getElementById("feedback-message").textContent = getFeedbackMessage(getGrade(percentage));
   ```

**What this line does:** it finds the new `<p id="feedback-message">` on the page, works out the player's grade from their percentage, asks `getFeedbackMessage` for the matching message, and puts that message into the paragraph.

> 💡 No suggestion appeared, or it's different? Type the rest of the line yourself, exactly as shown above. It must stay **above** `showScreen(resultScreen);` so the message is filled in before the results screen appears.

**Check it:** save both files, refresh the quiz in the browser, and play to the end. Your feedback message should appear under the grade.

### 1.3 Next edit suggestions ⌨️

In `src/app.js`, change **only the declaration** `const feedbackText` to `const answerFeedback`. Watch the gutter for a **next edit suggestion** and press `Tab` repeatedly to jump to and accept each remaining usage. (Nothing appears? Settings → search `nextEditSuggestions` → enable.)

### 1.4 Generated data needs tests ⌨️

In `src/questions.js`, after the last question type `{` and accept a new question. Add **3**. Then run:

```bash
npm test
```

`tests/questions.test.js` checks every question has 4 options, a valid `answer` index and unique text. If it fails, fix the data. Then **manually** check each `answer` really points at the correct option; tests can't know facts.

### ✅ Done when
- [ ] Result screen shows a feedback message
- [ ] 9+ questions; `npm test` → only the planted failure
- [ ] Committed: `feat: add feedback message and questions`

🏃 **Behind?** Skip 1.3 and 1.4.

---

## Chapter 2: Instructions: `/init` + path-specific rules

⏱ **11:05 – 11:20** · 💬 1 · 🔗 needs: nothing

🎯 Teach Copilot your project's rules once, and see how context is assembled.

### 2.0 Your Copilot toolkit: files and commands (read first, 3 min) ⌨️

Before writing any instructions, here's a map of everything you'll use today. You don't need to memorise it; come back to it whenever a later chapter mentions one of these.

#### Files Copilot understands

```
your-repo/
├── AGENTS.md                              ← shared rules for any AI agent
├── .github/
│   ├── copilot-instructions.md            ← project-wide rules, always on
│   ├── instructions/*.instructions.md     ← rules for matching files only
│   ├── prompts/*.prompt.md                ← saved tasks you run as /name
│   ├── agents/*.agent.md                  ← custom roles with tool limits
│   └── skills/<name>/SKILL.md             ← workflow packs, auto or /name
└── .vscode/mcp.json                       ← external tools via MCP servers
```

| File | In plain words | How it's used | You'll meet it in |
|---|---|---|---|
| `AGENTS.md` | A "read me first" note of rules that **any** AI agent reads, not just Copilot | 🟢 Auto-loaded | Chapter 2 |
| `.github/copilot-instructions.md` | The same idea, just for Copilot: project-wide rules that are always on | 🟢 Auto-loaded | Chapter 2 (keep **one** of these two files) |
| `.github/instructions/*.instructions.md` | Rules that only apply to certain files, e.g. "how we write tests" | 🟢 Auto-loaded for matching files | Chapter 2.2 |
| `.github/prompts/*.prompt.md` | A prompt you saved so you can rerun it by typing `/name` | 🟣 You trigger it | Bonus B4 |
| `.github/agents/*.agent.md` | A custom Copilot "role", e.g. a reviewer that never edits files | 🟣 You pick it | Bonus B2 |
| `.github/skills/<name>/SKILL.md` | A step-by-step recipe for one repeatable task | 🟢 Auto-loaded when your request matches, or run as `/name` | Chapter 7 |
| `.vscode/mcp.json` | Connects Copilot to outside tools through MCP servers, e.g. GitHub | ⚪ Tool access | Chapters 0, 8 and 9 |

🟢 **Auto-loaded:** Copilot reads it on its own. 🟣 **You trigger or pick it:** nothing happens until you choose it. ⚪ **Tool access:** gives Copilot new abilities.

> 💡 Commit these files to your repo and **your whole team gets the same Copilot behaviour**.

#### Slash commands

Type `/` in the chat box to see the commands available to you. What appears depends on your VS Code version and the chat mode, so your list may be slightly different.

**Generate files with AI** (run these in a local **Agent** chat; each one sends a request)

| Command | What it does | Used in |
|---|---|---|
| `/init` | Reads your codebase and writes project instructions: either `AGENTS.md` at the project root or `.github/copilot-instructions.md` | **Chapter 2.1** |
| `/create-instructions` | Makes a targeted `.instructions.md` file for certain files | Alternative to Chapter 2.2 |
| `/create-prompt` | Makes a reusable `.prompt.md` file | Alternative to Bonus B4 |
| `/create-agent` | Makes a custom `.agent.md` role | Alternative to Bonus B2 |
| `/create-skill` | Makes a `SKILL.md` workflow pack | Alternative to Chapter 7.1 |
| `/create-hook` | Makes a hook: an action that runs automatically at agent events, e.g. after every edit | Not used today |

**Open and configure** (these open a view or picker)

| Command | What it does |
|---|---|
| `/agents` | Open and manage custom agents |
| `/instructions` | Open and manage instruction files |
| `/skills` | Open and manage agent skills |
| `/prompts` | Open and manage prompt files |
| `/hooks` | Open and manage hooks |
| `/models` | Open the model picker (choose **Auto** today) |
| `/tools` | Choose which tools Copilot may use in this chat, e.g. the GitHub tools |

**Everyday coding**

| Command | What it does | Used in |
|---|---|---|
| `/plan` | Plan before coding, without editing files | **Chapter 3** (same idea as Plan mode) |
| `/explain` | Explain the selected code | Any time you're unsure what code does |
| `/fix` | Propose a fix for a problem | Chapter 4 (we use a fuller prompt instead) |
| `/tests` | Generate unit tests | Chapters 4 and 5 (we ask for tests in the prompt) |
| `/doc` | Add documentation comments | Optional |
| `/new` | Scaffold a new project | Not used today |

**Session and debugging**

| Command | What it does | Used in |
|---|---|---|
| `/clear` | Start a new, empty chat | **Between chapters**, for fresh context |
| `/compact` | Shrink the conversation so it uses less context | Long chats |
| `/fork` | Branch this chat to try something different | Optional |
| `/troubleshoot` | Read the agent's debug logs | When something behaves oddly |
| `/debug` | Open the Chat Debug view | When something behaves oddly |
| `/<name>` | Run one of your skills or prompt files by name | Chapter 7, Bonus B4 |

> 💡 **Try it (free):** type `/` in the chat box and scroll through the list. Don't press Enter. Commands that make Copilot generate something use a request; just looking at the list doesn't.

### 2.1 Generate repository instructions 💬

**New Chat** (`+`) → **Agent** mode:

```text
/init Create concise rules for this project: plain JavaScript with no frameworks,
build tools or npm dependencies; pure logic in src/quiz.js (exported via module.exports
and tested with node:test); DOM code in src/app.js; colors only via CSS variables in :root;
accessible UI (buttons for actions, visible focus, aria-live for changing messages).
Tests run with `npm test`. Keep the file under 40 lines.
```

Copilot creates **either `AGENTS.md`** in the project root **or `.github/copilot-instructions.md`**, depending on your VS Code version. Both work the same way. Review the file before clicking **Keep**. Delete anything generic or untrue, then add a short **How I like code written** section with your own preferences.

> 💡 Keep **one** instructions file. If you end up with both, merge the rules into one and delete the other, so Copilot doesn't get duplicate or conflicting rules. To confirm it's used, send any Agent-mode prompt and check the response's **References** list for your file.

### 2.2 Add path-specific instructions ⌨️

Repository instructions apply everywhere. **Path-specific** instructions apply only to matching files. Manually create the file `.github/instructions/tests.instructions.md`:

```markdown
---
applyTo: "tests/**/*.js"
---
- Use only `node:test` and `node:assert/strict`. No other test libraries.
- One behaviour per test. Name tests "<function> <does what> <when>".
- Always cover edge cases: boundaries, empty input, null.
- Only test functions exported from src/*.js. Never test DOM code.
```

You'll see this take effect in Chapters 4 and 5.

### 2.3 Inspect the context ⌨️

**Context** is everything Copilot reads along with your message: your prompt, attached files and your instruction files. Exact labels differ between VS Code versions, so look for the closest match. **Don't send anything in this step.**

1. **See the file that's attached.** Open `tests/quiz.test.js` and look at the chat input. The open file appears as a small chip in or just above the input. Click its eye icon (or ×) to leave it out, then include it again.
2. **Add and remove context.** Type `#` in the chat input and choose `quiz.js` (or use the **Add Context** / 📎 button). Remove it again with its ×.
3. **Check your instruction files.** These aren't listed in the chat input; Copilot adds them automatically when you send a message.
   - In the **Explorer**, confirm you have **either `AGENTS.md` at the project root** (same level as `package.json`) **or `.github/copilot-instructions.md`**, but only one of them, plus `.github/instructions/tests.instructions.md`.
   - In Chapter 3, after you send your first prompt, expand **Used n references** (or **References**) under Copilot's reply. You should see **`AGENTS.md` or `.github/copilot-instructions.md`** in the list. `tests.instructions.md` only shows up when Copilot works on files in `tests/`, which happens in Chapter 4.

### ✅ Done when
- [ ] `AGENTS.md` or `.github/copilot-instructions.md` exists (only one) and you edited it
- [ ] `.github/instructions/tests.instructions.md` exists
- [ ] ✨ Committed and pushed. Try the sparkle button in Source Control **once** to see a generated message; for later chapters use the messages given (saves requests)

🏃 **Behind?** Paste the reference below into a new `AGENTS.md` file in the project root instead of running `/init` (saves a request too).

<details>
<summary>Reference instructions (<code>AGENTS.md</code> or <code>.github/copilot-instructions.md</code>)</summary>

```markdown
# Dev Days Quiz: Copilot instructions

## Project
Small quiz web app for a workshop. Plain HTML, CSS and JavaScript. Run tests with `npm test`.

## Rules
- No frameworks, build tools or npm dependencies.
- Pure logic lives in `src/quiz.js` and is exported via `module.exports`.
- DOM and event code lives in `src/app.js`. Data lives in `src/questions.js`.
- Colors only via CSS variables in `:root` in `src/style.css`.
- Accessible UI: buttons for actions, visible focus, `aria-live` for changing messages.

## How I like code written
- Small functions with clear names and early returns.
- `const`/`let`, never `var`. Comments only for non-obvious logic.
```
</details>

---

## ☕ Break: 11:20 – 11:50

Catch up to the end of Chapter 2 if you're behind.

---

## Chapter 3: Plan mode → Agent mode: countdown timer

⏱ **11:50 – 12:10** · 💬 2–3 · 🔗 needs: nothing

🎯 Agree on an approach **before** any edits, then let the agent build a multi-file feature.

### 3.1 Plan 💬

> 🔗 Plan mode is the same idea as the `/plan` command from 2.0.

**New Chat** → mode **Plan**:

```text
Plan how to add a 15-second countdown timer to each quiz question.
Requirements: show the remaining seconds above the question; when it reaches 0, treat it as
a wrong answer (disable options, highlight the correct one, show "Time's up!", show Next);
stop it when the player answers; reset it per question and on restart. Add a pure helper
formatTimeLeft(seconds) in quiz.js returning strings like "⏱ 12s", with tests. Make the timer
use the --wrong color and bold at 5 seconds or less via a CSS class.
List the files and functions you'd change and the risks (e.g. intervals leaking between
questions). Stop before editing.
```

**Review the plan like a tech lead:** Is the interval cleared on answer, timeout, next *and* restart? Is `formatTimeLeft` pure and exported? Does it respect your instructions file?

**💬 only if the plan is missing something**, reply once in the same chat with your changes.

### 3.2 Implement 💬

Switch to **Agent** (or use the plan's implement button if shown):

```text
Implement the plan. Then run `npm test` and fix anything you broke.
Don't touch the failing getGrade test; that bug is handled separately.
```

Approve `npm test` when asked. Review every diff in **Source Control**, then **Keep**.

### 3.3 Smoke test yourself ⌨️

- [ ] Answer quickly → timer stops; next question starts at 15
- [ ] Let one time out → "Time's up!", correct answer highlighted, Next shown
- [ ] ≤ 5s → red and bold
- [ ] Restart mid-quiz → only one timer (no double-speed countdown)
- [ ] `Tab` through answers → focus ring visible

### ✅ Done when
- [ ] Smoke test passes; `npm test` → only the planted failure
- [ ] Committed and pushed: `feat: add per-question countdown timer`

🏃 **Behind?** Skip the plan review reply. If the build is broken at 12:10, **Undo** (or `git restore .`) and move on. Later chapters don't need the timer.

---

## Chapter 4: Debug the planted bug

⏱ **12:10 – 12:20** · 💬 1 · 🔗 needs: nothing

🎯 Let the agent run the red → green loop, and verify its root-cause analysis.

### 4.1 Find, fix, prove 💬

**New Chat** → **Agent**:

```text
Run `npm test`. One test fails. Find the root cause in src/quiz.js, check whether the
same mistake affects related code, and fix it. Add tests for getFeedbackMessage, for the
getGrade boundaries at 90, 75 and 50, and for formatTimeLeft if it exists. Re-run
`npm test` until everything passes. Finish with a 2-3 sentence root-cause explanation.
```

Approve `npm test` after reading the command. **Don't** pick "always allow" for arbitrary commands.

### 4.2 Verify ⌨️

1. `npm test` in your own terminal → all green.
2. The root cause: `getGrade` used `>` instead of `>=`, so **all three** boundaries were wrong. Did the agent find all three?
3. Open the new tests. Do they follow `tests.instructions.md` (naming, `node:assert/strict`, edge cases)? That's path-specific instructions at work.

### ✅ Done when
- [ ] `npm test` all green
- [ ] Committed and pushed: `fix: correct grade boundaries and add tests`

🏃 **Behind?** Fix it by hand: change the three `>` to `>=` in `getGrade`. Zero requests.

---

## Chapter 5: Refactor with a safety net

⏱ **12:20 – 12:30** · 💬 1 · 🔗 needs: green tests (Chapter 4)

🎯 Use tests as a safety net for an agent-driven refactor that must **not** change behaviour.

### 5.1 Refactor 💬

Commit first (so Undo is free). **New Chat** → **Agent**:

```text
Refactor without changing behaviour: move the quiz state transitions out of src/app.js into
pure functions in src/quiz.js: createQuiz(questions) returning a new state object,
answerQuestion(state, selectedIndex) returning { state, correct } without mutating the input,
and isQuizFinished(state). Export them, use them in app.js so app.js only renders and handles
events, and add tests for each. Don't change the HTML, CSS or questions. Run `npm test` until
green, then summarise what moved where in a short table.
```

### 5.2 Review like a reviewer ⌨️

- [ ] `npm test` green, and the new functions **don't mutate** their input (is there a test for it?)
- [ ] `app.js` got simpler; nothing DOM-related moved into `quiz.js`
- [ ] Repeat the Chapter 3 smoke test; behaviour is unchanged

### ✅ Done when
- [ ] Tests green, smoke test passes, committed: `refactor: move quiz state into pure functions`

🏃 **Behind?** Skip this chapter. If the refactor broke something you can't fix in 2 minutes, `git restore .` and continue.

---

## Chapter 6: Continuous integration with GitHub Actions

⏱ **12:30 – 12:40** · 💬 1 · 🔗 needs: nothing

🎯 Make GitHub run your tests on every push and pull request, so Chapter 9's PR gets a real status check.

### 6.1 Generate the workflow 💬

**Agent** mode:

```text
Create .github/workflows/test.yml: a GitHub Actions workflow named "Tests" with one job "test"
on ubuntu-latest that runs on pushes to main and on all pull requests. Steps: actions/checkout@v4,
actions/setup-node@v4 with Node.js 20, then `npm test`. No caching or install step; the project
has no dependencies. Add a short comment at the top explaining what it does.
```

Compare with the reference below. Keep it if it's equivalent.

<details>
<summary>Reference workflow</summary>

```yaml
# Runs the quiz tests on every push to main and every pull request.
name: Tests
on:
  push:
    branches: [main]
  pull_request:
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm test
```
</details>

### 6.2 Push and watch it run ⌨️

1. Commit `ci: run tests on push and pull request` and push.
2. On GitHub, open your repo's **Actions** tab. The **Tests** run should go green in under a minute.
3. Add a status badge at the top of your `README.md` (completions will help you type it):
   ```markdown
   ![Tests](https://github.com/<your-username>/copilot-dev-days-workshop/actions/workflows/test.yml/badge.svg)
   ```

> 🔐 Push rejected with a message about **`workflow` scope**? See [Troubleshooting](#-troubleshooting).

### ✅ Done when
- [ ] Green **Tests** run in the Actions tab; badge shows on your README

🏃 **Behind?** On GitHub: **Add file → Create new file** → `.github/workflows/test.yml` → paste the reference → commit. Then `git pull`.

---

## Chapter 7: Package know-how as an agent skill

⏱ **12:40 – 12:50** · 💬 1 · 🔗 needs: nothing

🎯 Turn a repeatable task into an **agent skill**: a folder of instructions Copilot loads automatically when the task matches. The same skill works in VS Code, Copilot CLI and the Copilot app.

### 7.1 Write the skill ⌨️

> 🔗 This is the `.github/skills/<name>/SKILL.md` file from the 2.0 map. You could also generate one with `/create-skill`; today we write it by hand so it costs no request.

Create `.github/skills/add-quiz-questions/SKILL.md`:

```markdown
---
name: add-quiz-questions
description: Add new multiple-choice questions to the Dev Days Quiz. Use when asked to add, write or generate quiz questions.
---

# Add quiz questions

1. Read `src/questions.js` and match the object shape exactly: `{ question, options, answer }`.
2. Every question has exactly 4 options. `answer` is the zero-based index of the correct option.
3. Spread correct answers across positions 0-3. No "all of the above" or trick questions.
4. Keep questions under 100 characters, factual and verifiable. Don't duplicate existing ones.
5. If the start screen in `src/index.html` mentions a question count, update it.
6. Run `npm test` (it validates the question data) and fix any failures.
7. Finish with a table: question, correct answer, and a one-line source or explanation.
```

### 7.2 Use it 💬

**New Chat** → **Agent**:

```text
Add 3 quiz questions about GitHub Actions.
```

Notice you didn't repeat any rules. Check the response mentions using the **add-quiz-questions** skill, and verify the table's answers yourself.

### ✅ Done when
- [ ] 3 new questions; start-screen count correct; `npm test` green
- [ ] Committed and pushed: `feat: add skill and GitHub Actions questions`

🏃 **Behind?** Commit the skill file only; you'll still have it for later.

> 💡 Skill not picked up? Make sure the folder name matches `name:` and check Settings for an **agent skills** option (search `skills`).

---

## Chapter 8: Build a backlog with GitHub MCP

⏱ **12:50 – 13:00** · 💬 1 · 🔗 needs: GitHub MCP (Chapter 0.4), latest code pushed

🎯 Create well-specified issues from chat.

### 8.1 Create issues 💬

**New Chat** → **Agent**. Replace `<owner>` with your username:

```text
Using the GitHub tools, create three issues in <owner>/copilot-dev-days-workshop. Each needs a
clear title, a user-focused description and a checklist of acceptance criteria. Don't implement anything.
1. Best score: save the best percentage in localStorage, show it on the start and result screens,
   and celebrate a new best score.
2. Progress bar: show how far through the quiz the player is.
3. Keyboard shortcuts: keys 1-4 select the matching answer.
```

Read each `create_issue` call before approving.

### 8.2 Tighten the spec ⌨️

**GitHub** view → **Issues** → open **Best score**. Add this criterion on GitHub if it's missing: *"Works when localStorage is unavailable (no crash)."*

### ✅ Done when
- [ ] Three issues with acceptance criteria exist in your repo

🏃 **Behind?** Create just the Best score issue by hand on GitHub.

---

## Chapter 9: Issue → pull request → merge

⏱ **13:00 – 13:25** · 💬 3 · 🔗 needs: Best score issue; CI (Chapter 6) recommended

🎯 Deliver an issue end to end: branch, plan, build, PR with green CI, review, merge.

### 9.1 Branch from the issue ⌨️

**GitHub** view → hover **Best score** → **Start Working on Issue** (creates a branch). Or:

```bash
git switch -c feature/<issue-number>-best-score
```

### 9.2 Plan from the issue 💬

**New Chat** → **Plan**:

```text
Using the GitHub tools, read issue #<issue-number> in <owner>/copilot-dev-days-workshop.
Plan the implementation, mapping each acceptance criterion to the change that satisfies it.
Include a pure function isNewBestScore(current, best) in quiz.js (best may be null) with tests,
and wrap all localStorage access in try/catch. Stop before editing.
```

### 9.3 Build 💬

Switch to **Agent**:

```text
Implement the plan, then run `npm test` and fix any failures.
```

Smoke test: play twice; best score survives a refresh; 🏆 only when you beat it; quiz still works in a private window.

### 9.4 Open the PR ✨

1. Commit `feat: add best score (#<issue-number>)`, then **Publish Branch**.
2. **Create Pull Request** in Source Control → use ✨ to draft the title/description → make sure it contains **`Closes #<issue-number>`** → **Create**.
3. Watch the **Tests** check run on the PR (from Chapter 6). Wait for ✅.

### 9.5 Review: the Copilot Free way 💬

Copilot code review isn't included in Copilot Free, so do a **human review + criteria check**:

1. In the **GitHub** view, open the PR, read every file and leave at least one review comment.
2. Same chat:
   ```text
   Using the GitHub tools, compare pull request #<pr-number> with the acceptance criteria in
   issue #<issue-number>. For each criterion: met / not met, with evidence from the diff.
   Flag anything the PR changes that the issue didn't ask for. Don't change any code.
   ```
3. Fix any gaps by hand (completions are free), commit, push. CI re-runs automatically.

### 9.6 Merge ⌨️

When **Tests** is green: merge (squash) from the GitHub view or github.com. Confirm the issue closed. Then switch to `main` and **pull**.

### ✅ Done when
- [ ] PR merged with a green **Tests** check; issue closed automatically
- [ ] Local `main` up to date

🏃 **Behind?** Skip 9.2 and send the 9.3 prompt with *"Implement issue #<n>"* instead (saves a request and time).

---

## Chapter 10: Ship & retro

⏱ **13:25 – 13:30** · 💬 0

1. **GitHub Pages:** repo **Settings → Pages** → **Deploy from a branch** → `main` / `(root)` → **Save**. In ~2 minutes your quiz is live at `https://<your-username>.github.io/copilot-dev-days-workshop/`. Share it!
2. **Usage:** click the Copilot status bar icon and compare with the number you noted at the start.
3. **Codespaces:** stop your codespace at <https://github.com/codespaces>.
4. **Retro (2 min with a neighbour):** Where did Plan mode change the outcome? When was Copilot wrong, and what caught it: you, tests, CI or the criteria check?

| Use… | When… |
|---|---|
| Completions / NES | you know what to write, or you're rippling an edit |
| Instructions (repo + path) | you keep repeating the same guidance |
| Plan mode | ambiguous, cross-cutting or expensive-to-undo work |
| Agent mode | you can describe "done" and you'll review the diff |
| Skills | a task your team repeats with the same rules |
| GitHub MCP | the work involves issues, PRs or other GitHub data |
| Tests + CI | always: they catch what reviews miss |

---

## ⭐ Bonus chapters

Do these if you finish early, or after the workshop. Each is independent.

### B1: Accessibility & security audit (💬 1–2)

```text
Audit src/ for accessibility (keyboard use, focus order and visibility, color contrast in light
and dark themes, aria-live, prefers-reduced-motion) and security (DOM XSS, unsafe innerHTML,
parsing values from localStorage). Return a prioritised table: issue, file, why it matters,
suggested fix. Don't change any code.
```

Then fix the top item with one follow-up prompt (💬 +1).

### B2: A custom reviewer agent (💬 1)

> 🔗 This is the `.github/agents/*.agent.md` file from 2.0. `/create-agent` can generate one, and `/agents` lets you manage them.

Create `.github/agents/quiz-reviewer.agent.md`:

```markdown
---
name: quiz-reviewer
description: Reviews changes in this repo against the project rules. Never edits files.
---
You are a strict but kind reviewer for the Dev Days Quiz. Never edit files.
Review the current changes against the repository instructions (AGENTS.md or .github/copilot-instructions.md) and report:
1. Rule violations (file + line). 2. Missing tests. 3. Accessibility risks.
4. One thing done well. Keep it under 15 lines.
```

Select **quiz-reviewer** in the agent/mode dropdown and send: `Review my uncommitted changes.`

### B3: Second issue (💬 2)

Repeat Chapter 9 for **Progress bar** or **Keyboard shortcuts** in exactly two prompts (Plan + Agent).

### B4: A reusable prompt file (💬 1, VS Code only)

> 🔗 This is the `.github/prompts/*.prompt.md` file from 2.0. `/create-prompt` can generate one, and `/prompts` lets you manage them.

Create `.github/prompts/smoke-test.prompt.md`:

```markdown
---
description: Smoke test the quiz
mode: agent
---
Run `npm test`. Then list a manual smoke-test checklist for the features changed on this branch
compared to main, with expected results.
```

Type `/smoke-test` in chat to run it.

---

## 🛠 Troubleshooting

| Problem | Fix |
|---|---|
| No **Plan** mode | Update VS Code. Fallback: Agent mode + "Only produce a plan. Do not edit any files." |
| No ghost text / NES | Copilot icon → signed in? completions on? Settings → `nextEditSuggestions`. |
| GitHub MCP not running, or no tools picker | Command Palette → **MCP: List Servers** → **github** → **Start**, and sign in with your personal account. Still failing? Choose **Show Output** to read the error. The tools picker (🔧) isn't shown in every VS Code version; if **github** shows **Running**, the tools are available. |
| Push rejected: `refusing to allow ... workflow ... without workflow scope` | VS Code: sign out and back in to GitHub from the Accounts menu and accept the permissions. With `gh`: `gh auth refresh -h github.com -s workflow`. Or create the file on github.com (Chapter 6 🏃). |
| Actions tab shows nothing | Make sure the file is at exactly `.github/workflows/test.yml` and was pushed to `main`. |
| `/init` created `AGENTS.md`, not `.github/copilot-instructions.md` | Expected in newer VS Code versions. Keep it; both files work. If `AGENTS.md` doesn't appear in a response's **References**, search Settings for **AGENTS.md** and turn it on. |
| Skill not used | Folder name = `name:` in SKILL.md; check Settings for an agent skills option; mention "use the add-quiz-questions skill". |
| Monthly limit reached | Pair up; ⌨️ steps still work; every 🏃 shortcut is request-free. |
| `npm test` "Could not find" | Run from the repo root; `node --version` ≥ 20. |
| Agent made a mess | **Undo** in chat, or `git restore .` |
| Pages 404 | Wait 2 min; `main` / `(root)`; repo must be public on a free account. |

---

> Adapted from [Visual Studio Code first steps](https://github-samples.github.io/copilot-workshops/first-steps/vscode/) by James Montemagno, part of [github-samples/copilot-workshops](https://github.com/github-samples/copilot-workshops) (MIT License).
