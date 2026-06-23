# Git Fast-Forward, Merge, Rebase & Conflict Demo

Repository:

```bash
git clone https://github.com/md-sarowar-alam/batch-13-test-repo.git
cd batch-13-test-repo
```

---

# Objectives

By the end of this guide, you will understand:

* Fast-Forward Merge
* Non Fast-Forward Merge
* Rebase
* Merge Conflicts
* Git Commit Graph Visualization

Useful command throughout:

```bash
git log --oneline --graph --all --decorate
```

---

# Initial Setup

Create `students.txt`:

```bash
printf "Batch 13 Students\n\n1. Rahim\n2. Karim\n" > students.txt
cat students.txt
# Batch 13 Students
#
# 1. Rahim
# 2. Karim
```

Commit it:

```bash
git add .
git commit -m "Initial commit"
```

---

# Scenario 1: Fast-Forward Merge

## Create Feature Branch

```bash
git switch -c feature/fast-forward-demo
```

Update `students.txt`:

```text
Batch 13 Students

1. Rahim
2. Karim
3. Jannat
```

Commit:

```bash
git add .
git commit -m "Add Jannat"
```

Visualize:

```text
A --- B (feature/fast-forward-demo)
|
main
```

---

## Merge Into Main

```bash
git switch main
git merge feature/fast-forward-demo
# Output: Fast-forward

cat students.txt
# Batch 13 Students
#
# 1. Rahim
# 2. Karim
# 3. Jannat

git log --oneline --graph --all --decorate
```

Result:

```text
A --- B
      ^
main
feature/fast-forward-demo
```

No merge commit is created. The `main` pointer simply moved forward to B.

---

# Scenario 2: Non Fast-Forward Merge

> Continuing in the same repo from Scenario 1. `students.txt` already contains Rahim, Karim, and Jannat from the fast-forward merge.

## Create Branch

```bash
git switch main
git switch -c feature/non-fast-forward-demo
```

Update `students.txt`:

```text
Batch 13 Students

1. Rahim
2. Karim
3. Hasan
```

Commit:

```bash
git add .
git commit -m "Add Hasan"
```

History:

```text
A --- B
       \
        C
```

---

## Main Branch Changes

Switch back to main:

```bash
git switch main
```

Update `students.txt`:

```text
Batch 13 Students

1. Rahim
2. Karim

Trainer: Sarowar Alam
```

Commit:

```bash
git add .
git commit -m "Add trainer name"
```

History:

```text
A --- B --- D (main)
       \
        C (feature/non-fast-forward-demo)
```

---

## Merge Branch

```bash
git merge feature/non-fast-forward-demo
# Auto-merging students.txt

cat students.txt

git log --oneline --graph --all --decorate
```

Result:

```text
A --- B --- D -------- M
       \             /
        C ----------
```

Final file:

```text
Batch 13 Students

1. Rahim
2. Karim
3. Hasan

Trainer: Sarowar Alam
```

Explanation:

* Git creates a Merge Commit (`M`)
* Two histories are combined
* This is called a Non Fast-Forward Merge

---

# Scenario 3: Rebase

> Continuing in the same repo from Scenario 2. `main` now has the non-fast-forward merge commit combining Hasan and Trainer: Sarowar Alam.

## Create Branch

```bash
git switch main
git switch -c feature/rebase-demo
```

Update `students.txt`:

```text
Batch 13 Students

1. Rahim
2. Karim
3. Nusrat
```

Commit:

```bash
git add .
git commit -m "Add Nusrat"
```

History:

```text
A --- B
       \
        C
```

---

## Main Branch Moves Ahead

Switch:

```bash
git switch main
```

Update `students.txt`:

```text
Batch 13 Students

1. Rahim
2. Karim

Batch Started: June 2026
```

Commit:

```bash
git add .
git commit -m "Add batch start date"
```

History:

```text
A --- B --- D (main)
       \
        C (feature/rebase-demo)
```

---

## Rebase Feature Branch

```bash
git switch feature/rebase-demo
git rebase main
# Successfully rebased and updated refs/heads/feature/rebase-demo.

cat students.txt
# (main's changes appear first, then Nusrat's commit replayed on top)

git log --oneline --graph --all --decorate
# Linear history — no fork
```

Git replays the "Add Nusrat" commit on top of the latest `main`. The original commit C gets a new hash — it becomes C'.

Result:

```text
A --- B --- D --- C'
```

Updated file:

```text
Batch 13 Students

1. Rahim
2. Karim

Batch Started: June 2026

3. Nusrat
```

Notice:

```text
C -> C'
```

Git creates a new commit hash.

---

## Merge After Rebase

```bash
git switch main
git merge feature/rebase-demo
# Output: Fast-forward

cat students.txt

git log --oneline --graph --all --decorate
```

Result:

```text
A --- B --- D --- C'
```

No merge commit is created. After rebase, `feature/rebase-demo` was directly ahead of `main`, so Git fast-forwarded.

> **Golden Rule of Rebase:** Never rebase commits you have already pushed to a shared branch. Rebase rewrites history — commit C becomes C' with a new hash. If teammates have already pulled C, their history will diverge from yours.

---

# Scenario 4: Conflict Demo

> Continuing in the same repo from Scenario 3. Both branches will intentionally change the same `Trainer:` line — causing a conflict during rebase.

## Create Branch

```bash
git switch main
git switch -c feature/conflict-demo
```

Change the trainer line to Hasan:

```bash
sed -i 's/Trainer: Sarowar Alam/Trainer: Hasan/' students.txt
cat students.txt
# ...
# Trainer: Hasan
```

Commit:

```bash
git commit -am "Change trainer to Hasan"
```

---

## Main Branch Changes Same Line

Switch:

```bash
git switch main
```

Change the same trainer line to just "Sarowar" (intentionally different from the feature branch):

```bash
sed -i 's/Trainer: Hasan/Trainer: Sarowar/' students.txt
```

Commit:

```bash
git commit -am "Change trainer to Sarowar"
```

History:

```text
main
A --- D

feature/conflict-demo
 \
  C
```

---

## Rebase

```bash
git switch feature/conflict-demo
git rebase main
# CONFLICT (content): Merge conflict in students.txt

cat students.txt
# ...
# <<<<<<< HEAD
# Trainer: Sarowar
# =======
# Trainer: Hasan
# >>>>>>> feature/conflict-demo
```

File becomes:

```text
<<<<<<< HEAD
Trainer: Sarowar
=======
Trainer: Hasan
>>>>>>> feature/conflict-demo
```

Explanation:

* HEAD = main branch
* Bottom section = feature branch

---

## Resolve Conflict

Decide which version to keep. Open `students.txt` in an editor, remove all conflict markers, and save the resolved value:

```bash
# Open the file (nano, vim, or VS Code) and edit to:
#   Trainer: Sarowar Alam
nano students.txt

cat students.txt
# ...
# Trainer: Sarowar Alam

git add students.txt
git rebase --continue
# Rebase completes successfully.

git log --oneline --graph --all --decorate
# Linear history — conflict resolved, no merge commit created
```

---

# Summary

## Fast-Forward Merge

```text
A --- B
```

* No merge commit
* Branch pointer simply moves forward

---

## Non Fast-Forward Merge

```text
A --- B --- D -------- M
       \             /
        C ----------
```

* Merge commit created
* Both histories preserved

---

## Rebase

```text
A --- B --- D --- C'
```

* Linear history
* New commit hashes created
* Cleaner commit graph

---

## Conflict

```text
<<<<<<< HEAD
Current Branch
=======
Incoming Change
>>>>>>> feature-branch
```

Resolve manually and continue:

```bash
git add .
git rebase --continue
```

---

# Recommended Commands

```bash
git log --oneline --graph --all --decorate

git status

git branch

git switch <branch>

git merge <branch>

git rebase main

git rebase --abort

git rebase --continue
```

---

# Cleanup

When finished, remove the cloned repo:

```bash
cd ..
rm -rf batch-13-test-repo
```


