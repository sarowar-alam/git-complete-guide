# Git Practice Lab: `pull`, `merge`, and `rebase`

**Repository:** <https://github.com/md-sarowar-alam/git-practice>  
**Environment:** Ubuntu / WSL Ubuntu  
**Branches:** `main`, `feature/pull`, `feature/merge`, `feature/rebase`

This lab reproduces the commit diagrams for Git pull, merge, and rebase. You will create separate feature branches, make commits on both the feature branch and `main`, compare the results, and clean up when finished.

> **Important cleanup distinction:** deleting the local working directory does not delete the GitHub repository. Deleting the GitHub repository is destructive and removes the remote repository for everyone. The final section separates these actions. Do not run the remote deletion command unless you truly intend to delete `md-sarowar-alam/git-practice` from GitHub.

---

## 1. The mental model

A Git commit is a snapshot plus a pointer to its parent commit. A branch is a movable name pointing to a commit.

We will use these labels in the diagrams:

- **C** — the common starting commit (the current `main` commit when you start).
- **D, E** — commits made on a feature branch.
- **F** — a new commit made on `main` after the feature branch was created.
- **M** — a merge commit, when Git needs one.
- **D′, E′** — replacement commits created when rebasing D and E.

Initial state:

```text
main:     A --- B --- C
                       \
feature:                (starts at C)
```

After the feature gets D and E, while `main` gets F:

```text
main:     A --- B --- C --- F
                       \
feature:                D --- E
```

The branches have diverged: each branch contains commits the other branch does not have.

### What each command means

| Command | Meaning |
|---|---|
| `git fetch origin` | Download remote references/commits; do not integrate them into the current branch. |
| `git pull` | Fetch, then integrate a remote branch into the current branch. The integration may merge or rebase depending on configuration/options. |
| `git merge origin/main` | Integrate the fetched `origin/main` history into the current branch. |
| `git rebase origin/main` | Replay the current branch's commits on top of `origin/main`, creating new commit IDs for replayed commits. |
| `git push` | Send local commits/refs to the remote repository. |

**Remember:** the current branch is the branch that receives the merge, pull integration, or rebase.

---

## 2. Install Git and GitHub CLI (`gh`) on Ubuntu

Check whether they are already installed:

```bash
git --version
gh --version
```

If Git is missing:

```bash
sudo apt update
sudo apt install -y git
```

Install GitHub CLI. On Ubuntu versions where the package is available from the configured repositories:

```bash
sudo apt update
sudo apt install -y gh
```

If `apt` cannot find `gh`, follow the official installation instructions: <https://github.com/cli/cli#installation>.

Verify:

```bash
git --version
gh --version
```

Configure your Git author identity if you have not done so before. Use the name and email you want attached to your commits:

```bash
git config --global user.name "Your Name"
git config --global user.email "your-github-email@example.com"
```

Check the values:

```bash
git config --global --get user.name
git config --global --get user.email
```

Replace the example values with your own. These values identify commits; they are not your GitHub password.

---

## 3. Authenticate with GitHub CLI

Run:

```bash
gh auth login
```

Choose GitHub.com, select your preferred protocol (HTTPS is straightforward for this lab), and follow the browser/device authentication prompts.

Verify authentication and the account:

```bash
gh auth status
gh api user --jq .login
```

Check that the repository is accessible:

```bash
gh repo view md-sarowar-alam/git-practice
```

If this command reports that the repository does not exist or you do not have access, verify the URL, account, and repository permissions before continuing.

### Clone the existing repository

The repository URL was supplied in this guide, so **do not create a second repository with `gh repo create`**. Clone the existing one:

```bash
mkdir -p ~/git-labs
cd ~/git-labs

gh repo clone md-sarowar-alam/git-practice
cd git-practice
```

Equivalent Git command:

```bash
git clone https://github.com/md-sarowar-alam/git-practice.git
cd git-practice
```

Check the repository and remote:

```bash
pwd
git status
git remote -v
git branch --show-current
git branch -a
```

Expected remote name: `origin`. The default branch is expected to be `main`; verify it rather than assuming:

```bash
gh repo view md-sarowar-alam/git-practice --json defaultBranchRef --jq .defaultBranchRef.name
```

If the default branch is not `main`, adapt the commands in this lab or first confirm that `main` exists. Do not rename or overwrite a branch just to match this guide.

---

## 4. Prepare a safe starting point

Make sure you are in the intended repository and have no uncommitted work you need to keep:

```bash
git status
git fetch origin
git switch main
git pull --ff-only origin main
```

`--ff-only` updates local `main` only if it can fast-forward; it will stop rather than create a merge commit.

Check the latest commit:

```bash
git log -1 --oneline
```

For the diagrams in this lab, this latest commit is the shared starting point **C**. We will not rewrite existing history.

> If `git switch main` fails because there is no local `main`, inspect `git branch -a`. If the remote branch exists, use `git switch --track -c main origin/main`. If `main` does not exist, stop and verify the repository's actual default branch.

---

## 5. Create the three feature branches

Create all three from the same starting point **C**:

```bash
git switch main
git switch -c feature/pull
git switch main
git switch -c feature/merge
git switch main
git switch -c feature/rebase
git switch main
```

Confirm:

```bash
git branch --list
```

You should see `main`, `feature/pull`, `feature/merge`, and `feature/rebase`. The `*` marks the current branch.

Push the new branches to GitHub (optional, but useful for practicing remote branches):

```bash
git push -u origin feature/pull
git push -u origin feature/merge
git push -u origin feature/rebase
```

At this point all three feature branches start at the same commit as `main`.

---

## 6. Add commits D and E to each feature branch

We use separate demo files to avoid accidental conflicts and avoid overwriting existing project files.

### 6.1 `feature/pull`: create D and E

```bash
git switch feature/pull

echo "D: first feature/pull commit" > pull-demo.txt
git add pull-demo.txt
git commit -m "Add first pull demo change"

echo "E: second feature/pull commit" >> pull-demo.txt
git add pull-demo.txt
git commit -m "Add second pull demo change"

git log --oneline --decorate -3
git push
```

This branch now has two commits beyond C: **D and E**.

### 6.2 `feature/merge`: create D and E

```bash
git switch feature/merge

echo "D: first feature/merge commit" > merge-demo.txt
git add merge-demo.txt
git commit -m "Add first merge demo change"

echo "E: second feature/merge commit" >> merge-demo.txt
git add merge-demo.txt
git commit -m "Add second merge demo change"

git push
```

### 6.3 `feature/rebase`: create D and E

```bash
git switch feature/rebase

echo "D: first feature/rebase commit" > rebase-demo.txt
git add rebase-demo.txt
git commit -m "Add first rebase demo change"

echo "E: second feature/rebase commit" >> rebase-demo.txt
git add rebase-demo.txt
git commit -m "Add second rebase demo change"

git push
```

Now each feature branch has two commits of its own. `main` has not yet received commit F.

---

## 7. Add commit F to `main`

Simulate another developer adding a change to `main` after the feature branches were created:

```bash
git switch main
git pull --ff-only origin main

echo "F: new change on main" > main-update.txt
git add main-update.txt
git commit -m "Add main update for Git workflow lab"
git push origin main
```

Now `main` has F, while each feature branch has D and E based on the earlier commit C.

Check the graph:

```bash
git log --oneline --decorate --graph --all
```

Conceptually:

```text
main:     A --- B --- C --- F
                       \
feature:                D --- E
```

The actual commit hashes and labels in your repository will differ. Git does not name commits A/B/C/D/E/F; those are explanatory labels in the diagram.

---

## 8. Exercise 1 — `git pull` on `feature/pull`

### Goal

Get the latest `main` changes into `feature/pull`.

First switch to the feature branch:

```bash
git switch feature/pull
git status
```

For this exercise, explicitly select merge-style pull so the result is predictable even if your global Git configuration prefers rebase:

```bash
git -c pull.rebase=false pull origin main
```

This command fetches `origin/main` and merges it into your current branch, `feature/pull`. Because the branches diverged, Git will normally create merge commit **M**.

Inspect the result:

```bash
git status
git log --oneline --decorate --graph -10
git show --stat --oneline HEAD
```

Conceptually:

```text
main:     A --- B --- C --- F
                       \       \
feature:                D --- E --- M
```

**What changed?**

- Your current branch is still `feature/pull`.
- Its history now contains your D/E commits and main's F commit.
- M joins both histories.
- `main` itself was not changed by this pull.

Push the updated feature branch:

```bash
git push origin feature/pull
```

### Pull variations worth knowing

```bash
git pull origin main
```

Fetches `main` and integrates it into your current branch according to the configured pull behavior.

```bash
git fetch origin
git merge origin/main
```

Makes the two steps explicit: download first, integrate second.

```bash
git fetch origin
git rebase origin/main
```

Downloads updates, then replays your feature commits on top of `origin/main`.

**Do not assume every `git pull` creates a merge commit.** Configuration such as `pull.rebase=true`, or explicit options, can make pull rebase instead. The `-c pull.rebase=false` command above forces merge behavior for that command only.

---

## 9. Exercise 2 — `git merge` on `feature/merge`

### Goal

Explicitly fetch remote updates, then merge `main` into your feature branch.

```bash
git switch feature/merge
git fetch origin
git merge origin/main
```

Inspect the result:

```bash
git status
git log --oneline --decorate --graph -10
git show --stat --oneline HEAD
```

Conceptually:

```text
main:     A --- B --- C --- F
                       \       \
feature:                D --- E --- M
```

Push the result:

```bash
git push origin feature/merge
```

### Why use `fetch` followed by `merge`?

It gives you a chance to inspect what arrived from the remote before integrating it:

```bash
git fetch origin
git log --oneline --decorate HEAD..origin/main
git diff HEAD..origin/main
git merge origin/main
```

- `git log HEAD..origin/main` lists commits reachable from `origin/main` but not from your current branch.
- `git diff HEAD..origin/main` compares the current branch's tree with the fetched remote branch's tree.
- `git merge origin/main` integrates those fetched changes into the current branch.

`git merge` does not itself download updates. Run `git fetch` first if you need the latest remote state.

---

## 10. Exercise 3 — `git rebase` on `feature/rebase`

### Goal

Replay your feature commits on top of the latest `main` so the feature history becomes linear.

```bash
git switch feature/rebase
git fetch origin
git rebase origin/main
```

Inspect the result:

```bash
git status
git log --oneline --decorate --graph -10
git show --stat --oneline HEAD
```

Conceptually:

```text
main:     A --- B --- C --- F
                               \
feature:                        D' --- E'
```

**What changed?**

- Your feature changes are now based on F.
- Git replayed D and E, creating replacement commits D′ and E′ with new commit IDs.
- No merge commit is needed for this rebase.
- The original D/E commits still exist in the remote branch history until you update that branch, and may remain recoverable for a while through Git references/reflogs.

Push the rebased branch:

```bash
git push origin feature/rebase
```

Because this lab pushed the feature branch before rebasing, the remote branch still points to the old D/E history. A normal push may be rejected as non-fast-forward.

For a personal practice branch, after confirming you are on the correct branch and understand that the history was rewritten:

```bash
git push --force-with-lease origin feature/rebase
```

`--force-with-lease` is safer than `--force`: it refuses the update if the remote branch has moved unexpectedly. It is still a history rewrite, so **do not use it casually on shared branches**.

---

## 11. Compare the three results

Run:

```bash
git log --oneline --decorate --graph --all
```

You should be able to identify:

- `feature/pull`: a merge-style pull created a merge commit M.
- `feature/merge`: an explicit merge created a merge commit M.
- `feature/rebase`: the feature commits were replayed on top of F as D′ and E′.
- `main`: still points to F; updating feature branches did not merge them into `main`.

Your graph will be more complex than the simple illustration because all three feature branches and their remote-tracking references are present.

| Question | Pull (forced merge for this lab) | Merge | Rebase |
|---|---|---|---|
| Downloads remote updates? | Yes | No; fetch first | No; fetch first |
| Integrates `main` into feature? | Yes | Yes | Yes, by replaying commits |
| Usually creates merge commit here? | Yes | Yes | No |
| Rewrites feature commit IDs? | No | No | Yes |
| Best remembered as | Fetch + integrate | Join histories | Replay commits on a new base |

---

## 12. Optional — practice a merge conflict safely

The earlier exercises use separate files to keep the main workflow straightforward. To practice conflicts, create a temporary branch from `main`:

```bash
git switch main
git switch -c lab/conflict
echo "Original line" > conflict-demo.txt
git add conflict-demo.txt
git commit -m "Add conflict demo file"
```

Create another branch that changes the same line:

```bash
git switch -c lab/conflict-other
echo "Change from other branch" > conflict-demo.txt
git add conflict-demo.txt
git commit -m "Change conflict demo from other branch"
```

Now try merging the second branch into the first:

```bash
git switch lab/conflict
echo "Change from first branch" > conflict-demo.txt
git add conflict-demo.txt
git commit -m "Change conflict demo from first branch"

git merge lab/conflict-other
```

Git should report a conflict because both branches changed the same line differently.

Open `conflict-demo.txt`, choose the correct final content, and remove the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`). Then:

```bash
git add conflict-demo.txt
git commit
git status
```

To abandon a merge that is still in progress instead:

```bash
git merge --abort
```

For a conflict during rebase, resolve the file and stage it, then run:

```bash
git add conflict-demo.txt
git rebase --continue
```

To abandon a rebase:

```bash
git rebase --abort
```

Do not use `git reset --hard` as a generic conflict fix: it can discard uncommitted work.

---

## 13. Optional — merge a feature into `main`

The previous exercises bring `main` changes into feature branches. The reverse direction is what happens when a completed feature is integrated into `main`.

In a shared team repository, the usual process is to open a pull request, review it, run tests, and merge it according to team policy. Do not push directly to a protected `main` branch if your team's workflow requires pull requests.

For a disposable practice repository where direct pushes are allowed, the merge direction is:

```bash
git switch main
git pull --ff-only origin main
git merge --no-ff feature/pull
git push origin main
```

`--no-ff` forces a merge commit even when a fast-forward would be possible. This makes the merge visible for demonstration. This command changes `main` on the remote when pushed; do it only if you intentionally want to integrate that feature.

Because this guide uses one repository for three separate exercises, **do not merge all three feature branches into `main` unless you want all three demo files and histories there**.

---

## 14. Troubleshooting and safety checks

### “Working tree is not clean”

```bash
git status
```

Commit or safely stash your work before switching branches or running a rebase. Do not discard changes you need.

### “Already up to date”

The current branch already contains the commits from the specified branch, or there are no new commits to integrate. Confirm the branch and remote:

```bash
git branch --show-current
git fetch origin
git log --oneline --decorate HEAD..origin/main
```

### “Non-fast-forward” on push

The remote branch has commits that your local branch does not contain, or you rebased a branch already pushed. Inspect first:

```bash
git fetch origin
git log --oneline --decorate --graph --left-right HEAD...origin/feature/rebase
```

Do not immediately force-push. If you deliberately rebased your own practice branch, use `--force-with-lease` only after confirming the remote has no unexpected work.

### Cancel an operation

```bash
git merge --abort
git rebase --abort
```

Use the command that matches the operation currently in progress.

### Useful inspection commands

```bash
git status
git branch -vv
git remote -v
git log --oneline --decorate --graph --all
git show --stat HEAD
git diff
git diff --staged
```

---

## 15. Cleanup — remove the practice work

Choose carefully between local cleanup and remote deletion.

### Option A — delete only the local working copy (recommended)

First leave the repository directory:

```bash
cd ~/git-labs
```

If you have anything you want to keep, back it up first. Then remove only the local clone:

```bash
rm -rf -- git-practice
```

This deletes the local directory and its local Git history, but it **does not** delete the GitHub repository or any remote branches. `rm -rf` is destructive: check `pwd` and the directory name before running it.

If you only want to remove the lab branches but keep the local repository:

```bash
cd ~/git-labs/git-practice
git switch main
git branch -D feature/pull feature/merge feature/rebase
git branch -D lab/conflict lab/conflict-other 2>/dev/null || true
```

To delete remote feature branches that you pushed (optional):

```bash
git push origin --delete feature/pull feature/merge feature/rebase
```

Only run that command if you want those remote branches removed. It does not delete the repository itself.

### Option B — delete the GitHub repository itself (permanent/destructive)

**Only do this if you intend to delete `md-sarowar-alam/git-practice` from GitHub for everyone.** This removes the remote repository, not just the lab branches. Make sure you have backed up anything you need and verified the exact repository.

Review the target first:

```bash
gh repo view md-sarowar-alam/git-practice
```

The CLI may require the `delete_repo` authorization scope:

```bash
gh auth refresh -s delete_repo
```

Then request deletion with confirmation:

```bash
gh repo delete md-sarowar-alam/git-practice
```

Read the confirmation prompt and proceed only if you are certain. The non-interactive form exists but is deliberately not used here:

```bash
# Destructive: do not run unless you explicitly intend to delete the remote repository.
gh repo delete md-sarowar-alam/git-practice --yes
```

Official command reference: <https://cli.github.com/manual/gh_repo_delete>

---

## 16. Final memory checklist

- **Fetch** downloads remote updates; it does not merge them into your current branch.
- **Pull** fetches and integrates a remote branch into the current branch.
- **Merge** combines histories and usually creates a merge commit when branches have diverged.
- **Rebase** replays commits on a new base and changes the IDs of the replayed commits.
- **Current branch matters:** it is the branch that receives the integration.
- **Feature → main** is the usual direction when completing a feature; **main → feature** keeps your feature branch up to date.
- Use pull requests and team policy for shared/protected branches.
- Inspect `git status` before switching, merging, rebasing, or cleaning up.
- Prefer local cleanup unless you really need to delete the remote repository.

## Official references

- GitHub CLI installation: <https://github.com/cli/cli#installation>
- GitHub CLI repository commands: <https://cli.github.com/manual/gh_repo>
- GitHub CLI repository deletion: <https://cli.github.com/manual/gh_repo_delete>
- Git documentation: <https://git-scm.com/docs>
