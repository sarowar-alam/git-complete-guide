# Teaching Notes

Observations, common mistakes, and discussion prompts for each topic area.

---

## General Delivery Tips

- Run all demo commands in Git Bash so participants can follow exactly
- Keep a "panic recovery" plan visible: `git status` is always safe; it tells you the state without changing anything
- Encourage `git log --oneline --graph --all` early — it makes branching visual
- When a participant gets into a weird state, `git status` first, then diagnose together — treat it as a teachable moment

---

## Module-by-Module Notes

### docs/01 — Version Control Fundamentals

**Common misconception:** "Backup = version control." Address this early. Backup is a copy. VCS is a complete timeline with authorship, rollback, and branching.

**Discussion prompt:** "Has anyone lost work because they saved over a file? How would VCS have helped?"

**Whiteboard idea:** Draw the centralized model (everyone writes to one server). Then draw the distributed model (everyone has a full clone). Ask: "What happens if the server goes down in each model?"

---

### docs/02 — Git Architecture

**Common mistake:** Participants conflate `git add` and `git commit`. Reinforce the two-step flow: staging (curate what goes into the commit) → commit (save the snapshot).

**Discussion prompt:** "Why does Git have a staging area at all? Why not commit everything at once?" (Answer: you can commit only part of your changes — e.g., fix a bug while leaving half-finished feature code unstaged.)

**Whiteboard idea:** Draw the three areas as three boxes. Move a file arrow by arrow as you explain each command.

---

### docs/03 — Git Branching

**Common mistake:** Deleting a branch thinking it deletes the commits. It only removes the pointer. The commits exist until garbage collection.

**Demo:** `git switch feature/x` — show the file appearing. `git switch main` — show the file disappearing. This always surprises people and locks in the mental model.

**Discussion prompt:** "What's your team's current branch naming convention? Is it consistent?"

---

### docs/04 — Branching Strategies

**Common mistake:** Applying GitFlow to a team of 2. It's overhead without benefit at small scale.

**Decision framework (share verbally):**
- Team < 5, deploy daily → GitHub Flow
- Team 5–20, need formal releases → GitFlow
- High-trust team, strong CI → Trunk-Based Development

**Discussion prompt:** "Which strategy do you think your workplace uses? Is it intentional or accidental?"

---

### docs/05 — Merging & Rebasing

**Common mistake:** Using `git reset --hard` on a shared branch to undo a merge. Instead: `git revert`.

**Most important point to hammer home:** The golden rule of rebase. Write it on the board: **"Never rebase commits that exist on a remote shared branch."**

**Discussion prompt:** "When would you prefer a messy-but-honest history over a clean rebased one?" (Answer: open source projects where the PR history matters; audit trails.)

---

### docs/06 — Repository Collaboration

**Common mistake:** Forking and then trying to push directly to upstream instead of making a PR.

**Demo flow (5 minutes):**
1. Show the fork button on GitHub
2. Show `git remote -v` on a clone with only `origin`
3. Add upstream: `git remote add upstream <url>`
4. Show `git remote -v` again — two remotes

**Discussion prompt:** "What's the difference between contributing to an open source project and working on a private company repo? Why does forking matter in open source?"

---

### docs/07 — Repository Roles & Permissions

**Common mistake:** Giving everyone Admin access "because it's easier." Spend 2 minutes on the least-privilege principle and why it matters.

**Real scenario to share:** "A developer with Admin accidentally deleted the `main` branch. If they'd had Write access only, they couldn't have done it."

**Whiteboard idea:** Draw the permission pyramid: Read → Triage → Write → Maintain → Admin. Show what each level CAN and CANNOT do.

---

### docs/08 — Branch Protection

**Important caveat to state clearly:** GitHub Free branch protection only works on **public** repos. If the group is using private repos on free accounts, demo in a public repo.

**Demo flow:**
1. Turn on "Require PRs" with 1 approval
2. Try `git push origin main` directly — show the rejection error
3. Show the correct path: branch → push → PR → approve → merge

---

### docs/09 — Tags & Releases

**Common mistake:** Creating a lightweight tag when the team expects release metadata. Always use annotated tags for releases.

**Quick memory aid:** "Annotated = annotated with who, when, and why."

**Discussion prompt:** "Who decides what version number to assign — developers or product managers?"

---

### docs/10 — Advanced Git Operations

**Most powerful demo:** `git bisect run` with an automated test. Even a simple `exit 0 / exit 1` script shows the power. Seeing Git narrow down 1000 commits to the bad one in 10 steps is memorable.

**Common mistake with stash:** Forgetting a stash exists. Show `git stash list` habit.

**Reset modes table on whiteboard:**
```
--soft   = undo commit only (changes stay staged)
--mixed  = undo commit + unstage (changes in working dir)
--hard   = undo commit + discard everything
```

---

### docs/11 — History Management

**Most important safety note:** `git filter-repo` rewrites history. Every collaborator must re-clone afterward. Do this on a copy first, never directly on production repos without agreement.

**Common mistake:** Using `git log` to try to find "lost" commits after a hard reset. Use `git reflog` instead.

---

### docs/12 — Git Best Practices

**Most practical takeaway:** Conventional commits. Even if a team doesn't use the full spec, just having `feat:` and `fix:` prefixes makes `git log` dramatically more readable.

**Quick exercise:** Show a git log with random messages ("stuff", "more stuff", "fix", "done") vs one with conventional commits. The improvement is obvious.

---

### docs/13 — Deployment

**Note for delivery:** Heroku removed its free tier in November 2022. Do not set expectations that Heroku is free. Render.com is the hands-on platform.

**Common confusion:** "Does every push deploy?" — explain that auto-deploy is configured in Render settings, not Git. Show where to enable/disable it.

**Demo flow:** Push a one-line change to the deployed site. Watch Render build and deploy in real time (usually ~30–60 seconds for a static site).

---

## Frequently Asked Questions

**Q: Should I always use `git pull --rebase` instead of `git pull`?**
A: Many senior developers prefer it because it keeps history linear. It's a personal/team choice. Set it as default with `git config pull.rebase true` if the team agrees.

**Q: Is `git reset --hard` ever safe?**
A: On commits that have NEVER been pushed and no one else has, yes. On any shared commit, no.

**Q: Do I need to know all Git commands?**
A: The 20 most common commands cover 95% of daily work. The advanced commands (bisect, filter-repo, reflog) are for rare situations — knowing they exist is enough until you need them.

**Q: What's the difference between `origin` and `upstream`?**
A: `origin` = your fork (or the repo you cloned). `upstream` = the original repo you forked from. Only relevant in fork workflows.

**Q: When should I squash commits?**
A: Before merging a feature PR that has WIP/fix commits. Keep the squash to the branch, never squash on `main` or `develop`.
