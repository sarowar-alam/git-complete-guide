# Lab Solutions & Hints

Spoiler-free hints appear first. Full solutions below each hint.

---

## Lab 01 — Version Control Setup

**Hint:** If `git push` fails with "rejected", the remote has changes you don't have locally. Run `git pull --rebase origin main` first.

**Challenge solution:**
```bash
touch README.md .gitignore src/index.html
git add .
git commit -m "feat: initial project scaffold"
```

---

## Lab 02 — Branching

**Hint:** Switching branches with uncommitted changes will either carry those changes or fail. Commit or stash before switching.

**Challenge solution:**
```bash
git stash
git switch main
git switch -c hotfix/typo-fix
# make fix
git commit -am "fix: correct typo in README"
git switch main
git merge --no-ff hotfix/typo-fix
git stash pop
git switch feature/navbar
```

---

## Lab 03 — Merge Conflicts

**Hint:** After resolving conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), remove all three marker lines. Only the resolved content should remain.

**Key reminder:** You must run `git add <file>` after manually resolving, then `git commit`.

---

## Lab 04 — Rebase

**Hint:** If a rebase conflict appears, resolve it, then `git add` the file and run `git rebase --continue`. Never `git commit` during rebase.

**Interactive rebase squash example:**
```
pick abc1234 feat: add search input
squash def5678 fix: search input styling
squash ghi9012 fix: search input validation
squash jkl3456 feat: complete search feature
```
Change to:
```
pick abc1234 feat: add search input
squash def5678 fix: search input styling
squash ghi9012 fix: search input validation
squash jkl3456 feat: complete search feature
```
Write the combined commit message when the editor opens again.

---

## Lab 05 — Pull Requests

**Hint:** Always sync with upstream before pushing your feature branch for a PR. This reduces conflicts during review.

```bash
git fetch upstream
git rebase upstream/main
git push origin feature/your-feature --force-with-lease
```

---

## Lab 06 — Branch Protection

**Expected error when direct-pushing to protected `main`:**
```
remote: error: GH006: Protected branch update failed for refs/heads/main.
remote: error: At least 1 approving review is required by reviewers...
```
This is the **correct behaviour** — protection is working.

**Correct path:** Create a branch, push it, open a PR, get approval, merge via GitHub.

---

## Lab 07 — Tags & Releases

**Hint:** Annotated tags contain metadata (name, email, date). Lightweight tags do not.

**Correct commands:**
```bash
# Annotated tag
git tag -a v1.0.0 -m "First stable release"

# Push single tag
git push origin v1.0.0

# Push all tags
git push origin --tags
```

---

## Lab 08 — Stash, Reset, Revert

**Reset modes:**
| Mode | Commits | Staging | Working Files |
|------|---------|---------|---------------|
| `--soft` | Removed | Kept staged | Unchanged |
| `--mixed` (default) | Removed | Unstaged | Unchanged |
| `--hard` | Removed | Cleared | Discarded |

**Safe undo on shared branch:** Always use `git revert`, never `git reset --hard`.

---

## Lab 09 — History & Recovery

**Reflog recovery:**
```bash
git reflog
# Find the SHA before your bad reset — e.g. HEAD@{3}
git reset --hard HEAD@{3}
# or cherry-pick specific commits
```

**Bisect automation:**
```bash
git bisect start
git bisect bad HEAD
git bisect good v1.0.0
git bisect run bash -c 'node test.js; exit $?'
git bisect reset
```

---

## Lab 10 — Deployment

**Render static site:** Root directory = `/`, Publish directory = `/` (or wherever `index.html` lives). Build command can be left blank for static sites.

**Rollback in Git:**
```bash
git revert HEAD
git push origin main
# Render auto-deploys the revert commit
```

**Rollback in Render UI:** Open your service → Deploys → find the last good deploy → click "Rollback to this deploy".
