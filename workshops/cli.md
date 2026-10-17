# ⌨️ Self-paced · Copilot CLI: GitHub Copilot Dev Days Workshop (Intermediate)

> [← Workshop overview](../README.md) · Guided session: [VS Code](vscode.md) · Also self-paced: [Copilot app](copilot-app.md)

**Self-paced at home (about 2½ hours) · 10 chapters + bonus chapters · ≈ 14 requests on Copilot Free**

> 💬 **Self-paced guide.** The guided session at the event uses VS Code; do this one at home whenever it suits you. **Questions?** Contact us at <https://www.linkedin.com/company/azure-developer-community-tamilnadu/>.

Take a small quiz app through a realistic workflow **without leaving your terminal**: plan, build, debug, refactor, add CI, package team know-how as a skill, and take an issue to a merged pull request in its own worktree. Adapted from the official [Copilot CLI first steps](https://github-samples.github.io/copilot-workshops/first-steps/copilot-cli/) workshop.

**You should already know:** the terminal, Git branches/commits/PRs, and basic JavaScript.

---

## 📋 Contents

| # | Chapter | Suggested time | 💬 |
|---|---|---|:---:|
| 0 | [Setup](#chapter-0-setup) | ≈ 25 min | 0 |
| 1 | [Warm-up: prompts, approvals, `!` and `/diff`](#chapter-1-warm-up-prompts-approvals--and-diff) | ≈ 15 min | 1 |
| 2 | [Instructions: `/init` + path-specific rules](#chapter-2-instructions-init--path-specific-rules) | ≈ 15 min | 1 |
| 3 | [`/plan` → build: countdown timer](#chapter-3-plan--build-countdown-timer) | ≈ 20 min | 1–2 |
| 4 | [Debug the planted bug](#chapter-4-debug-the-planted-bug) | ≈ 10 min | 1 |
| 5 | [Refactor with a safety net](#chapter-5-refactor-with-a-safety-net) | ≈ 10 min | 1 |
| 6 | [Continuous integration with GitHub Actions](#chapter-6-continuous-integration-with-github-actions) | ≈ 10 min | 1 |
| 7 | [Package know-how as an agent skill](#chapter-7-package-know-how-as-an-agent-skill) | ≈ 10 min | 1 |
| 8 | [Build a backlog](#chapter-8-build-a-backlog) | ≈ 10 min | 1 |
| 9 | [Worktree session → pull request → merge](#chapter-9-worktree-session--pull-request--merge) | ≈ 25 min | 2–3 |
| 10 | [Ship & retro](#chapter-10-ship--retro) | ≈ 5 min | 0 |
| ⭐ | [Bonus chapters](#-bonus-chapters) | if you finish early / after the workshop | 1–6 |

Also: [Ground rules](#-ground-rules) · [Credit budget](#-credit-budget) · [Cheat sheet](#-cheat-sheet) · [Troubleshooting](#-troubleshooting)

---

## 🧭 Ground rules

1. **Use the suggested times as a guide.** Stuck for more than 5 minutes? Take the chapter's **🏃 Behind?** shortcut and move on.
2. **Chapters are independent.** Skipping one never blocks a later one.
3. **One prompt, done well.** Copy prompts as written; only change `<placeholders>`.
4. **`/diff` before every commit.** You own the code, not Copilot.
5. **Commit at every ✅.** Small commits make `git restore .` cheap.
6. **`/clear` between chapters.** Fresh context gives better results; your instructions file carries the rules.

> 🎲 Output varies between people. Compare whether **✅ Done when** passes, not the code.

## 💳 Credit budget

Each prompt you send to the agent = **one request**, however many files it reads or commands it runs. Copilot Free has about **50 per month** (check <https://github.com/settings/copilot>; limits can change).

| | Requests |
|---|:---:|
| Core chapters 1–10 | ≈ 12–14 |
| All bonus chapters | + up to 6 |

- **Before the day, make sure you have at least 25 requests left** this month.
- **Free:** slash commands (`/diff`, `/context`, `/clear`, `/resume`, `/model`, `/worktree`) and `!` shell commands don't send a prompt to the model. Use `!git` and `!npm test` yourself.
- In `/model`, pick **Auto** (or the default). Avoid models with a cost multiplier.
- `/delegate`, cloud sessions and Copilot code review need a **paid plan**; this guide doesn't use them.
- Out of requests? Your allowance resets monthly; `!` commands and manual edits still work.

**Track your usage:** before you start, note how many requests you've used at <https://github.com/settings/copilot> (or run `/usage` in Copilot CLI, if your version has it). Check again at each ✅ checkpoint. You need about 14 for the core chapters.

## 🧾 Cheat sheet

| Command / key | What it does | Costs a request? |
|---|---|:---:|
| `copilot` / `copilot --resume` | Start / resume a session | no |
| `/model` | Choose the model | no |
| `/init <prompt>` | Generate agent instructions | yes |
| `/plan` | Switch to plan mode (no edits) | the prompt does |
| `/diff` | Show what the session changed | no |
| `/context` · `/clear` · `/compact` | Inspect · reset · summarise context | no (`/compact` may) |
| `/worktree` | Move the session into its own worktree + branch | no |
| `/resume` | Switch sessions inside the CLI | no |
| `/pr create` | Open a PR from the current branch | may |
| `!<command>` | Run a shell command | no |
| `←` then `Tab` | Side panel: Current · Sessions · Issues · Pull requests | no |
| In Issues: `Enter` / `c` / `o` | Read issue / add to chat / open in browser | no |

---

## Chapter 0: Setup

⏱ **≈ 25 min** · 💬 0

🎯 Install Copilot CLI and sign in, then make your own copy of the workshop repo and run it.

### Step A: Install and sign in

#### 0.1 Accounts and tools

1. A **personal** GitHub account with **Copilot Free** (or any plan) at <https://github.com/settings/copilot>, with **≥ 25 requests** left.
2. **Git** and **Node.js 20+** (`git --version`, `node --version`).
3. **GitHub CLI** (`gh`): <https://cli.github.com/>, then:
   ```bash
   gh auth login
   gh auth refresh -h github.com -s workflow   # lets you push GitHub Actions files in Chapter 6
   ```
4. **Locked-down laptop?** Use a **Codespace** on your repo instead (it has Git, Node and `gh`) and install Copilot CLI there.

#### 0.2 Install Copilot CLI and sign in

See the [official install guide](https://docs.github.com/copilot/how-tos/set-up/install-copilot-cli). Common options:

```bash
npm install -g @github/copilot     # needs Node.js 22+
brew install copilot-cli           # macOS / Linux (Homebrew)
winget install GitHub.Copilot      # Windows
```

Then run `copilot` once in any folder, sign in when prompted (or `/login`), and `/exit`. Signing in first saves time later.

### Step B: Your copy of the repo

#### 0.3 Create and clone your repo

Create your own copy from the workshop template and clone it:

```bash
gh repo create copilot-dev-days-workshop \
  --template NaveenPrabhuC/copilot-dev-days-workshop \
  --public --clone
cd copilot-dev-days-workshop
```

#### 0.4 First run

```bash
copilot
```

1. **Trust the folder** when asked (sign in first if prompted).
2. `/model` → **Auto** (or the default).
3. Run:
   ```text
   !npm test
   ```
   Expect **8 pass, 1 fail** (`getGrade gives an A for exactly 90%`). That's the **planted bug** for Chapter 4. Leave it.
4. Open the quiz. It uses plain `<script>` tags, so it opens straight from disk:
   ```text
   !open src/index.html          # macOS
   !start src\index.html         # Windows
   !xdg-open src/index.html      # Linux
   ```
   **Codespaces:** run `npm start` in a second terminal → **Ports** tab → 8080 → 🌐.
5. Keep this session open for Chapter 1.

### ✅ Done when
- [ ] `copilot` starts in your repo, folder trusted, model chosen
- [ ] `!npm test` → **8 pass / 1 fail**; the quiz opens in a browser

---

## Chapter 1: Warm-up: prompts, approvals, `!` and `/diff`

⏱ **≈ 15 min** · 💬 1 · 🔗 needs: nothing

🎯 Learn the CLI loop: prompt → approve → `/diff` → verify → commit.

### 1.1 A scoped change 💬

```text
Add a getFeedbackMessage(grade) function to src/quiz.js that returns an encouraging message for
grades "A", "B", "C" and anything else, and export it. Show it on the result screen in a new
<p id="feedback-message"> under the grade. Also add 3 new questions to src/questions.js in the
same format. Change nothing else.
```

The agent asks before editing files or running commands. Read each request. You can approve once or for the session. **Never approve a shell command you don't understand.**

### 1.2 Review and verify ⌨️

```text
/diff
!npm test
```

`tests/questions.test.js` validates the new questions (4 options, valid `answer` index, unique text). Then check yourself that each `answer` points at the **correct** option; tests can't know facts. Reload the quiz and finish a round to see the message.

### 1.3 Commit yourself (free) ⌨️

```text
!git add -A
!git commit -m "feat: add feedback message and questions"
!git push
```

### ✅ Done when
- [ ] Feedback message shows; 9+ questions; `!npm test` → only the planted failure
- [ ] Pushed

🏃 **Behind?** Skip verifying the question facts; do it later.

---

## Chapter 2: Instructions: `/init` + path-specific rules

⏱ **≈ 15 min** · 💬 1 · 🔗 needs: nothing

🎯 Teach Copilot your rules once, and see exactly what's in its context.

### 2.0 Your Copilot toolkit: the files (read first, 3 min)

Before writing any instructions, here's a map of the files that shape Copilot's behaviour. You don't need to memorise it; come back to it whenever a later chapter mentions one of these.

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

> ℹ️ In Copilot CLI, the GitHub tools are built in, so you don't need `.vscode/mcp.json` (that file is for VS Code). For commands, see the [cheat sheet](#-cheat-sheet), or type `/` in a session to see everything your version supports.

### 2.1 Generate repository instructions 💬

```text
/clear
```

Always include a prompt after `/init` (on its own it can return `Command input required`):

```text
/init Create concise rules for this project: plain JavaScript with no frameworks, build tools or
npm dependencies; pure logic in src/quiz.js (exported via module.exports, tested with node:test);
DOM code in src/app.js; colors only via CSS variables in :root; accessible UI. Tests run with
`npm test`. Keep it under 40 lines.
```

Review the generated file before accepting it, and **note its path** (for example `.github/copilot-instructions.md` or `AGENTS.md`). Edit it in any editor: delete anything generic or untrue and add a short **How I like code written** section.

### 2.2 Add path-specific instructions ⌨️

Manually create the file `.github/instructions/tests.instructions.md` in any editor:

```markdown
---
applyTo: "tests/**/*.js"
---
- Use only `node:test` and `node:assert/strict`. No other test libraries.
- One behaviour per test. Name tests "<function> <does what> <when>".
- Always cover edge cases: boundaries, empty input, null.
- Only test functions exported from src/*.js. Never test DOM code.
```

These rules apply only when Copilot works on matching files. Watch for them in Chapters 4 and 5.

### 2.3 Inspect and reset context ⌨️

```text
/context
```

See how much of the window is used by conversation, files and instructions. Then `/clear`.

> 🧠 A drifting conversation or a full window explains more bad results than a bad prompt.

```text
!git add -A
!git commit -m "docs: add agent and test instructions"
!git push
```

### ✅ Done when
- [ ] Instructions file (edited) and `tests.instructions.md` pushed
- [ ] You've used `/context` and `/clear`

🏃 **Behind?** Skip `/init` and paste this as `.github/copilot-instructions.md` (saves a request):

<details>
<summary>Reference instructions</summary>

```markdown
# Dev Days Quiz: agent instructions

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

## Chapter 3: `/plan` → build: countdown timer

⏱ **≈ 20 min** · 💬 1–2 · 🔗 needs: nothing

🎯 Agree on an approach before any edits, then let the plan drive the build.

### 3.1 Plan 💬

```text
/clear
/plan
```

```text
Plan how to add a 15-second countdown timer to each quiz question.
Requirements: show the remaining seconds above the question; when it reaches 0, treat it as a
wrong answer (disable options, highlight the correct one, show "Time's up!", show Next); stop it
when the player answers; reset it per question and on restart. Add a pure helper
formatTimeLeft(seconds) in quiz.js returning strings like "⏱ 12s", with tests. Make the timer use
the --wrong color and bold at 5 seconds or less via a CSS class. After implementing, run
`npm test` and fix anything you broke, but leave the failing getGrade test alone.
List the files and functions you'd change and the risks (e.g. intervals leaking between
questions). Stop before editing.
```

**Review the plan like a tech lead:** is the interval cleared on answer, timeout, next *and* restart? Is `formatTimeLeft` pure and exported?

**💬 +1 only if needed:** reply once with what's missing. Then **approve** the plan; the session continues into implementation with the plan as its brief.

### 3.2 Review and smoke test ⌨️

```text
/diff
!npm test
```

Reload the quiz:

- [ ] Answer quickly → timer stops; next question starts at 15
- [ ] Let one time out → "Time's up!", correct answer highlighted, Next shown
- [ ] ≤ 5s → red and bold
- [ ] Restart mid-quiz → only one timer
- [ ] `Tab` through answers → focus ring visible

```text
!git add -A
!git commit -m "feat: add per-question countdown timer"
!git push
```

### ✅ Done when
- [ ] Smoke test passes; `!npm test` → only the planted failure; pushed

🏃 **Behind?** If it's still broken after 20 minutes, `!git restore .` and move on. Later chapters don't need the timer.

---

## Chapter 4: Debug the planted bug

⏱ **≈ 10 min** · 💬 1 · 🔗 needs: nothing

🎯 Let the agent run the red → green loop; verify its root-cause analysis.

```text
/clear
```

### 4.1 Find, fix, prove 💬

```text
Run `npm test`. One test fails. Find the root cause in src/quiz.js, check whether the same
mistake affects related code, and fix it. Add tests for getFeedbackMessage, for the getGrade
boundaries at 90, 75 and 50, and for formatTimeLeft if it exists. Re-run `npm test` until
everything passes. Finish with a 2-3 sentence root-cause explanation.
```

### 4.2 Verify ⌨️

```text
/diff
!npm test
```

- The root cause: `getGrade` used `>` instead of `>=`, so **all three** boundaries were wrong. Did the agent find all three?
- Do the new tests follow `tests.instructions.md` (naming, `node:assert/strict`, edge cases)?

```text
!git add -A
!git commit -m "fix: correct grade boundaries and add tests"
!git push
```

### ✅ Done when
- [ ] `!npm test` all green; pushed

🏃 **Behind?** Change the three `>` to `>=` in `getGrade` yourself. Zero requests.

---

## Chapter 5: Refactor with a safety net

⏱ **≈ 10 min** · 💬 1 · 🔗 needs: green tests (Chapter 4)

🎯 Use tests as the safety net for a behaviour-preserving refactor.

```text
/clear
```

### 5.1 Refactor 💬

```text
Refactor without changing behaviour: move the quiz state transitions out of src/app.js into pure
functions in src/quiz.js: createQuiz(questions) returning a new state object,
answerQuestion(state, selectedIndex) returning { state, correct } without mutating the input,
and isQuizFinished(state). Export them, use them in app.js so app.js only renders and handles
events, and add tests for each. Don't change the HTML, CSS or questions. Run `npm test` until
green, then summarise what moved where in a short table.
```

### 5.2 Review ⌨️

```text
/diff
!npm test
```

- [ ] The new functions don't mutate their input (is there a test proving it?)
- [ ] `app.js` got simpler; nothing DOM-related moved into `quiz.js`
- [ ] Chapter 3 smoke test still passes

```text
!git add -A
!git commit -m "refactor: move quiz state into pure functions"
!git push
```

### ✅ Done when
- [ ] Tests green, behaviour unchanged, pushed

🏃 **Behind?** Skip the chapter. If it broke something you can't fix in 2 minutes: `!git restore .`

---

## Chapter 6: Continuous integration with GitHub Actions

⏱ **≈ 10 min** · 💬 1 · 🔗 needs: nothing

🎯 Run your tests on GitHub for every push and pull request, so Chapter 9's PR gets a real status check.

```text
/clear
```

### 6.1 Generate the workflow 💬

```text
Create .github/workflows/test.yml: a GitHub Actions workflow named "Tests" with one job "test" on
ubuntu-latest that runs on pushes to main and on all pull requests. Steps: actions/checkout@v4,
actions/setup-node@v4 with Node.js 20, then `npm test`. No caching or install step; the project
has no dependencies. Add a short comment at the top explaining what it does.
```

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

### 6.2 Push and watch ⌨️

```text
!git add -A
!git commit -m "ci: run tests on push and pull request"
!git push
!gh run watch
```

(`gh run watch` follows the run live. Or open your repo's **Actions** tab.) Then add a badge to the top of `README.md` and push it:

```markdown
![Tests](https://github.com/<your-username>/copilot-dev-days-workshop/actions/workflows/test.yml/badge.svg)
```

### ✅ Done when
- [ ] Green **Tests** run; badge on your README

🏃 **Behind?** Create the file from the reference by hand and push. Zero requests.

---

## Chapter 7: Package know-how as an agent skill

⏱ **≈ 10 min** · 💬 1 · 🔗 needs: nothing

🎯 Turn a repeatable task into an **agent skill** that Copilot loads automatically when the task matches. The same skill works in VS Code and the Copilot app too.

### 7.1 Write the skill ⌨️

> 🔗 This is the `.github/skills/<name>/SKILL.md` file from the 2.0 map.

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

Restart the session so it picks up the new skill (`/exit`, then `copilot`), then:

```text
Add 3 quiz questions about GitHub Actions.
```

You didn't repeat any rules. Check the output mentions the **add-quiz-questions** skill (or run `/skills` if your version has it), and verify the answers in the table yourself.

```text
/diff
!npm test
!git add -A
!git commit -m "feat: add skill and GitHub Actions questions"
!git push
```

### ✅ Done when
- [ ] 3 new questions; start-screen count correct; tests green; pushed

🏃 **Behind?** Commit just the skill file.

---

## Chapter 8: Build a backlog

⏱ **≈ 10 min** · 💬 1 · 🔗 needs: latest code pushed

🎯 Create well-specified issues from the terminal. Copilot CLI has GitHub tools built in.

```text
/clear
```

### 8.1 Create issues 💬

```text
Create three GitHub issues in this repository. Each needs a clear title, a user-focused description
and a checklist of acceptance criteria. Don't implement anything.
1. Best score: save the best percentage in localStorage, show it on the start and result screens,
   celebrate a new best score, and keep working when localStorage is unavailable.
2. Progress bar: show how far through the quiz the player is.
3. Keyboard shortcuts: keys 1-4 select the matching answer.
```

Read each GitHub action before approving; it acts as you.

### 8.2 Browse them ⌨️

Press `←` to open the side panel, `Tab` to **Issues**, highlight **Best score** and press `Enter` to read it. Note its number. (Or: `!gh issue list`.)

### ✅ Done when
- [ ] Three issues with acceptance criteria exist

🏃 **Behind?** `!gh issue create --title "Best score" --body "Save and show the best percentage"`

---

## Chapter 9: Worktree session → pull request → merge

⏱ **≈ 25 min** · 💬 2–3 · 🔗 needs: Best score issue; CI (Chapter 6) recommended

🎯 Deliver an issue end to end in an **isolated worktree session**, with green CI and a review.

### 9.1 Isolated session ⌨️

1. Side panel (`←`) → `Tab` to **Sessions** → start a **new session**.
2. In the new session:
   ```text
   /worktree
   ```
   The session moves into a sibling folder (e.g. `../copilot-dev-days-workshop-<n>`) on its own branch. Your main checkout is untouched.
3. Side panel → **Issues** → highlight **Best score** → press `c` to add it to the chat.

> ⚠️ **Test the worktree, not main.** From this session: `!npm test` and `!open src/index.html` (or `start` / `xdg-open`). There's nothing to install; the project has no dependencies.

### 9.2 Plan → build 💬 (1)

```text
/plan
```

```text
Plan how to implement this issue, mapping each acceptance criterion to the change that satisfies
it. Include a pure function isNewBestScore(current, best) in quiz.js (best may be null) with
tests, and wrap all localStorage access in try/catch. After implementing, run `npm test` and fix
failures. Stop before editing.
```

Review → **approve**. When it's done:

```text
/diff
!npm test
```

Smoke test: play twice; best score survives a reload; 🏆 only when you beat it.

### 9.3 Open the PR ✨

```text
/pr create
```

Make sure the description contains **`Closes #<issue-number>`** (edit it if needed). Then watch CI:

```text
!gh pr checks --watch
```

### 9.4 Review: the Copilot Free way 💬 (2)

Copilot code review isn't included in Copilot Free, so do a **human review + criteria check**:

1. `!gh pr view --web` → **Files changed** → leave at least one review comment.
2. Criteria check:
   ```text
   Compare the open pull request for this branch with the acceptance criteria in its issue.
   For each criterion: met / not met, with evidence from the diff. Flag anything the PR changes
   that the issue didn't ask for. Don't change any code.
   ```
3. Fix gaps by hand or with one prompt (💬 +1), then `!git push`. CI re-runs.

### 9.5 Merge ⌨️

When checks are green:

```text
!gh pr merge --squash --delete-branch
```

(`/pr agentmerge` can validate and merge for you if your plan supports it.) Then update your main checkout in a normal terminal:

```bash
cd ../copilot-dev-days-workshop && git switch main && git pull
```

### ✅ Done when
- [ ] PR merged with green **Tests**; issue closed automatically; `main` pulled

🏃 **Behind?** Skip `/plan`: send `Implement this issue, then run npm test and fix failures.`

---

## Chapter 10: Ship & retro

⏱ **≈ 5 min** · 💬 0

1. **GitHub Pages:** **Settings → Pages** → **Deploy from a branch** → `main` / `(root)` → **Save**. In ~2 minutes: `https://<your-username>.github.io/copilot-dev-days-workshop/`. Share it!
2. **Resume:** `/exit`, then `copilot --resume` and pick a session. Context, files and model are still there.
3. **Usage:** check <https://github.com/settings/copilot> and compare with the number you noted at the start. Stop your Codespace if you used one.
4. **Retro (2 min):** Where did `/plan` change the outcome? What caught Copilot's mistakes: you, `/diff`, tests, CI or the criteria check?

| Use… | When… |
|---|---|
| `!` commands | you know the exact command (free, instant) |
| `/init` + path instructions | you keep repeating the same guidance |
| `/plan` | ambiguous, cross-cutting or expensive-to-undo work |
| `/diff` | before every commit and PR |
| `/context` · `/clear` | results drift or the window fills up |
| Skills | a task your team repeats with the same rules |
| `/worktree` + sessions | independent work in parallel |

---

## ⭐ Bonus chapters

Independent; do them if you finish early or after the workshop.

### B1: Accessibility & security audit (💬 1–2)

```text
Audit src/ for accessibility (keyboard use, focus order and visibility, color contrast in light
and dark themes, aria-live, prefers-reduced-motion) and security (DOM XSS, unsafe innerHTML,
parsing values from localStorage). Return a prioritised table: issue, file, why it matters,
suggested fix. Don't change any code.
```

Fix the top item with one follow-up (💬 +1).

### B2: A custom reviewer agent (💬 1)

> 🔗 This is the `.github/agents/*.agent.md` file from the 2.0 map.

Create `.github/agents/quiz-reviewer.agent.md`:

```markdown
---
name: quiz-reviewer
description: Reviews changes in this repo against the project rules. Never edits files.
---
You are a strict but kind reviewer for the Dev Days Quiz. Never edit files.
Review the current changes against the repository instructions and report:
1. Rule violations (file + line). 2. Missing tests. 3. Accessibility risks.
4. One thing done well. Keep it under 15 lines.
```

Restart `copilot`, run `/agent`, choose **quiz-reviewer**, and send: `Review my uncommitted changes.`

### B3: Parallel sessions (💬 2)

Open two more `/worktree` sessions for **Progress bar** and **Keyboard shortcuts**, plan both, and switch between them with `/resume` while they work.

### B4: Scripted, non-interactive Copilot (💬 1)

Run a one-off prompt straight from your shell, handy for scripts:

```bash
copilot -p "Summarise the last 5 commits in this repo as release notes" --allow-tool 'shell(git log)'
```

Flags can change between versions; check `copilot --help` for the current options.

---

## 🛠 Troubleshooting

| Problem | Fix |
|---|---|
| `copilot: command not found` | Reopen the terminal. npm install? Check Node 22+ and that npm's global bin is on `PATH`. |
| Sessions won't start (work account) | Business/Enterprise admins must enable the **Copilot CLI** policy. Use a personal account. |
| `/init` → `Command input required` | Add a prompt after `/init`. |
| Push rejected: `... workflow ... without workflow scope` | `gh auth refresh -h github.com -s workflow`, then push again. |
| Skill / agent not found | Restart `copilot` after creating it; folder name must match `name:`. |
| Issue tools fail | Run inside your repo folder, with the repo pushed and the right account signed in. |
| Browser shows old code | You're viewing the main folder while editing a worktree. Open the app from the worktree session. |
| Monthly limit reached | Wait for the monthly reset; `!` commands and every 🏃 shortcut are request-free. |
| Agent made a mess | `!git restore .` (uncommitted) or `!git reset --hard HEAD~1` (last commit, careful). |
| Pages 404 | Wait 2 min; `main` / `(root)`; repo must be public on a free account. |

---

> Adapted from [GitHub Copilot CLI first steps](https://github-samples.github.io/copilot-workshops/first-steps/copilot-cli/) by James Montemagno, part of [github-samples/copilot-workshops](https://github.com/github-samples/copilot-workshops) (MIT License).
