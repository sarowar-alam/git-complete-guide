# Exercise 01 — Init & Commit

## Scenario

You've just joined a team that keeps all documentation in Git. Your first task is to set up a new repository for the team's onboarding guide, make a few commits, and push it to GitHub.

---

## Tasks

### Task 1
Create a new directory called `onboarding-guide` and initialize it as a Git repository. Verify Git is tracking it.

### Task 2
Create three files:
- `README.md` with a heading `# Onboarding Guide` and a short description
- `day-one.md` with content `# Day One: Setup`
- `.gitignore` ignoring `*.log` and `node_modules/`

### Task 3
Stage and commit **only** `README.md` first, then stage and commit the other two files separately. You should end up with **3 commits**.

Use the Conventional Commits format for all messages.

### Task 4
View the full log with author, date, and message — but in a compact one-line format.

### Task 5
Create the `onboarding-guide` repo on GitHub (public) and push all commits.

### Task 6
Edit `README.md` directly in the GitHub UI (add one sentence). Then pull that change to your local machine.

---

## Validation Checklist

- [ ] `git log --oneline` shows exactly 3 commits
- [ ] `.gitignore` was committed separately from `README.md`
- [ ] All commit messages follow the `type: description` format
- [ ] `git remote -v` shows `origin` pointing to your GitHub repo
- [ ] `git pull` successfully brought the GitHub edit to your local machine

---

## Hints

- `git init`, `git add <filename>`, `git commit -m "..."` 
- `git log --oneline`
- `git remote add origin <url>`
- `git push -u origin main`
- `git pull origin main`

Check your answers: [answers/exercise-solutions/](../../answers/exercise-solutions/)
