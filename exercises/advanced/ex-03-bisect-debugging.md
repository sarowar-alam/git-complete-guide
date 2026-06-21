# Exercise 03 — Bisect Debugging

## Scenario

Your test suite was passing two weeks ago. Today it fails. The repo has 30 commits since then. You need to find exactly which commit broke the tests — without reading all 30 commits manually.

---

## Tasks

### Task 1
Create a repo and generate 30 commits using this script:

```bash
for i in {1..30}; do
  echo "module $i" >> app.js
  git add app.js
  if [ $i -eq 17 ]; then
    echo "REGRESSION_INTRODUCED" >> app.js
    git add app.js
    git commit -m "feat: add module $i (regression here)"
  else
    git commit -m "feat: add module $i"
  fi
done
```

### Task 2
Confirm the bug exists now (on HEAD):

```bash
grep -q "REGRESSION_INTRODUCED" app.js && echo "BUG PRESENT" || echo "NO BUG"
```

### Task 3
Find a commit where the bug did NOT exist. Tag the first commit (`git tag known-good HEAD~30` or similar) and use it as the "good" starting point.

### Task 4
Run a **manual bisect** session — do NOT use `bisect run`. Test each midpoint commit manually:

```bash
git bisect start
git bisect bad                    # current = bad
git bisect good <first-commit>    # known good

# For each commit Git checks out:
grep -q "REGRESSION_INTRODUCED" app.js && git bisect bad || git bisect good
```

Count how many manual `bisect bad/good` commands you had to run. It should be around $\lceil \log_2(30) \rceil = 5$.

### Task 5
Once Git identifies the bad commit, note the commit hash and message. Run `git bisect reset`.

### Task 6
Repeat the entire exercise using **automated bisect** with `bisect run`:

```bash
git bisect start
git bisect bad
git bisect good <first-commit>
git bisect run sh -c 'grep -q "REGRESSION_INTRODUCED" app.js && exit 1 || exit 0'
```

Verify it finds the same commit.

### Task 7
After finding the bad commit, use `git revert` to fix it without deleting history.

---

## Validation Checklist

- [ ] Manual bisect found commit #17 in approximately 5 steps
- [ ] Automated bisect found the same commit
- [ ] `git bisect reset` returned you to `main`
- [ ] `git revert` created a new commit undoing the regression
- [ ] `grep -q "REGRESSION_INTRODUCED" app.js && echo "BUG" || echo "FIXED"` returns `FIXED` after the revert

Check your answers: [answers/exercise-solutions/](../../answers/exercise-solutions/)
