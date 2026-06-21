# Exercise 02 — Branching Basics

## Scenario

You're building a blog website. The home page exists on `main`. You need to add two new pages — an "Articles" page and a "Portfolio" page — each on its own branch. Then clean everything up.

---

## Tasks

### Task 1
Start from an existing directory with a `main` branch that has one file (`index.html` with any HTML content).

### Task 2
Create a branch called `feature/articles-page`. Switch to it. Create `articles.html` with basic HTML. Commit it.

### Task 3
Without merging, switch back to `main`. Confirm that `articles.html` does **not** exist on `main`.

### Task 4
Create a second branch `feature/portfolio-page` from `main`. Create `portfolio.html`. Commit it. Switch back to `main`.

### Task 5
List all branches. Which one has an asterisk? What does the asterisk mean?

### Task 6
Rename `feature/portfolio-page` to `feature/work-showcase`. List branches to confirm.

### Task 7
Delete `feature/work-showcase` without merging it first (simulate abandoning the idea). What flag do you need?

### Task 8
Merge `feature/articles-page` into `main`. Confirm `articles.html` now exists on `main`. Delete the merged branch.

---

## Validation Checklist

- [ ] `git branch` shows only `main` at the end
- [ ] `articles.html` exists on `main` after the merge
- [ ] You used `git branch -D` (not `-d`) to delete the unmerged branch — and understand why
- [ ] `git log --oneline --graph` shows the merge structure

---

## Hints

- `git switch -c <branch-name>` 
- `git branch -m <old> <new>`
- `git branch -d` vs `git branch -D`
- `git merge <branch>`

Check your answers: [answers/exercise-solutions/](../../answers/exercise-solutions/)
