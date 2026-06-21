# History Management

Git's history is permanent — until you deliberately rewrite it. This guide covers reading history clearly, cleaning up messy commits before merging, and recovering work you thought was gone.

---

## Viewing History

```bash
# Basic log
git log

# Compact one-line format
git log --oneline

# Graph view — see branch and merge structure
git log --oneline --graph --all

# Show last N commits
git log -5

# Show commits by a specific author
git log --author="Sarowar"

# Show commits that changed a specific file
git log -- src/app.js

# Show commits with the actual diff
git log -p

# Search commit messages
git log --grep="payment"

# Show commits between two dates
git log --after="2025-01-01" --before="2025-06-01"

# Show commits that added or removed a specific string
git log -S "function calculateTotal"
```

---

## Useful Log Formats

```bash
# Pretty format with colors and branch graph
git log --oneline --graph --decorate --all

# Show author, date, and short message
git log --pretty=format:"%h %an %ar %s"
# → abc123d Sarowar Alam 2 days ago feat: add payment processing

# Show only merge commits
git log --merges

# Show only non-merge commits
git log --no-merges
```

---

## Comparing Commits

```bash
# Diff between working directory and last commit
git diff

# Diff between staging area and last commit
git diff --staged

# Diff between two commits
git diff abc123 def456

# Diff between two branches
git diff main feature/search

# See which files changed (no content diff)
git diff --name-only main feature/search

# See a summary (insertions/deletions count)
git diff --stat main feature/search
```

---

## Squashing Commits

Squashing combines multiple commits into one. Use this to clean up "WIP", "fix typo", and "oops" commits before merging a PR.

### Via Interactive Rebase

```bash
# Squash the last 4 commits
git rebase -i HEAD~4
```

In the editor:
```
pick a1b2c3d feat: add search bar
squash d4e5f6g fix: search bar styling
squash h7i8j9k fix: search edge case
squash l0m1n2o wip: still working on search
```

Git opens a second editor to write the final combined commit message:
```
feat: add search bar with edge case handling

- Add search input component
- Handle empty query edge case
- Fix styling for mobile
```

### Via Merge with `--squash`

```bash
# From main, squash all of feature/search into one staged change
git merge --squash feature/search
git commit -m "feat: add search feature"
```

This doesn't create a merge commit — it stages all the changes as if you made them in one go.

---

## Rewriting History (Amend)

```bash
# Change the message of the most recent commit
git commit --amend -m "feat: add payment processing with validation"

# Add a forgotten file to the most recent commit
git add forgotten-file.js
git commit --amend --no-edit    # keeps the existing message

# Change the author of the last commit
git commit --amend --author="New Name <new@email.com>"
```

> Only amend commits that haven't been pushed. If you amend a pushed commit, you'll need to force-push, which rewrites history for everyone who has it.

---

## Recovering Lost Commits

### Using Reflog

Git keeps a log of every move `HEAD` has made for at least 90 days. Even "deleted" commits exist there.

```bash
git reflog
# HEAD@{0}: reset: moving to HEAD~3     ← this erased 3 commits
# HEAD@{1}: commit: feat: add dark mode  ← this is one of them
# HEAD@{2}: commit: feat: add theme picker
# HEAD@{3}: commit: fix: color contrast

# Recover all 3 commits
git reset --hard HEAD@{3}

# Or just cherry-pick the ones you need
git cherry-pick HEAD@{1}
```

### Recovering a Deleted Branch

```bash
# A branch was deleted — find its last commit in reflog
git reflog | grep "feature/deleted-branch"
# abc123d HEAD@{5}: commit: last commit on that branch

# Re-create the branch from that commit
git branch feature/recovered abc123d
```

### Finding Dangling Commits

Commits that exist but aren't reachable from any branch or tag:

```bash
git fsck --lost-found
# dangling commit abc123def...

# Inspect it
git show abc123def

# Recover it
git cherry-pick abc123def
```

---

## Removing a File from All History

Sometimes secrets (API keys, passwords) get committed. You need to remove them from the entire history, not just the latest commit.

```bash
# Using git filter-repo (recommended — install separately)
pip install git-filter-repo

git filter-repo --path secrets.env --invert-paths

# After this:
# - secrets.env is gone from every commit
# - All commit hashes are rewritten
# - Force-push required to all remotes
git push origin --force --all
git push origin --force --tags
```

> After removing secrets from history, **rotate the credentials immediately**. Anyone who cloned the repo before your cleanup may still have the file.

---

## Repository Cleanup

Over time, repositories accumulate loose objects, stale remote-tracking branches, and large packfiles.

```bash
# Remove stale remote-tracking branches
git fetch --prune
git remote prune origin

# Remove unreachable objects
git gc
git gc --aggressive  # more thorough, slower

# See how much space the .git folder uses
du -sh .git

# Find large objects in history
git rev-list --objects --all \
  | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' \
  | sort -k3 -rn \
  | head -20
```

---

## Knowledge Check

1. You need to find when a specific function `calculateDiscount` was removed. What `git log` command finds the commit?
2. Your PR has 12 commits — most are "WIP" and "fix typo". How do you clean these up before the PR review?
3. You ran `git reset --hard HEAD~5` 30 minutes ago. Can you recover those commits? How?
4. A developer committed an AWS access key 6 months ago. It's in 200+ commits. What tool should you use to remove it?
5. After removing secrets from history and force-pushing, what do your teammates need to do with their local clones?

---

Previous: [Advanced Git Operations →](10-advanced-git-operations.md)
Next: [Git Best Practices →](12-git-best-practices.md)
