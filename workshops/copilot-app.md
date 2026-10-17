# 🪟 Self-paced · Copilot app: GitHub Copilot Dev Days Workshop (Intermediate)

> [← Workshop overview](../README.md) · Guided session: [VS Code](vscode.md) · Also self-paced: [Copilot CLI](cli.md)

**Self-paced at home (about 2½ hours) · 10 chapters + bonus chapters · ≈ 15 requests on Copilot Free**

> 💬 **Self-paced guide.** The guided session at the event uses VS Code; do this one at home whenever it suits you. **Questions?** Contact us at <https://www.linkedin.com/company/azure-developer-community-tamilnadu/>.

Take a small quiz app through a realistic workflow in the **GitHub Copilot app**: plan, build, debug, refactor, add CI, package team know-how as a skill, and take an issue to a merged pull request in its own worktree. Adapted from the official [GitHub Copilot app tour](https://github-samples.github.io/copilot-workshops/first-steps/copilot-app/).

**You should already know:** Git branches/commits/PRs and basic JavaScript.

---

## 📋 Contents

| # | Chapter | Suggested time | 💬 |
|---|---|---|:---:|
| 0 | [Setup](#chapter-0-setup) | ≈ 25 min | 0 |
| 1 | [Warm-up: build & polish](#chapter-1-warm-up-build--polish) | ≈ 15 min | 2 |
| 2 | [Instructions: `/init` + path-specific rules](#chapter-2-instructions-init--path-specific-rules) | ≈ 15 min | 1 |
| 3 | [Plan mode → build: countdown timer](#chapter-3-plan-mode--build-countdown-timer) | ≈ 20 min | 1–2 |
| 4 | [Debug the planted bug](#chapter-4-debug-the-planted-bug) | ≈ 10 min | 1 |
| 5 | [Refactor with a safety net](#chapter-5-refactor-with-a-safety-net) | ≈ 10 min | 1 |
| 6 | [Continuous integration with GitHub Actions](#chapter-6-continuous-integration-with-github-actions) | ≈ 10 min | 1 |
| 7 | [Package know-how as an agent skill](#chapter-7-package-know-how-as-an-agent-skill) | ≈ 10 min | 1 |
| 8 | [Build a backlog in Issues](#chapter-8-build-a-backlog-in-issues) | ≈ 10 min | 1 |
| 9 | [Issue → worktree session → PR → merge](#chapter-9-issue--worktree-session--pr--merge) | ≈ 25 min | 2–3 |
| 10 | [Ship & retro](#chapter-10-ship--retro) | ≈ 5 min | 0 |
| ⭐ | [Bonus chapters](#-bonus-chapters) | if you finish early / after the workshop | 1–6 |

Also: [Ground rules](#-ground-rules) · [Credit budget](#-credit-budget) · [Find your way around](#-find-your-way-around) · [Troubleshooting](#-troubleshooting)

---

## 🧭 Ground rules

1. **Use the suggested times as a guide.** Stuck for more than 5 minutes? Take the chapter's **🏃 Behind?** shortcut and move on.
2. **Chapters are independent.** Skipping one never blocks a later one.
3. **One prompt, done well.** Copy prompts as written; only change `<placeholders>`.
4. **Read the Changes tab before every commit.** You own the code.
5. **Commit at every ✅.** Small commits make `git restore .` cheap.
6. **New session per chapter.** Fresh context gives better results; your instructions file carries the rules.

> 🎲 Output varies between people. Compare whether **✅ Done when** passes, not the code.

## 💳 Credit budget

Each prompt you send in a session = **one request**. Copilot Free has about **50 per month** (check <https://github.com/settings/copilot>; limits can change).

| | Requests |
|---|:---:|
| Core chapters 1–10 | ≈ 13–15 |
| All bonus chapters | + up to 6 |

- **Before the day, make sure you have at least 25 requests left** this month.
- Use **Interactive** mode so you approve each step. **Autopilot** is fine later, once you trust a task.
- Run Git and `npm test` **yourself in a terminal**; it's free and faster than asking.
- Model: **Auto** (or the default). Avoid models with a cost multiplier.
- **Copilot code review**, **cloud sessions** and possibly **Agent Merge** need a paid plan; this guide has Free-friendly alternatives.
- Out of requests? Your allowance resets monthly; manual edits and Git still work.

**Track your usage:** before you start, note how many requests you've used at <https://github.com/settings/copilot>. Check again at each ✅ checkpoint. You need about 15 for the core chapters.

## 🧭 Find your way around

| Area | What it's for |
|---|---|
| **New** | Start a session (folder, mode, model), or a quick **Chat** with no repo |
| **Projects** | Your repositories with their sessions |
| **Issues** · **Pull requests** | Your GitHub issues and PRs across repos |
| **Automations** | Scheduled agent work |
| **Customize** | Theme, models, Canvas extensions |
| Session **right flyout** | **Changes** (diffs), integrated **browser**, session details (project, path, branch, context usage) |

Modes: **Interactive** (you direct and approve) · **Plan** (research and propose, no edits) · **Autopilot** (runs without stopping).

---

## Chapter 0: Setup

⏱ **≈ 25 min** · 💬 0

🎯 Install the app and sign in, then make your own copy of the workshop repo and open it in the app.

### Step A: Install and sign in

#### 0.1 Accounts and tools

1. A **personal** GitHub account with **Copilot Free** (or any plan) at <https://github.com/settings/copilot>, with **≥ 25 requests** left.
2. **Node.js 20+** (`node --version`). The app ships with Git, but the tests need Node.
3. **Git** in your terminal (recommended) for cloning and committing yourself.
4. The **[GitHub Copilot app](https://gh.io/app)**: install, open, **Sign in to GitHub**, choose a theme, **Finish**. (Desktop only; not available in Codespaces.)

### Step B: Your copy of the repo

#### 0.2 Create and clone your repo

1. Open the workshop repo (link shared at the event) → **Use this template → Create a new repository** · Owner: you · Name `copilot-dev-days-workshop` · **Public**.
2. Clone it:
   ```bash
   git clone https://github.com/<your-username>/copilot-dev-days-workshop.git
   ```

#### 0.3 Open it in the app

1. **New → Open folder** → choose the cloned folder.
2. Mode **Interactive** · model **Auto** · **Create**.
3. Approval settings: **don't** use **Approve all** for this workshop; you want to see each edit, command and GitHub action first.

#### 0.4 Run it

In a terminal in the repo folder:

```bash
npm test     # expect: 8 pass, 1 fail ("getGrade gives an A for exactly 90%")
```

That failure is the **planted bug** for Chapter 4. Then open `src/index.html` in the session's **integrated browser** (right flyout). The quiz uses plain `<script>` tags, so it works straight from disk.

### ✅ Done when
- [ ] Signed in; Interactive session open on your cloned repo
- [ ] `npm test` → **8 pass / 1 fail**; quiz loads in the integrated browser

---

## Chapter 1: Warm-up: build & polish

⏱ **≈ 15 min** · 💬 2 · 🔗 needs: nothing

🎯 Learn the app loop: prompt → approve → **Changes** → browser → commit.

### 1.1 A scoped change 💬

```text
Add a getFeedbackMessage(grade) function to src/quiz.js that returns an encouraging message for
grades "A", "B", "C" and anything else, and export it. Show it on the result screen in a new
<p id="feedback-message"> under the grade. Also add 3 new questions to src/questions.js in the
same format. Change nothing else. Then open src/index.html in the integrated browser.
```

Approve each step after reading it. Then open **Changes** and read every diff. Run `npm test`: `tests/questions.test.js` validates the new questions. Check yourself that each `answer` index points at the **correct** option.

### 1.2 Polish with the element picker 💬

1. In the integrated browser, start a quiz and select the **element picker**.
2. Click the answer buttons.
3. Send:
   ```text
   Make the selected element feel more tactile: a subtle press state, a clearer focus ring for
   keyboard users, and a smoother transition into the correct and incorrect colors. Use only the
   existing CSS variables. Change nothing else.
   ```
4. Press `Tab` through the answers to check the focus ring.

### 1.3 Commit ⌨️

```bash
git add -A && git commit -m "feat: add feedback message, questions and button polish" && git push
```

### ✅ Done when
- [ ] Feedback message shows; buttons polished; `npm test` → only the planted failure; pushed

🏃 **Behind?** Skip 1.2.

---

## Chapter 2: Instructions: `/init` + path-specific rules

⏱ **≈ 15 min** · 💬 1 · 🔗 needs: nothing

🎯 Teach Copilot your rules once, and learn to read the session's context usage.

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

> ℹ️ In the Copilot app, the GitHub tools are built in, so you don't need `.vscode/mcp.json` (that file is for VS Code). Type `/` in a session to see the commands your version supports, such as `/init`.

### 2.1 Generate repository instructions 💬

Start a **New** Interactive session on your project. Always include a prompt after `/init`:

```text
/init Create concise rules for this project: plain JavaScript with no frameworks, build tools or
npm dependencies; pure logic in src/quiz.js (exported via module.exports, tested with node:test);
DOM code in src/app.js; colors only via CSS variables in :root; accessible UI. Tests run with
`npm test`. Keep it under 40 lines.
```

Review before accepting and **note the file's path** (for example `.github/copilot-instructions.md` or `AGENTS.md`). Edit it: delete anything generic or untrue and add a short **How I like code written** section.

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

They apply only when Copilot works on matching files. Watch for them in Chapters 4 and 5.

### 2.3 Read the session details ⌨️

Open the session details in the right flyout: **project**, **path**, **branch**, **context usage**.

> 🧠 A wrong folder or a nearly full context window explains more surprises than a bad prompt. That's why each chapter starts a new session.

```bash
git add -A && git commit -m "docs: add agent and test instructions" && git push
```

### ✅ Done when
- [ ] Instructions file (edited) and `tests.instructions.md` pushed

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

## Chapter 3: Plan mode → build: countdown timer

⏱ **≈ 20 min** · 💬 1–2 · 🔗 needs: nothing

🎯 Agree on an approach before any edits, then let the plan drive the build.

### 3.1 Plan 💬

**New** → your project → mode **Plan** → **Create**:

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

**Review like a tech lead:** is the interval cleared on answer, timeout, next *and* restart? Is `formatTimeLeft` pure and exported?

**💬 +1 only if needed:** request one change. Then **approve** and choose **Interactive** to continue.

### 3.2 Review and smoke test ⌨️

Read every diff in **Changes**, run `npm test`, then in the integrated browser:

- [ ] Answer quickly → timer stops; next question starts at 15
- [ ] Let one time out → "Time's up!", correct answer highlighted, Next shown
- [ ] ≤ 5s → red and bold
- [ ] Restart mid-quiz → only one timer
- [ ] `Tab` through answers → focus ring visible

```bash
git add -A && git commit -m "feat: add per-question countdown timer" && git push
```

### ✅ Done when
- [ ] Smoke test passes; `npm test` → only the planted failure; pushed

🏃 **Behind?** If it's still broken after 20 minutes, `git restore .` and move on. Later chapters don't need the timer.

---

## Chapter 4: Debug the planted bug

⏱ **≈ 10 min** · 💬 1 · 🔗 needs: nothing

🎯 Let the agent run the red → green loop; verify its root-cause analysis.

### 4.1 Find, fix, prove 💬

**New** Interactive session:

```text
Run `npm test`. One test fails. Find the root cause in src/quiz.js, check whether the same
mistake affects related code, and fix it. Add tests for getFeedbackMessage, for the getGrade
boundaries at 90, 75 and 50, and for formatTimeLeft if it exists. Re-run `npm test` until
everything passes. Finish with a 2-3 sentence root-cause explanation.
```

### 4.2 Verify ⌨️

- `npm test` in your terminal → all green.
- The root cause: `getGrade` used `>` instead of `>=`, so **all three** boundaries were wrong. Did the agent find all three?
- Do the new tests (in **Changes**) follow `tests.instructions.md`?

```bash
git add -A && git commit -m "fix: correct grade boundaries and add tests" && git push
```

### ✅ Done when
- [ ] All green; pushed

🏃 **Behind?** Change the three `>` to `>=` in `getGrade` yourself. Zero requests.

---

## Chapter 5: Refactor with a safety net

⏱ **≈ 10 min** · 💬 1 · 🔗 needs: green tests (Chapter 4)

🎯 Use tests as the safety net for a behaviour-preserving refactor.

### 5.1 Refactor 💬

**New** Interactive session:

```text
Refactor without changing behaviour: move the quiz state transitions out of src/app.js into pure
functions in src/quiz.js: createQuiz(questions) returning a new state object,
answerQuestion(state, selectedIndex) returning { state, correct } without mutating the input,
and isQuizFinished(state). Export them, use them in app.js so app.js only renders and handles
events, and add tests for each. Don't change the HTML, CSS or questions. Run `npm test` until
green, then summarise what moved where in a short table.
```

### 5.2 Review ⌨️

- [ ] `npm test` green; the new functions don't mutate their input (is there a test proving it?)
- [ ] `app.js` got simpler; nothing DOM-related moved into `quiz.js`
- [ ] Chapter 3 smoke test still passes in the integrated browser

```bash
git add -A && git commit -m "refactor: move quiz state into pure functions" && git push
```

### ✅ Done when
- [ ] Tests green, behaviour unchanged, pushed

🏃 **Behind?** Skip the chapter. If it broke something you can't fix in 2 minutes: `git restore .`

---

## Chapter 6: Continuous integration with GitHub Actions

⏱ **≈ 10 min** · 💬 1 · 🔗 needs: nothing

🎯 Run your tests on GitHub for every push and pull request, so Chapter 9's PR gets a real status check.

### 6.1 Generate the workflow 💬

**New** Interactive session:

```text
Create .github/workflows/test.yml: a GitHub Actions workflow named "Tests" with one job "test" on
ubuntu-latest that runs on pushes to main and on all pull requests. Steps: actions/checkout@v4,
actions/setup-node@v4 with Node.js 20, then `npm test`. No caching or install step; the project
has no dependencies. Add a short comment at the top explaining what it does. Then commit it with
the message "ci: run tests on push and pull request" and push to main.
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

### 6.2 Watch it run ⌨️

Open your repo's **Actions** tab on GitHub. **Tests** should go green in under a minute. Add a badge to the top of `README.md`, then commit and push:

```markdown
![Tests](https://github.com/<your-username>/copilot-dev-days-workshop/actions/workflows/test.yml/badge.svg)
```

### ✅ Done when
- [ ] Green **Tests** run; badge on your README

🏃 **Behind?** On GitHub: **Add file → Create new file** → `.github/workflows/test.yml` → paste the reference → commit. Then `git pull`.

---

## Chapter 7: Package know-how as an agent skill

⏱ **≈ 10 min** · 💬 1 · 🔗 needs: nothing

🎯 Turn a repeatable task into an **agent skill** that Copilot loads automatically when the task matches. The same skill works in VS Code and Copilot CLI too.

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

**New** Interactive session (so it picks up the new skill):

```text
Add 3 quiz questions about GitHub Actions.
```

You didn't repeat any rules. Check the session mentions the **add-quiz-questions** skill, and verify the answers in the table.

```bash
git add -A && git commit -m "feat: add skill and GitHub Actions questions" && git push
```

### ✅ Done when
- [ ] 3 new questions; start-screen count correct; tests green; pushed

🏃 **Behind?** Commit just the skill file.

---

## Chapter 8: Build a backlog in Issues

⏱ **≈ 10 min** · 💬 1 · 🔗 needs: latest code pushed

🎯 Create well-specified issues from a session; the app is GitHub-connected out of the box.

### 8.1 Create issues 💬

**New** Interactive session:

```text
Create three GitHub issues in this repository. Each needs a clear title, a user-focused description
and a checklist of acceptance criteria. Don't implement anything.
1. Best score: save the best percentage in localStorage, show it on the start and result screens,
   celebrate a new best score, and keep working when localStorage is unavailable.
2. Progress bar: show how far through the quiz the player is.
3. Keyboard shortcuts: keys 1-4 select the matching answer.
```

Read each GitHub action before approving; it acts as you.

### 8.2 Review in Issues ⌨️

Open **Issues → Created by me**, read **Best score**, and tighten any vague criteria on GitHub.

### ✅ Done when
- [ ] Three issues with acceptance criteria exist

🏃 **Behind?** Create just the Best score issue on github.com.

---

## Chapter 9: Issue → worktree session → PR → merge

⏱ **≈ 25 min** · 💬 2–3 · 🔗 needs: Best score issue; CI (Chapter 6) recommended

🎯 Deliver an issue end to end in an **isolated worktree**, with green CI and a review.

### 9.1 Session from the issue ⌨️

1. **Issues** → open **Best score** → **New session**.
2. Choose a **new worktree** when prompted. The feature stays isolated from `main`.
3. Mode **Plan** · model **Auto**.

> ⚠️ **Test the worktree, not main.** Use **this session's** integrated browser and **Changes** tab. To run tests yourself, open a terminal in the worktree path shown in session details. Nothing to install; the project has no dependencies.

### 9.2 Plan → build 💬 (1)

```text
Plan how to implement this issue, mapping each acceptance criterion to the change that satisfies
it. Include a pure function isNewBestScore(current, best) in quiz.js (best may be null) with
tests, and wrap all localStorage access in try/catch. After implementing, run `npm test` and fix
failures, then test the feature in the integrated browser. Stop before editing.
```

Review → **approve** → continue in **Interactive**. Then read **Changes** and check in the browser: best score survives a reload; 🏆 only when you beat it.

### 9.3 Open the PR ✨

1. **Create PR** in the session toolbar.
2. Review the generated title/description; make sure it contains **`Closes #<issue-number>`**.
3. Create it. On GitHub, wait for the **Tests** check (Chapter 6) to go ✅.

### 9.4 Review: the Copilot Free way 💬 (2)

Copilot code review isn't included in Copilot Free, so do a **human review + criteria check**:

1. On GitHub → **Files changed** → leave at least one review comment.
2. In the session:
   ```text
   Compare the pull request for this branch with the acceptance criteria in its issue. For each
   criterion: met / not met, with evidence from the diff. Flag anything the PR changes that the
   issue didn't ask for. Don't change any code.
   ```
3. Fix gaps by hand or with one prompt (💬 +1) and push. CI re-runs.

### 9.5 Merge ⌨️

When **Tests** is green, merge on GitHub (squash). (If your plan offers **Agent Merge**, you can turn it on instead.) Confirm the issue closed, then in your main folder:

```bash
git switch main && git pull
```

### ✅ Done when
- [ ] PR merged with green **Tests**; issue closed automatically; `main` pulled

🏃 **Behind?** Start the session in **Interactive** instead of Plan and send: `Implement this issue, run npm test and fix failures.`

---

## Chapter 10: Ship & retro

⏱ **≈ 5 min** · 💬 0

1. **GitHub Pages:** **Settings → Pages** → **Deploy from a branch** → `main` / `(root)` → **Save**. In ~2 minutes: `https://<your-username>.github.io/copilot-dev-days-workshop/`. Share it!
2. **Usage:** check <https://github.com/settings/copilot> and compare with the number you noted at the start.
3. **Retro (2 min):** Where did Plan mode change the outcome? What caught Copilot's mistakes: you, Changes, tests, CI or the criteria check?

| Use… | When… |
|---|---|
| Interactive session | you want to steer and approve each step |
| Instructions (repo + path) | you keep repeating the same guidance |
| Plan mode | ambiguous, cross-cutting or expensive-to-undo work |
| Changes tab | before every commit and PR |
| Element picker | visual changes: point instead of describe |
| Skills | a task your team repeats with the same rules |
| Issue → worktree session | independent features in parallel |

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

Start a new session, pick **quiz-reviewer** in the agent picker (if your version shows one), and send: `Review my uncommitted changes.`

### B3: Second issue in parallel (💬 2)

Start a worktree session for **Progress bar** or **Keyboard shortcuts** while you review your first PR. Plan + build in two prompts.

### B4: A weekly triage automation (💬 1 per run)

1. **Automations** → new **weekly** automation.
2. Prompt: `Review the open GitHub issues in this repository and give a summary table ranked by priority, with a one-line suggested next step for each.`
3. Model **Auto**, project `copilot-dev-days-workshop` → **Create and run**.
4. **Pause or delete it afterwards.** Every scheduled run uses requests from your Free allowance.

---

## 🛠 Troubleshooting

| Problem | Fix |
|---|---|
| Sessions won't start (work account) | Business/Enterprise admins must enable the **Copilot CLI** policy. Use a personal account. |
| `/init` → `Command input required` | Add a prompt after `/init`. |
| Project not linked to GitHub | Open the **cloned** folder (has `.git` and a remote) via **New → Open folder**. |
| Push rejected: `... workflow ... without workflow scope` | Let the session push it, or create the file on github.com (Chapter 6 🏃). With `gh`: `gh auth refresh -h github.com -s workflow`. |
| Skill / agent not picked up | Start a **new** session after creating it; folder name must match `name:`. |
| Browser shows old code | You're looking at another session's worktree. Use the integrated browser of the session that made the change. |
| No **Create PR** button | The session must be on a branch of a GitHub-linked repo. Or push and open the PR on github.com. |
| `npm test` not found | Install Node.js 20+ and reopen the terminal. |
| Monthly limit reached | Wait for the monthly reset; manual edits, Git and every 🏃 shortcut are request-free. |
| Agent made a mess | `git restore .` in that session's folder. |
| Pages 404 | Wait 2 min; `main` / `(root)`; repo must be public on a free account. |

---

> Adapted from the [GitHub Copilot app tour](https://github-samples.github.io/copilot-workshops/first-steps/copilot-app/) by James Montemagno, part of [github-samples/copilot-workshops](https://github.com/github-samples/copilot-workshops) (MIT License).
