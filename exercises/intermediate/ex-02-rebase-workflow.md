# Exercise 02 — Rebase Workflow

## Scenario

You're working on a feature branch. While you work, `main` gets 4 new commits from your team. You need to keep your branch current using rebase, then clean up your commit history with an interactive rebase before merging.

---

## Tasks

### Task 1
Start with a `main` branch that has 2 commits.

### Task 2
Create `feature/user-profile` from `main`. Make 5 commits on it (content doesn't matter — just 5 distinct file changes with descriptive messages). At least 2 of them should be "WIP" or "fix" style commits.

### Task 3
Add 4 new commits to `main` (simulate teammates working). Use meaningful messages.

### Task 4
Rebase `feature/user-profile` onto the updated `main`.

If there are conflicts: resolve them, `git add`, `git rebase --continue`.

### Task 5
After rebasing, verify the commit graph:
- `feature/user-profile` should be **ahead** of `main`
- History should be **linear** (no fork visible)
- The 4 new `main` commits should appear **before** your feature commits

### Task 6
Use interactive rebase to squash your 5 messy feature commits into **2 clean commits**:
- First: `feat: add user profile form`
- Second: `feat: add profile validation logic`

### Task 7
Merge into `main` with `--no-ff` and verify the final log is clean.

---

## Validation Checklist

- [ ] `git log --oneline main` shows the 4 new commits + merge commit
- [ ] Only 2 feature commits appear (not 5)
- [ ] No "WIP" or "fix" messages in the final log
- [ ] `git log --oneline --graph` shows a clean merge structure

Check your answers: [answers/exercise-solutions/](../../answers/exercise-solutions/)
