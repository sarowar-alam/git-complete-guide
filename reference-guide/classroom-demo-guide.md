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

## Demo 4 — Rebase vs Merge (12 minutes)

```bash
git init rebase-demo && cd rebase-demo
git commit --allow-empty -m "init"

# Simulate main moving forward
git switch -c feature/x
git commit --allow-empty -m "feat: feature X step 1"
git commit --allow-empty -m "feat: feature X step 2"

git switch main
git commit --allow-empty -m "chore: main work A"
git commit --allow-empty -m "chore: main work B"

git log --oneline --graph --all
# Shows diverged history

# Rebase feature onto main
git switch feature/x
git rebase main

git log --oneline --graph --all
# Shows linear history — feature/x is now on top of main
```

**Compare:** Redo without rebase, use `git merge` instead — show the merge commit in the log.

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
