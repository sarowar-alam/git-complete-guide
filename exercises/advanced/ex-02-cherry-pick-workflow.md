# Exercise 02 — Cherry-Pick Workflow

## Scenario

A critical utility function was written on the `develop` branch but `main` needs it right now for a hotfix. You can't merge all of `develop` — just that one commit.

---

## Tasks

### Task 1
Create a repo with `main` branch at 3 commits.

### Task 2
Create branch `develop` and add 5 commits:

```
feat: add database connection pool
feat: add rate limiting middleware
feat: add utility: formatCurrency(amount)  ← THIS ONE IS NEEDED ON MAIN
feat: add async job queue
WIP: experimenting with caching
```

Each commit touches a different file.

### Task 3
Back on `main`, you need `formatCurrency` immediately. Find its commit hash:

```bash
git log develop --oneline | grep "formatCurrency"
```

### Task 4
Cherry-pick that single commit onto `main`. Verify `formatCurrency` is available on `main` but none of the other `develop` commits are.

### Task 5
Cherry-pick **two commits** from `develop` onto a new branch `hotfix/critical-fixes` — pick the `rate limiting` and `connection pool` commits (not the others).

### Task 6
Simulate a cherry-pick conflict:
- On `main`, add a file `utils.js` with `function formatCurrency() { return 0; }`
- On a new branch, modify `formatCurrency` to return `amount.toFixed(2)`
- Cherry-pick that branch's commit onto `main`
- Resolve the conflict

### Task 7
After all cherry-picks, verify with `git log --oneline` that `main` has the right commits and `develop` still has its original 5 unmodified commits.

---

## Validation Checklist

- [ ] `main` has the `formatCurrency` commit in its log
- [ ] `main` does NOT have `async job queue` or `rate limiting` or `connection pool` in its log
- [ ] `develop` still has all 5 original commits
- [ ] `hotfix/critical-fixes` has exactly 2 cherry-picked commits

Check your answers: [answers/exercise-solutions/](../../answers/exercise-solutions/)
