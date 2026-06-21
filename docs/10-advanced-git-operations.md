# Advanced Git Operations

These commands solve real-world problems: grabbing a single commit from another branch, saving incomplete work, undoing mistakes without breaking teammates, and finding exactly when a bug was introduced.

---

## Cherry-Pick

Cherry-pick applies a specific commit from one branch onto your current branch. You pick the exact commit you want — not the whole branch.

```bash
# Get the commit hash you want
git log --oneline feature/payment
# a1b2c3d feat: add payment validation
# d4e5f6a feat: add payment form
# g7h8i9b fix: typo

# Apply just the validation commit to main
git checkout main
git cherry-pick a1b2c3d
```

**When to use it:**
- A hotfix commit on `develop` needs to go to `main` immediately
- A teammate wrote a utility function you need right now, but their branch isn't ready to merge
- You accidentally committed to the wrong branch — cherry-pick to the right branch, then reset the wrong one

```bash
# Cherry-pick a range of commits
git cherry-pick d4e5f6a..a1b2c3d

# Cherry-pick without committing (stage changes only)
git cherry-pick --no-commit a1b2c3d

# If a conflict occurs during cherry-pick
git cherry-pick a1b2c3d
# fix conflicts...
git add .
git cherry-pick --continue
# or abort:
git cherry-pick --abort
```

---

## Stash

Stash saves your uncommitted changes (both staged and unstaged) to a temporary area so you can switch context quickly.

```bash
# Save everything uncommitted
git stash

# Save with a descriptive name
git stash push -m "WIP: half-finished search feature"

# Include untracked (new) files
git stash push -u

# Include untracked and ignored files
git stash push -a

# List all stashes
git stash list
# stash@{0}: WIP on main: Half-finished search feature
# stash@{1}: On feature/auth: debugging session save

# Apply the most recent stash (keeps it in stash list)
git stash apply

# Apply and remove from stash list
git stash pop

# Apply a specific stash
git stash apply stash@{1}

# Delete a specific stash
git stash drop stash@{0}

# Delete all stashes
git stash clear
```

**Common pattern:**
```bash
# You're mid-feature when an urgent bug report comes in
git stash push -m "WIP: search feature"
git switch hotfix/critical-login-bug
# fix the bug, commit, push
git switch feature/search
git stash pop
# continue where you left off
```

---

## Revert

Revert creates a **new commit** that undoes the changes from a previous commit. The original commit stays in history — this is safe for shared branches.

```bash
# Revert the most recent commit
git revert HEAD

# Revert a specific commit
git revert a1b2c3d

# Revert without opening the editor (uses default message)
git revert a1b2c3d --no-edit

# Revert but don't commit yet (just stage the changes)
git revert a1b2c3d --no-commit
git revert a1b2c4e --no-commit
git commit -m "revert: undo broken payment changes"
```

**Use revert when:** the commit has already been pushed to a shared branch. Revert preserves the full history.

---

## Reset

Reset moves the branch pointer backward. It can also change the staging area and working directory depending on the mode.

| Mode | Branch pointer | Staging area | Working directory |
|------|---------------|-------------|-------------------|
| `--soft` | Moves back | Unchanged (changes staged) | Unchanged |
| `--mixed` (default) | Moves back | Cleared (changes unstaged) | Unchanged |
| `--hard` | Moves back | Cleared | Cleared (**files deleted**) |

```bash
# Undo the last commit, keep changes staged
git reset --soft HEAD~1

# Undo the last commit, keep changes but unstage them
git reset HEAD~1           # --mixed is default
git reset --mixed HEAD~1   # explicit

# Undo the last commit AND discard all changes
git reset --hard HEAD~1    # ⚠️ changes are gone

# Go back 3 commits
git reset --soft HEAD~3

# Reset to a specific commit
git reset --hard abc123def
```

> **Never reset commits that have been pushed to a shared branch.** Use `git revert` instead. Reset rewrites history — teammates who have those commits will be stuck with a diverged history.

---

## Restore

`git restore` is a cleaner way to discard changes in the working directory or unstage files (available in Git 2.23+).

```bash
# Discard changes in working directory (back to last commit)
git restore src/app.js

# Discard all working directory changes
git restore .

# Unstage a file (move it out of staging area back to working dir)
git restore --staged src/app.js

# Restore a file to a specific commit's version
git restore --source abc123def src/app.js
```

---

## Bisect

Bisect uses binary search to find exactly which commit introduced a bug. You tell Git which commit is "good" (bug doesn't exist) and which is "bad" (bug exists), and Git helps you narrow down the culprit.

```bash
# Start bisect
git bisect start

# Mark the current commit as bad (bug exists now)
git bisect bad

# Mark a known good commit (no bug here)
git bisect good v1.0.0

# Git checks out a commit in the middle for you to test
# Test your app...
# If the bug exists here:
git bisect bad
# If the bug doesn't exist here:
git bisect good

# Git keeps narrowing down until it finds the exact commit:
# abc123def is the first bad commit

# End the bisect session and return to your branch
git bisect reset

# Automate with a test script
git bisect start
git bisect bad
git bisect good v1.0.0
git bisect run npm test   # runs test on each candidate commit automatically
```

---

## Reflog

The reflog records every time HEAD or a branch pointer moved — even if it was a reset, rebase, or deleted branch. It's your safety net for recovering "lost" work.

```bash
# See the reflog for HEAD
git reflog
# → abc123d HEAD@{0}: commit: feat: add dark mode
# → def456e HEAD@{1}: checkout: moving from feature/search to main
# → ghi789f HEAD@{2}: reset: moving to HEAD~3

# See the reflog for a specific branch
git reflog show feature/payment

# Recover a commit you thought was gone
git checkout abc123d         # or
git cherry-pick abc123d      # or
git reset --hard abc123d

# Reflog entries expire after 90 days by default
```

**Real scenario:** You ran `git reset --hard HEAD~5` and immediately regretted it.
```bash
git reflog
# HEAD@{1}: commit: feat: add search
# HEAD@{2}: commit: feat: add cart
# ... the 5 commits you just erased

git reset --hard HEAD@{1}   # back to before the reset
```

---

## Summary: Choosing the Right Command

| Situation | Command |
|-----------|---------|
| Need one commit from another branch | `git cherry-pick` |
| Save work without committing to switch context | `git stash` |
| Undo a push to a shared branch safely | `git revert` |
| Undo local commits (not pushed yet) | `git reset` |
| Discard file changes in working dir | `git restore` |
| Find which commit introduced a bug | `git bisect` |
| Recover from a bad reset or deleted branch | `git reflog` |

---

## Knowledge Check

1. What's the difference between `git revert` and `git reset --hard`?
2. You stash your changes but forget what they were about. What command shows all stashes?
3. You want to undo the last 2 commits but keep all the file changes unstaged. What do you run?
4. How many commits does Git inspect when using bisect on 1,000 commits? (Hint: think binary search — $\log_2(1000) \approx 10$)
5. You ran `git reset --hard HEAD~3` by accident. How do you recover?

---

Previous: [Tags & Releases →](09-tags-and-releases.md)
Next: [History Management →](11-history-management.md)
