# Exercise 03 — Fork, Upstream Sync & Pull Request

## Scenario

You want to contribute to the `Git-Fundamentals` repository. You'll fork it, add something useful, keep it in sync with the original, and open a pull request.

---

## Tasks

### Task 1
Fork `https://github.com/md-sarowar-alam/Git-Fundamentals` to your GitHub account.

### Task 2
Clone **your fork** locally. Verify that `git remote -v` shows `origin` pointing to your fork (not the original).

### Task 3
Add the original repo as `upstream`. Verify both `origin` and `upstream` appear in `git remote -v`.

### Task 4
Create a branch `feature/my-exercise-notes`. On this branch, add a file: `exercises/intermediate/my-progress.md` with at least 5 notes about what you've learned so far in this series.

### Task 5
Before pushing, sync your local `main` with upstream:
```
git fetch upstream
git merge upstream/main
git push origin main
```

Then rebase your feature branch onto the updated `main`.

### Task 6
Push your feature branch to your fork. Open a pull request targeting the upstream repo's `main` branch.

### Task 7
After opening the PR, make one more commit on the same branch (add one more note to `my-progress.md`) and push it. Observe that the PR automatically updates on GitHub.

---

## Validation Checklist

- [ ] `git remote -v` shows both `origin` (your fork) and `upstream` (original)
- [ ] Your PR is visible at `github.com/md-sarowar-alam/Git-Fundamentals/pulls`
- [ ] The PR shows your updated commit after Task 7
- [ ] `git log --oneline` on your feature branch shows the rebase was successful (no merge commit from the sync)

Check your answers: [answers/exercise-solutions/](../../answers/exercise-solutions/)
