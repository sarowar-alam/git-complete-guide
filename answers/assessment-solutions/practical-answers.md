# Practical Assessment Answers

---

## Scenario Answers

### S1 — Branch Naming Violations
`Feature/JIRA_123_Login_Page` violates:
1. Uppercase first letter (`F` → should be `f`)
2. Underscores instead of hyphens (`_` → `-`)
3. Ticket ID format: include as lowercase if needed, not required in name
4. Description uses title case: should be all lowercase

Correct name: `feature/login-page` (or `feature/jira-123-login-page` if ticket tracking is required)

---

### S2 — Merging 8 Commits Cleanly

```bash
git switch feature/user-auth
git rebase -i HEAD~8
# In editor: squash/fixup the 5 WIP/fix commits into the 3 real ones
# Write meaningful combined messages when prompted

git switch main
git merge --no-ff feature/user-auth
git push origin main
git branch -d feature/user-auth
git push origin --delete feature/user-auth
```

---

### S3 — Fork Misconception
A fork is a **server-side copy** of the repository on GitHub. Changes you commit to your fork do NOT automatically appear in the original. To get changes from your fork into the original:
1. Push commits to your fork
2. Open a pull request from your fork's branch to the original repo's branch
3. A maintainer of the original repo reviews and merges the PR

---

### S4 — Production Incident Fix

```bash
# Option 1: Revert the bad commit (safe — creates undo commit)
git revert HEAD
git push origin main
# Render/deployment auto-deploys the revert

# Option 2: If you know the last good commit SHA
git revert <bad-commit-sha>
git push origin main
```
Do NOT use `git reset --hard` — history rewrite on a shared `main` is dangerous.

---

### S5 — Rebase Before PR

Rebase is the right choice here — it replays your 3 commits on top of the latest `main`, keeping history linear and your PR clean.

```bash
git switch feature/your-feature
git fetch origin
git rebase origin/main
# resolve any conflicts, then git rebase --continue
git push origin feature/your-feature --force-with-lease
```

Merge would work too, but creates an extra merge commit in your PR history.

---

### S6 — Conflict Prevention Practices
1. **Short-lived feature branches** — merge daily or every 2 days, not weekly
2. **CODEOWNERS** — auto-assign owners to `src/api/` so changes are coordinated
3. **Sync with `main` before opening a PR** (`git fetch + git rebase`)
4. **Divide the folder by concern** — each developer owns specific API files
5. **Communication** — announce in team chat before touching shared files

---

### S7 — SemVer Decision
- Remove `/v1/users` → **BREAKING CHANGE** → MAJOR increments
- Add `/v2/users/export` → new feature (but MAJOR already incremented, so MINOR resets)
- Bug fix → PATCH (but MAJOR increment resets MINOR and PATCH)

New version: **v3.0.0**

When MAJOR increments, MINOR and PATCH reset to 0.

---

### S8 — Upstream Sync + Rebase

```bash
# Step 1: Sync fork's main
git switch main
git fetch upstream
git rebase upstream/main
git push origin main

# Step 2: Rebase feature branch
git switch feature/search
git rebase main

# Step 3: Push feature branch
git push origin feature/search --force-with-lease
```

---

### S9 — Stash Mid-Feature

```bash
# On feature/payment
git stash push -m "payment: half-implemented checkout"
git switch feature/auth
# review the PR — leave comments on GitHub

git switch feature/payment
git stash pop
# continue work
```

---

### S10 — Branch Protection for Public Repo

For `main` on GitHub Free (public repo):
- ✅ Require a pull request before merging (min 1 approval)
- ✅ Dismiss stale pull request approvals when new commits are pushed
- ✅ Require status checks to pass before merging (link CI)
- ✅ Require branches to be up to date before merging
- ✅ Prevent force pushes
- ✅ Prevent branch deletion
- Optional: Require signed commits if team has GPG set up

---

### S11 — Recreate Deleted Tag

```bash
git log --oneline  # find the v2.0.0 release commit SHA
git tag -a v2.0.0 <sha> -m "v2.0.0 — recreated from commit"
git push origin v2.0.0
```

---

### S12 — Squash Before Review

```bash
git rebase -i HEAD~15
# Squash the 12 WIP commits into the 3 meaningful ones
# Write 3 clear commit messages
git push origin feature/your-branch --force-with-lease
```

---

### S13 — Cherry-Pick Security Patch

```bash
git log hotfix/cve-2025-001 --oneline
# note the SHA of the security patch commit — e.g. abc1234

git switch develop
git cherry-pick abc1234
git push origin develop
```

---

### S14 — Deployment Rollback (two approaches)

**Approach 1 — Git revert + auto-deploy:**
```bash
git revert HEAD
git push origin main
# Render detects the push and deploys the revert
```

**Approach 2 — Render UI rollback:**
Open render.com → your service → Deploys tab → find the last successful deploy → click "Rollback to this deploy". Render re-deploys that snapshot without touching Git.

---

### S15 — History Audit for Credentials File

```bash
git log --all --full-history -- "database-credentials.txt"
# Shows: commit SHA, author, date, message for every commit touching that file
```

To see the actual content at a specific commit:
```bash
git show <sha>:database-credentials.txt
```

---

### S16 — Team Role Setup

| Person | Role/Credential |
|--------|----------------|
| Senior developer | **Write** (push branches, manage PRs) |
| QA engineer | **Triage** (manage issues/PRs, no direct push) |
| Legal team member | **Read** (view and clone only) |
| CI/CD bot | **Write** via a machine user account or **Deploy key** with write access |

---

### S17 — Bisect Steps for 500 Commits

$$\log_2(500) \approx 9 \text{ steps}$$

```bash
git bisect start
git bisect bad HEAD
git bisect good v3.0.0
# Git will check out commit at midpoint
# Test it, then:
git bisect good  # or bad
# Repeat ~9 times
git bisect reset
```

---

### S18 — Reflog Recovery

```bash
git reflog
# Look for the commit before the reset — e.g.:
# HEAD@{4}  commit: feat: add payment processing
# HEAD@{5}  commit: feat: add cart
# ...
# HEAD@{11} reset: moving to HEAD~8

git reset --hard HEAD@{4}
# or git branch recover-branch HEAD@{4} to create a safe copy first
```

---

### S19 — Secret in Public History

**Immediate actions (first 10 minutes):**
1. **Revoke the AWS access key** in the AWS console — assume it's compromised
2. **Generate a new key** and update any services using it

**Remove from history:**
```bash
pip install git-filter-repo

# Remove the file from all commits
git filter-repo --path .env --invert-paths

# Force-push all branches
git push origin --force --all
git push origin --force --tags

# All collaborators must re-clone or run:
# git fetch --all && git reset --hard origin/main
```
Also contact GitHub support to purge cached views.

---

### S20 — GitFlow Release Process

```bash
# Create release branch from develop
git switch develop
git switch -c release/v1.0.0

# Version bump, final fixes only
# Edit package.json, CHANGELOG.md, etc.
git commit -am "chore: bump version to 1.0.0"

# Merge to main
git switch main
git merge --no-ff release/v1.0.0 -m "release: v1.0.0"

# Tag on main
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin main
git push origin v1.0.0

# Back-merge to develop
git switch develop
git merge --no-ff release/v1.0.0 -m "merge: sync release/v1.0.0 back to develop"
git push origin develop

# Delete release branch
git branch -d release/v1.0.0
git push origin --delete release/v1.0.0
```

---

## Troubleshooting Answers

### T1
**Cause:** Someone else pushed to `origin/main` since your last pull. Your local `main` is behind.

```bash
git pull --rebase origin main
# or
git fetch origin
git rebase origin/main
# then push again
git push origin main
```

---

### T2
After manually resolving conflict markers:
```bash
git add src/app.js
git commit
```
Git will open the editor with a pre-filled merge commit message. Save it to complete the merge.

---

### T3
**Cause:** `main` has branch protection enabled that prevents force pushes.

**Correct approach:**
```bash
# Don't force push. Instead:
git switch -c fix/my-changes
git push origin fix/my-changes
# Open a PR on GitHub from fix/my-changes → main
```

---

### T4
**What happened:** When you ran `git switch main`, Git warned that the detached HEAD commits have no branch pointing to them. They become dangling commits — not immediately deleted but no reference to them.

**Recovery:**
```bash
git reflog
# Find the last detached HEAD commit SHA — e.g. abc1234
git branch recover-detached abc1234
git switch recover-detached
# or cherry-pick the commits onto main
```

---

### T5
```bash
# 1. Resolve the conflict in config.js manually (remove markers)
# 2. Stage the resolved file
git add config.js
# 3. Continue the rebase
git rebase --continue
```

---

### T6
```bash
# Resolve the conflict in styles.css manually
git add styles.css
# Complete the merge (stash pop started a merge)
git commit
# The stash entry was NOT removed (unlike a clean pop)
# You may drop it manually:
git stash drop
```

---

### T7
Yes, recoverable. `git reset --hard` moves HEAD and the branch pointer — it doesn't immediately delete commits. They remain as dangling commits accessible via `git reflog`.

```bash
git reflog
# Find e.g. HEAD@{3} which was the state before the reset
git reset --hard HEAD@{3}
```

---

### T8
They forgot to push the tag separately. `git push origin main` only pushes commits, not tags.

```bash
git push origin v1.5.0
# or push all tags at once:
git push origin --tags
```

---

### T9
The developer never marked any commit as `bad`. `git bisect` needs both a `good` and a `bad` commit to define the search range.

```bash
git bisect start
git bisect bad HEAD    # ← this was missing
git bisect good <sha>  # known-good commit or tag
```

---

### T10
After `git filter-repo` rewrites history, the remote has a completely new commit graph. Collaborators cannot simply `git pull` — their local history diverges.

Each collaborator must:
```bash
# Option A — re-clone (safest):
cd ..
rm -rf repo-name
git clone <remote-url>

# Option B — if they have local work to preserve:
git fetch origin
git reset --hard origin/main
```
