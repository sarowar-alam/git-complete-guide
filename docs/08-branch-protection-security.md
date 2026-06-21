# Branch Protection & Security

Branch protection rules let you enforce workflow standards on important branches. They prevent force pushes, block direct commits, require reviews, and tie CI results to merge eligibility. This is where Git policy meets team discipline.

---

## What Are Protected Branches?

A protected branch has rules applied to it that restrict what can be done — even by Admins (if configured). The most common branches to protect are `main`, `master`, `develop`, and `release/*`.

Without protection:
- Anyone with Write access can force-push to `main` and erase history
- Someone can merge a PR without any review
- A broken build can land in production

With protection: those things require deliberate override or are blocked entirely.

---

## GitHub Free Tier: What's Available

> **Important:** On GitHub Free, branch protection rules only work on **public repositories**. For private repos, you need GitHub Pro ($4/user/month) or GitHub Team.

```
Public repo + free account = full branch protection ✅
Private repo + free account = no branch protection ❌
```

---

## Setting Up Branch Protection on GitHub

```
Repo → Settings → Branches → Add branch ruleset (or Add rule)
→ Branch name pattern: main
→ Configure rules below
→ Save changes
```

> 📸 Screenshot: GitHub Settings → Branches page showing "Branch protection rules" section with "Add rule" button

---

## Prevent Direct Push to Main

The most important rule. Forces all changes through pull requests.

```
☑ Require a pull request before merging
```

After enabling this, attempting to push directly to `main` gives:

```bash
$ git push origin main
remote: error: GH006: Protected branch update failed for refs/heads/main.
remote: error: At least 1 approving review is required by reviewers
                with write access.
To https://github.com/you/repo.git
 ! [remote rejected] main -> main (protected branch hook declined)
error: failed to push some refs
```

---

## Prevent Force Push

Force push rewrites history. On a shared branch, it's destructive.

```
☑ Block force pushes
```

```bash
# This will be rejected on a protected branch
git push --force origin main

# This safer alternative is also rejected
git push --force-with-lease origin main
```

If you need to rewrite history on a protected branch (e.g., removing accidentally committed secrets), you must temporarily disable the rule, push, then re-enable it.

---

## Prevent Branch Deletion

Stops anyone (including Admins) from deleting the protected branch via CLI or the GitHub UI.

```
☑ Restrict deletions
```

```bash
# This will be rejected
git push origin --delete main
```

---

## Require Pull Request Reviews

Before a PR can merge, it must have a minimum number of approvals.

```
☑ Require a pull request before merging
  ☑ Required number of approvals: 1
  ☑ Dismiss stale reviews when new commits are pushed
  ☑ Require review from Code Owners
```

**Dismiss stale reviews:** if a reviewer approves and then you push more commits, the approval is dismissed — the reviewer must re-approve the updated code.

**Code Owners:** define which team/person must review changes to specific files. Uses a `CODEOWNERS` file in the root:

```
# CODEOWNERS file
# Format: <path pattern>  <owner>

# Sarah must review any changes to the API
/src/api/         @sarah-devops

# The DevOps team must review infrastructure files
/infra/           @org/devops-team

# Anyone on the frontend team can review frontend
/src/frontend/    @org/frontend-team
```

---

## Require Status Checks

Before a PR can merge, specific CI checks must pass. This prevents broken code from landing in `main`.

```
☑ Require status checks to pass before merging
  ☑ Require branches to be up to date before merging
  Add status check: ci/tests
  Add status check: ci/lint
```

When a status check fails:
```
✗ ci/tests — Tests failed (3 failing)
✗ ci/lint  — Linting errors found
Merging is blocked until all required status checks pass.
```

---

## Restrict Who Can Push to a Branch

Even with a PR required, you can further restrict which roles/teams can merge into the protected branch.

```
☑ Restrict who can push to matching branches
  Add teams/people: @org/senior-engineers
```

---

## Require Signed Commits

Signed commits use GPG keys to cryptographically prove that a commit came from who it claims. Prevents commit author spoofing.

```
☑ Require signed commits
```

```bash
# Set up GPG signing locally
git config --global user.signingkey YOUR_GPG_KEY_ID
git config --global commit.gpgsign true

# Make a signed commit
git commit -S -m "feat: add payment processing"

# Verify signatures in log
git log --show-signature
```

---

## GitLab Equivalent (Push Rules)

On GitLab (including free self-hosted):

```
Project → Settings → Repository → Protected Branches
→ Add protected branch
→ Choose who can merge / who can push
```

GitLab also has **Push Rules** (premium feature) for:
- Reject unsigned commits
- Require commit message format (e.g., must start with `JIRA-`)
- Reject files over a certain size
- Prevent pushing secrets

---

## Protecting History: No Force Push + Signed Commits Together

The combination of "Block force pushes" + "Require signed commits" means:
1. Nobody can rewrite published history
2. Every commit is cryptographically attributed to a real identity
3. You have a complete, tamper-evident audit trail

This is the baseline for any repository that handles production code.

---

## Practical Checklist for a New Repository

```
□ Protect main branch
□ Block force push on main
□ Restrict deletion of main
□ Require at least 1 PR review
□ Dismiss stale reviews on new push
□ Require CI status checks to pass
□ Add CODEOWNERS for critical paths
□ Give developers Write role, not Admin
□ Use fine-grained tokens for CI/CD, not personal credentials
```

---

## Knowledge Check

1. You're on GitHub Free with a private repo. Can you enable branch protection? What are your options?
2. Someone merges a PR, then pushes 3 more commits directly to `main` with `--force`. What rule would have prevented this?
3. What does "Dismiss stale reviews" mean in practice?
4. Your CI pipeline runs tests on every PR. How do you prevent merging if tests fail?
5. What's the purpose of a `CODEOWNERS` file?

---

Previous: [Repository Roles & Permissions →](07-repository-roles-permissions.md)
Next: [Tags & Releases →](09-tags-and-releases.md)
