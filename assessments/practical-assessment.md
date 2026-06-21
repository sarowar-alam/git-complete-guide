# Practical Assessment

20 scenario-based questions + 10 troubleshooting exercises.

Answers: [answers/assessment-solutions/practical-answers.md](../answers/assessment-solutions/practical-answers.md)

---

## Scenario-Based Questions

### S1 — Branch Naming
Your team uses the pattern `type/ticket-description`. A colleague names their branch `Feature/JIRA_123_Login_Page`. List **every naming rule they violated** and write the correct branch name.

---

### S2 — Choosing a Merge Strategy
You're the team lead. A feature branch has 8 commits, including 3 "WIP" commits, 2 "fix typo" commits, and 3 real feature commits. The branch is ready to merge into `main`. What's your exact step-by-step process to get a clean history?

---

### S3 — Fork vs Clone
A junior engineer says: "I forked the repo, so my changes automatically appear in the original." Explain exactly what's wrong with this statement and describe how changes actually flow from fork to original.

---

### S4 — Production Incident
You pushed a commit to `main` that broke the login page. It's currently deployed and affecting all users. You need to fix it in the next 5 minutes. Write the exact Git commands.

---

### S5 — Rebase or Merge?
Your feature branch has 3 commits. `main` has received 10 new commits from teammates while you worked. You're about to open a PR. Should you rebase or merge? Why? Write the exact commands.

---

### S6 — Conflict Prevention
Your team has 5 developers all working on the same `src/api/` folder. You're getting merge conflicts every day. What Git-level practices would you introduce to reduce this?

---

### S7 — Semver Decision
Your API is at `v2.4.3`. You make these changes in one release:
- Remove the deprecated `/v1/users` endpoint (breaking change)
- Add a new `/v2/users/export` endpoint (new feature)
- Fix a null pointer bug in `/v2/products` (bug fix)

What is the new version number? Justify each component.

---

### S8 — Upstream Sync
You forked a repo 3 weeks ago. The upstream has 40 new commits. Your fork's `main` is behind. You have a feature branch `feature/search` based on your old `main`. Write the full sequence of commands to:
1. Sync your fork's `main` with upstream
2. Rebase `feature/search` onto the updated `main`
3. Push the feature branch to your fork

---

### S9 — Stash Scenario
You're halfway through a feature (`feature/payment`) with 3 modified files when your manager asks you to immediately review a teammate's PR on `feature/auth`. You can't commit the payment work yet. What do you do? Write the commands.

---

### S10 — Branch Protection Design
You're setting up a new organization repo on GitHub Free. The repo is public. Design the branch protection rules for `main`. List exactly what you'd enable and why.

---

### S11 — Tag Recovery
A teammate deleted the `v2.0.0` tag locally and on the remote. The release commit still exists. How do you recreate the tag on the correct commit?

---

### S12 — Squash Decision
You have a PR with 15 commits. 12 are WIP/fix commits. 3 are meaningful. Your team's standard says "PRs should have clean, meaningful commits only." What do you do before requesting review?

---

### S13 — Cherry-Pick Decision
A security patch was committed on `hotfix/cve-2025-001` which branched from `main`. The `develop` branch is 20 commits ahead of `main`. You need the security patch in `develop` without merging all of `develop` into `main` yet. What's the approach?

---

### S14 — Deployment Rollback
Your Node.js app is deployed on Render. The latest deployment (triggered by a push to `main`) caused a 500 error on the homepage. You need the site back to normal within 2 minutes. List two different rollback approaches.

---

### S15 — History Audit
A security team asks: "Who committed a file called `database-credentials.txt` to this repository, and when?" What Git command do you run to find this?

---

### S16 — Team Role Setup
You're onboarding these people to your GitHub repo:
- A senior developer writing new features
- A QA engineer managing issues and PRs (no code push)
- A legal team member who reviews contracts in the repo (read only)
- A CI/CD bot that pushes build artifacts

What role/credential does each get?

---

### S17 — Bisect Application
You have 500 commits. The app worked at `v3.0.0` (tagged). It's broken now. How many commits does `git bisect` need to check? (Show the formula and calculation.) Write the bisect commands to start the process.

---

### S18 — Reflog Recovery
You ran `git reset --hard HEAD~8` by accident. You need those 8 commits back. Write the exact commands to recover them using `git reflog`.

---

### S19 — Secret in History
A developer committed a `.env` file containing an AWS access key 30 commits ago. The repo is public on GitHub. What are the two immediate actions? Then describe the technical process to remove it from all history.

---

### S20 — Gitflow Release
Your `develop` branch is ready for release. Describe the **complete GitFlow release process** from creating the release branch to having a tagged commit on `main` with all changes back-merged to `develop`. Include the exact commands.

---

## Troubleshooting Exercises

### T1
```bash
$ git push origin main
error: failed to push some refs to 'origin'
hint: Updates were rejected because the remote contains work that you do not have locally.
```
What caused this? What command resolves it without losing anyone's work?

---

### T2
```bash
$ git merge feature/search
CONFLICT (content): Merge conflict in src/app.js
```
After resolving the conflict manually, what are the next two exact commands to complete the merge?

---

### T3
```bash
$ git push --force origin main
remote: error: GH006: Protected branch update failed for refs/heads/main.
```
Why did this fail? What is the correct approach to get the changes onto `main`?

---

### T4
```bash
$ git checkout v2.0.0
Note: switching to 'v2.0.0'.
You are in 'detached HEAD' state.
```
You make 3 commits in this state. Then you run `git switch main`. What happened to those 3 commits? How do you recover them?

---

### T5
```bash
$ git rebase main
CONFLICT (content): Merge conflict in config.js
error: could not apply abc123...
```
You want to fix this conflict and continue. Write the three commands in order.

---

### T6
```bash
$ git stash pop
CONFLICT (content): Merge conflict in styles.css
```
The stash pop created a conflict. What do you do next?

---

### T7
A developer says: "I ran `git reset --hard HEAD~3` and lost my last 3 commits. They weren't pushed." Is the work recoverable? If yes, explain how.

---

### T8
```bash
$ git tag -a v1.5.0 -m "New release"
$ git push origin main
# v1.5.0 does not appear on GitHub releases
```
What did they forget? Write the correct command.

---

### T9
```bash
$ git bisect good
$ git bisect good
$ git bisect good
$ git bisect good
$ git bisect good
# Git never finds a bad commit
```
What mistake did the developer make at the start of the bisect session?

---

### T10
After `git filter-repo` removed a secret file from all history, the team's local clones still show the file in their `git log`. What do they need to do?

---

*Answers: [answers/assessment-solutions/practical-answers.md](../answers/assessment-solutions/practical-answers.md)*
