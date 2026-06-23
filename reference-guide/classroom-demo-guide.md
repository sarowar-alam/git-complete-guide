# Classroom Demo Guide

Ready-to-run demo scripts. Each demo can run independently. All commands use Git Bash.

Set up a clean temp directory before each demo:
```bash
cd /tmp
mkdir git-demo && cd git-demo
```

---

## Demo 1 — The Three Areas (10 minutes)

**Goal:** Make the working directory / staging area / local repo distinction concrete.

```bash
# Init a fresh repo
git init three-areas && cd three-areas

# Create a file
echo "Hello, Git" > notes.txt
git status
# Shows: Untracked files: notes.txt

# Stage it
git add notes.txt
git status
# Shows: Changes to be committed — "new file: notes.txt"

# Commit
git commit -m "docs: add notes"
git status
# Clean working tree

# Modify the file
echo "Second line" >> notes.txt
git status
# Shows: modified: notes.txt (not staged)

git add notes.txt
git status
# Shows: modified: notes.txt (staged)

# Make another change WITHOUT staging it
echo "Third line — unstaged" >> notes.txt
git status
# Shows BOTH staged and unstaged changes simultaneously

git diff          # shows unstaged change
git diff --staged # shows staged change

# Commit — only the staged change goes in
git commit -m "docs: add second line"
git status
# "Third line — unstaged" is still in working directory
```

**Key point:** Git commits exactly what you stage — nothing more.

---

## Demo 2 — Branches as Lightweight Pointers (8 minutes)

```bash
git init branch-demo && cd branch-demo
echo "v1" > story.txt && git add -A && git commit -m "init"
echo "v2" >> story.txt && git add -A && git commit -m "second line"

# Create branch at current point
git switch -c feature/ending
echo "The end." >> story.txt && git add -A && git commit -m "feat: add ending"

# Switch back — the commit disappears from view
git switch main
cat story.txt   # only 2 lines

git switch feature/ending
cat story.txt   # 3 lines again

# Show branches as text files
cat .git/refs/heads/main
cat .git/refs/heads/feature/ending
# Both are just 40-character SHA strings
```

**Key point:** Branches are just text files containing a SHA. Cheap to create, cheap to delete.

---

## Demo 3 — Merge Conflict (live resolution) (12 minutes)

```bash
git init conflict-demo && cd conflict-demo
echo "Shared line" > shared.txt
git add -A && git commit -m "init"

# Branch A changes the file
git switch -c feature/a
echo "Feature A's version" > shared.txt
git add -A && git commit -m "feat: A's line"

# Main also changes the same file
git switch main
echo "Main's version" > shared.txt
git add -A && git commit -m "feat: main's line"

# Now merge — conflict!
git merge feature/a
# CONFLICT (content): Merge conflict in shared.txt
cat shared.txt
# Shows conflict markers

# Resolve manually
echo "Merged: main's version with A's input" > shared.txt
git add shared.txt
git commit
git log --oneline --graph
```

---

## Demo 4 — Fast-Forward, Merge & Rebase (30 minutes)

**Goal:** Show students how the same `app.txt` file looks after each type of merge/rebase. Run each sub-demo in its own fresh repo. After every major operation, run `cat app.txt` and `git log --oneline --graph --all` so students can see **both** the file state and the history shape.

---

### Demo 4a — Fast-Forward Merge (6 minutes)

```bash
cd /tmp
git init ff-demo && cd ff-demo

# Initial commit — the common ancestor
echo "Version 1" > app.txt
git add app.txt
git commit -m "init: add app.txt"

cat app.txt
# Version 1

# Create feature branch (main has NO new commits yet)
git switch -c feature/fast-forward-demo

# Add work on the feature branch
echo "Login Page Added" >> app.txt
git add app.txt
git commit -m "feat: add login page"

cat app.txt
# Version 1
# Login Page Added

git log --oneline --graph --all
# * abc1234 (HEAD -> feature/fast-forward-demo) feat: add login page
# * def5678 (main) init: add app.txt

# Merge — main has not moved, so Git just moves the pointer
git switch main
git merge feature/fast-forward-demo
# Output: Fast-forward

cat app.txt
# Version 1
# Login Page Added

git log --oneline --graph --all
# * abc1234 (HEAD -> main, feature/fast-forward-demo) feat: add login page
# * def5678 init: add app.txt
```

**Key point:** No merge commit. `main` pointer simply moved to where `feature/fast-forward-demo` was. History is a straight line.

---

### Demo 4b — Non-Fast-Forward (Three-Way) Merge (7 minutes)

```bash
cd /tmp
git init merge-demo && cd merge-demo

# Initial commit
echo "Version 1" > app.txt
git add app.txt
git commit -m "init: add app.txt"

# Create feature branch and add a change
git switch -c feature/non-fast-forward-demo
echo "Payment Module" >> app.txt
git add app.txt
git commit -m "feat: add payment module"

# Switch back to main and make a DIFFERENT change — now both branches diverge
git switch main
echo "Security Hotfix" >> app.txt
git add app.txt
git commit -m "fix: security hotfix"

git log --oneline --graph --all
# * 111aaaa (HEAD -> main) fix: security hotfix
# | * 222bbbb (feature/non-fast-forward-demo) feat: add payment module
# |/
# * 333cccc init: add app.txt

# Merge — Git must create a merge commit (M) because both branches diverged
git merge feature/non-fast-forward-demo
# Auto-merging app.txt
# Merge made by the 'ort' strategy.

cat app.txt
# Version 1
# Security Hotfix
# Payment Module

git log --oneline --graph --all
# *   444dddd (HEAD -> main) Merge branch 'feature/non-fast-forward-demo'
# |\
# | * 222bbbb (feature/non-fast-forward-demo) feat: add payment module
# * | 111aaaa fix: security hotfix
# |/
# * 333cccc init: add app.txt
```

**Key point:** Both branches had commits the other didn't — Git can't just move a pointer. It creates merge commit M with **two parents**, producing the diamond shape in the log.

---

### Demo 4c — Rebase (8 minutes)

```bash
cd /tmp
git init rebase-demo && cd rebase-demo

# Initial commit
echo "Version 1" > app.txt
git add app.txt
git commit -m "init: add app.txt"

# Create feature branch and add a change
git switch -c feature/rebase-demo
echo "Login Feature" >> app.txt
git add app.txt
git commit -m "feat: add login feature"

# Main moves ahead independently
git switch main
echo "Security Patch" >> app.txt
git add app.txt
git commit -m "fix: security patch"

git log --oneline --graph --all
# * 555eeee (HEAD -> main) fix: security patch
# | * 666ffff (feature/rebase-demo) feat: add login feature
# |/
# * 777gggg init: add app.txt

# Rebase — replays feature/rebase-demo commits on top of main
git switch feature/rebase-demo
git rebase main
# Successfully rebased and updated refs/heads/feature/rebase-demo.

cat app.txt
# Version 1
# Security Patch      <- main's change is now BELOW the feature change
# Login Feature

git log --oneline --graph --all
# * 888hhhh (HEAD -> feature/rebase-demo) feat: add login feature   <- C' (new hash!)
# * 555eeee (main) fix: security patch
# * 777gggg init: add app.txt

# Now merge — because feature is on top of main, this is a fast-forward
git switch main
git merge feature/rebase-demo
# Output: Fast-forward

git log --oneline --graph --all
# * 888hhhh (HEAD -> main, feature/rebase-demo) feat: add login feature
# * 555eeee fix: security patch
# * 777gggg init: add app.txt
```

**Key points:**
- The original commit `C` became `C'` — same content, **new hash** (this is why you never rebase shared branches)
- After rebase, `main` merge was a fast-forward — perfectly linear history
- `Security Patch` appears before `Login Feature` in the file because rebase puts main's history first

---

### Demo 4d — Conflict During Rebase (9 minutes)

```bash
cd /tmp
git init conflict-demo && cd conflict-demo

# Initial commit — two lines so the conflict is on a specific line
printf "Version 1\nDatabase: MySQL\n" > app.txt
git add app.txt
git commit -m "init: add app.txt"

cat app.txt
# Version 1
# Database: MySQL

# Feature branch changes the database line to PostgreSQL
git switch -c feature/conflict-demo
printf "Version 1\nDatabase: PostgreSQL\n" > app.txt
git add app.txt
git commit -m "feat: switch to PostgreSQL"

# Main changes the SAME line to MongoDB — intentional conflict
git switch main
printf "Version 1\nDatabase: MongoDB\n" > app.txt
git add app.txt
git commit -m "fix: switch to MongoDB"

git log --oneline --graph --all
# * aaa1111 (HEAD -> main) fix: switch to MongoDB
# | * bbb2222 (feature/conflict-demo) feat: switch to PostgreSQL
# |/
# * ccc3333 init: add app.txt

# Rebase — Git stops because both branches changed the same line
git switch feature/conflict-demo
git rebase main
# CONFLICT (content): Merge conflict in app.txt
# error: could not apply bbb2222... feat: switch to PostgreSQL

cat app.txt
# Version 1
# <<<<<<< HEAD
# Database: MongoDB
# =======
# Database: PostgreSQL
# >>>>>>> feature/conflict-demo
```

**Pause here — ask students:**
- *Which line is from `main`?* (`<<<<<<< HEAD` = MongoDB)
- *Which line is from the feature branch?* (below `=======` = PostgreSQL)
- *Which one do we keep?*

```bash
# Resolve — keep PostgreSQL (the feature branch decision)
printf "Version 1\nDatabase: PostgreSQL\n" > app.txt

git add app.txt
git rebase --continue
# Write the commit message and save, or just :wq

cat app.txt
# Version 1
# Database: PostgreSQL

git log --oneline --graph --all
# * ddd4444 (HEAD -> feature/conflict-demo) feat: switch to PostgreSQL
# * aaa1111 (main) fix: switch to MongoDB
# * ccc3333 init: add app.txt
```

**Key point:** Even with a conflict, the result is a linear history. The conflict markers in `app.txt` are Git's way of asking *"you and main both changed this — what should it be?"*

---

### Demo 4 — Summary

| Scenario | History shape | Merge commit? | `app.txt` result |
|---|---|---|---|
| Fast-forward | Straight line | No | Version 1 + Login Page |
| Three-way merge | Diamond (M) | Yes | Version 1 + Hotfix + Payment |
| Rebase then merge | Straight line | No | Version 1 + Patch + Login |
| Rebase with conflict | Straight line (resolved) | No | Version 1 + PostgreSQL |

---

## Demo 5 — Reflog Recovery (8 minutes)

```bash
git init reflog-demo && cd reflog-demo
git commit --allow-empty -m "commit 1"
git commit --allow-empty -m "commit 2"
git commit --allow-empty -m "commit 3"
git commit --allow-empty -m "commit 4 — important work"

git log --oneline
# Shows all 4 commits

# "Accidentally" reset hard
git reset --hard HEAD~3
git log --oneline
# Only "commit 1" visible

# Recover with reflog
git reflog
# HEAD@{1} was "commit 4 — important work"
git reset --hard HEAD@{1}
git log --oneline
# All 4 commits restored
```

**Key point:** `git reflog` is your safety net for local mistakes.

---

## Demo 6 — Stash (5 minutes)

```bash
git init stash-demo && cd stash-demo
echo "original" > work.txt && git add -A && git commit -m "init"

# Mid-feature, not ready to commit
echo "half-finished feature" >> work.txt
git status   # modified

# Emergency! Save your work
git stash push -m "wip: half-finished feature"
git status   # clean working tree

# Do the urgent work
echo "urgent fix" >> work.txt && git add -A && git commit -m "fix: urgent hotfix"

# Come back to your feature
git stash pop
git status   # working changes restored
cat work.txt # both changes visible
```

---

## Demo 7 — Bisect Automated (10 minutes)

```bash
git init bisect-demo && cd bisect-demo

# Create commits where commit 6 introduces a bug
for i in 1 2 3 4 5; do
  echo "line $i" >> app.txt
  git add -A
  git commit -m "commit $i — good"
done

echo "BUG" >> app.txt
git add -A && git commit -m "commit 6 — introduces bug"

for i in 7 8 9 10; do
  echo "line $i" >> app.txt
  git add -A
  git commit -m "commit $i — good"
done

git log --oneline

# Bisect with a test script
cat > test.sh << 'EOF'
grep -q "BUG" app.txt && exit 1 || exit 0
EOF
chmod +x test.sh

git bisect start
git bisect bad HEAD
git bisect good HEAD~10
git bisect run bash test.sh
git bisect reset
```

Git will identify `commit 6` as the first bad commit automatically.

---

## Demo 8 — Conventional Commits Impact on Log (5 minutes)

Show two git log outputs side by side (pre-written or created in demo):

**Without conventions:**
```
stuff
more stuff
fix
done
testing
final
actually final
```

**With Conventional Commits:**
```
feat: add user authentication with JWT
fix: resolve session timeout on mobile Safari
docs: update API endpoint documentation
chore: upgrade express from 4.17 to 4.18
test: add unit tests for auth middleware
refactor: extract token validation to helper
feat: add password reset via email
```

**Key point:** Every team member can understand the history at a glance. Changelog generation becomes automatic.
