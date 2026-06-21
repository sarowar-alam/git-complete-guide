# Interview Answers

Suggested answers — word them in your own voice during an interview.

---

**1. Git vs GitHub**

**Git** is a distributed version control system that tracks changes in files locally on your machine. **GitHub** is a cloud hosting platform for Git repositories that adds collaboration features (pull requests, issue tracking, CI/CD).

---

**2. What `git commit` does internally**

1. Git takes all staged files and creates a **blob** object for each file's content
2. It creates a **tree** object representing the directory structure
3. It creates a **commit** object containing: the root tree SHA, author, committer, timestamp, commit message, and a pointer to the parent commit
4. It moves the current branch pointer to the new commit SHA

---

**3. Detached HEAD**

Detached HEAD means `HEAD` points directly to a commit SHA instead of to a branch name. It happens when you run `git checkout <tag>`, `git checkout <sha>`, or `git bisect`. It's not an error — it's a browsing mode. Any commits you make in this state have no branch pointing to them, so they'll become unreachable unless you create a branch: `git switch -c new-branch`.

---

**4. Why rebasing changes SHAs**

A commit SHA is a hash of its content plus its parent commit SHA. When rebase replays your commits onto a new base, each replayed commit has a different parent — therefore a different SHA. This means the "same" changes now live at different IDs, which rewrites history. If teammates have already pulled the original commits, their history diverges from yours — causing serious confusion on shared branches.

---

**5. Merge strategies**

| Strategy | When to use |
|----------|-------------|
| `--ff` (default when possible) | Fast-forward when the target branch hasn't diverged — cleanest history |
| `--no-ff` | Preserving the fact that a feature was developed on a branch; team preference for explicit merge commits |
| `--squash` | Collapsing a PR's many commits into one clean commit on the target branch |

---

**6. Branching strategy for continuous deployment**

**GitHub Flow** or **Trunk-Based Development**. Both keep `main` always deployable and use short-lived feature branches. GitFlow's `develop` and `release` branches add overhead that slows down teams deploying multiple times a day. If you need formal releases (SaaS with versioned tiers), GitHub Flow with tags is a good middle ground.

---

**7. Git workflow design for a growing startup**

- **`main`** — always deployable, branch-protected, deploy on merge
- **Feature branches** — `feature/ticket-description`, short-lived (1–3 days max)
- **PR required** — at least 1 approval before merge, linked CI must pass
- **Conventional commits** — `feat:`, `fix:`, `chore:`, `docs:` prefix on all messages
- **Tags** — `vMAJOR.MINOR.PATCH` on every production deploy
- `.gitignore` and `.gitattributes` committed on day one

This keeps history readable and onboarding simple.

---

**8. Preventing sensitive data in history**

1. **`.gitignore`** — exclude `.env`, `*.pem`, `config/secrets.*` before writing them
2. **Pre-commit hooks** — tools like `detect-secrets` or `gitleaks` scan staged files before commit
3. **Environment variables** — never hardcode credentials; use deployment platform env vars
4. **Secret scanning** — GitHub automatically scans for known secret formats and alerts you

If a secret is already committed: rotate it immediately, then use `git filter-repo` to remove the file from all history.

---

**9. Rebase vs merge**

Use **rebase** when:
- You want a linear, readable history
- You're updating a feature branch before opening a PR
- You're the only one working on the branch

Use **merge** when:
- The branch is shared with others
- You want an explicit record that a feature was developed separately (merge commit)
- You're merging a long-running release into `main` in GitFlow

Golden rule: never rebase commits that have already been pushed to a shared branch.

---

**10. Trunk-Based Development**

Everyone commits directly to `main` (or uses very short-lived feature branches — max 1–2 days). Feature flags control what's visible in production. Works best for:
- Experienced teams with strong test coverage and CI
- High-deployment-frequency products
- Companies like Google, Facebook use it at scale

Not suited for: teams without good CI, open source with many external contributors, products with formal versioned releases.

---

**11. Finding a bug with bisect**

```bash
git bisect start
git bisect bad HEAD           # current state is broken
git bisect good v3.0.0        # this tag was known-working

# Git checks out the midpoint commit
# Test the app. If broken:
git bisect bad
# If working:
git bisect good
# Repeat ~log₂(commit count) times
# Git announces: "abc1234 is the first bad commit"
git bisect reset              # go back to HEAD
git show abc1234              # see what changed
```

---

**12. GitFlow hotfix while develop has unfinished work**

```bash
git switch main
git switch -c hotfix/critical-bug
# fix the bug
git commit -am "fix: critical auth bypass CVE-2025-001"

# Merge to main
git switch main
git merge --no-ff hotfix/critical-bug
git tag -a v2.3.1 -m "Hotfix v2.3.1"
git push origin main v2.3.1

# Back-merge to develop (so it has the fix too)
git switch develop
git merge --no-ff hotfix/critical-bug
git push origin develop
git branch -d hotfix/critical-bug
```

`develop` keeps its unfinished features. The hotfix is in both `main` and `develop`.

---

**13. Coordinating concurrent changes to `src/auth.js`**

1. Communicate — "I'm working on auth.js today" in team chat
2. One branch merges first (whoever's PR is ready)
3. Second branch then rebases on updated `main` (`git rebase origin/main`)
4. Conflicts, if any, are resolved on the feature branch — not on `main`
5. PR is reviewed with the resolved version

---

**14. SSH key pushed to public repo**

First 10 minutes:
1. **Revoke** the SSH private key on every service where it's registered (GitHub SSH keys settings, any server `authorized_keys`)
2. **Generate new keys** for those services
3. **Invalidate old key** — if it's a deploy key, remove it from the repo's deploy key settings

Then clean history:
```bash
git filter-repo --path id_rsa --invert-paths
git push origin --force --all
```
Contact GitHub to purge cached data. Require all team members to re-clone.

---

**15. Speeding up PR review cycle**

Git-related:
- **CODEOWNERS** — automatically assign the right reviewer so PRs don't sit waiting for someone to notice
- **Small PRs** — enforce a rule: PRs should change < 400 lines; large features use stacked PRs
- **Draft PRs** — open early for early feedback before it's "review-ready"
- **Branch protection + required CI** — reviewers spend less time on style/tests if CI already checked them

Process:
- Set a team SLA: "respond to PR requests within 4 working hours"
- Async code review norms: no need for live sessions for most PRs

---

**16. `git reflog` vs `git log`**

`git log` shows commits reachable from the current HEAD in history. `git reflog` shows every movement of HEAD on your local machine — including resets, checkouts, rebases, and commits that are no longer referenced by any branch.

Scenario: You run `git reset --hard HEAD~5` by mistake. `git log` won't show the lost commits. `git reflog` will — find the SHA before the reset and `git reset --hard <sha>` to recover.

---

**17. `git cherry-pick`**

Takes one (or a range of) specific commits from any branch and re-applies them on top of the current branch, creating new commits with the same changes but different SHAs.

Right tool when: a hotfix needs to go to both `main` and `develop` without a full merge; a feature commit was accidentally made on the wrong branch.

Risks: if the cherry-picked commit depends on code not present in the target branch, conflicts occur. Also creates duplicate commits in history if both branches eventually merge.

---

**18. `CODEOWNERS`**

A file at `.github/CODEOWNERS` (or `CODEOWNERS` in root or `docs/`). Each line maps a path pattern to one or more GitHub users/teams:

```
src/api/           @org/backend-team
docs/              @org/docs-team
*.yml              @devops-lead
```

When a PR changes a matching path, GitHub automatically adds those owners as required reviewers. With branch protection "require code owner review" enabled, the PR cannot merge without their approval.

---

**19. Essential `.gitignore` entries**

```gitignore
node_modules/      # JS dependencies — often millions of files
.env               # secrets and local config — never committed
*.log              # log files accumulate fast, repo-polluting
dist/ or build/    # compiled output — regenerated by CI
.DS_Store          # macOS metadata — meaningless to others
Thumbs.db          # Windows thumbnail cache
.idea/ or .vscode/ # IDE config — personal preference, not shared (unless team-agreed)
```

---

**20. `git stash`**

Temporarily saves your working directory and staging area changes without committing, so you can switch context and come back later.

Real scenario: You're implementing a feature when someone reports a production bug. You can't commit half-finished work.

```bash
git stash push -m "wip: feature X"
git switch main
# fix bug, commit, push
git switch feature/x
git stash pop
```

`stash pop` = apply stash + remove it from the stash list  
`stash apply` = apply stash but KEEP it in the stash list (useful if you want to apply the same stash to multiple branches)
