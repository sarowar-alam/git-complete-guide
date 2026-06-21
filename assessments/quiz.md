# Quiz — 50 Questions

Choose the best answer for each question. Answers in [answers/assessment-solutions/quiz-answers.md](../answers/assessment-solutions/quiz-answers.md).

---

## Version Control Fundamentals (Q1–Q8)

**Q1.** What is the main advantage of a distributed VCS over a centralized one?

- A) It is faster to set up
- B) Every developer has a full copy of the repository and full history
- C) Only one person can commit at a time
- D) It requires a permanent internet connection

---

**Q2.** Which VCS is most commonly used in the game development industry for large binary assets?

- A) Git
- B) SVN
- C) Perforce
- D) Mercurial

---

**Q3.** What happened to Bitbucket's Mercurial support?

- A) It was improved significantly in 2020
- B) It was dropped in 2020 in favour of Git
- C) It is still fully supported
- D) It was merged into GitHub

---

**Q4.** Which VCS introduced atomic commits to fix a problem that CVS had?

- A) Perforce
- B) Git
- C) SVN
- D) Mercurial

---

**Q5.** If GitHub goes down, can you still make commits? Why?

- A) No — Git requires internet access
- B) Yes — Git is distributed and stores full history locally
- C) Only if you have a cached version
- D) Only with SVN as a backup

---

**Q6.** Git was originally created by:

- A) Microsoft
- B) GitHub
- C) Linus Torvalds
- D) Apache Foundation

---

**Q7.** Which command shows the status of your working directory and staging area?

- A) `git info`
- B) `git status`
- C) `git show`
- D) `git log`

---

**Q8.** A "working directory" in Git refers to:

- A) The `.git` folder
- B) The remote repository
- C) Your actual project files on disk
- D) The staging area

---

## Git Architecture (Q9–Q16)

**Q9.** What is a blob object in Git?

- A) A reference to a commit
- B) The raw contents of a file
- C) A directory listing
- D) A tag object

---

**Q10.** What does `git add` do?

- A) Commits changes to the repository
- B) Pushes changes to GitHub
- C) Moves changes from working directory to the staging area
- D) Creates a new branch

---

**Q11.** What is HEAD in Git?

- A) The first commit in a repository
- B) The remote server
- C) A pointer to the current branch (or commit in detached state)
- D) The latest tag

---

**Q12.** A branch in Git is physically stored as:

- A) A compressed copy of the repository
- B) A 41-byte text file containing a commit hash
- C) A database entry
- D) A separate folder in `.git/objects/`

---

**Q13.** What does `git fetch` do that `git pull` doesn't?

- A) Downloads objects but does NOT merge into your current branch
- B) Creates a new branch automatically
- C) Deletes the remote branch
- D) Pushes your local commits

---

**Q14.** Which Git object contains the tree, author, timestamp, and parent commit?

- A) Blob
- B) Tag
- C) Commit
- D) Index

---

**Q15.** You delete the `.git` folder from your project. What happens?

- A) Nothing — Git keeps a backup
- B) Your files remain but all Git history is permanently lost
- C) The remote repository is also deleted
- D) Git automatically recreates it

---

**Q16.** What does SHA-1 represent in Git?

- A) A branch name
- B) A unique identifier for a Git object, calculated from its content
- C) The remote URL
- D) The staging area index

---

## Branching (Q17–Q22)

**Q17.** Which command creates a new branch AND switches to it?

- A) `git branch -new`
- B) `git switch -c feature/x`
- C) `git checkout feature/x`
- D) `git create feature/x`

---

**Q18.** You switch from `feature/search` to `main` and `search.js` disappears. What happened?

- A) Git deleted the file permanently
- B) Git is showing the `main` snapshot — the file is safe on `feature/search`
- C) There was an error during checkout
- D) The file was staged but not committed

---

**Q19.** Which flag deletes a branch even if it hasn't been merged?

- A) `git branch -d`
- B) `git branch --remove`
- C) `git branch -D`
- D) `git branch --force-delete`

---

**Q20.** What does `git switch -` do?

- A) Deletes the current branch
- B) Switches to the last branch you were on
- C) Creates a new branch
- D) Shows branch differences

---

**Q21.** Which naming convention is correct for a feature branch?

- A) `Feature/LoginPage`
- B) `feature_login_page`
- C) `feature/login-page`
- D) `FEATURE-login-page`

---

**Q22.** `git branch --merged` shows:

- A) Branches that are ahead of main
- B) Branches that have been fully merged into the current branch
- C) Branches with merge conflicts
- D) Remote branches only

---

## Branching Strategies (Q23–Q26)

**Q23.** In GitFlow, where do feature branches merge into?

- A) `main` directly
- B) `release`
- C) `develop`
- D) `hotfix`

---

**Q24.** GitHub Flow's defining characteristic is:

- A) Two long-lived branches: `main` and `develop`
- B) Deploying from feature branches using PRs, no `develop` branch
- C) One commit per developer per day
- D) Feature flags required for all work

---

**Q25.** Which strategy is best for a team deploying 10 times a day?

- A) GitFlow
- B) GitHub Flow or Trunk-Based Development
- C) Centralized SVN workflow
- D) Feature freeze strategy

---

**Q26.** A `hotfix` branch in GitFlow should be created from:

- A) `develop`
- B) `feature/latest`
- C) `main`
- D) `release`

---

## Merging & Rebasing (Q27–Q32)

**Q27.** When does Git perform a fast-forward merge?

- A) When both branches have conflicting changes
- B) When the target branch has no new commits since the branch point
- C) When `--force` is used
- D) When merging from a remote

---

**Q28.** What does `git merge --no-ff` force Git to do?

- A) Abort on any conflict
- B) Always create a merge commit even when fast-forward is possible
- C) Skip the commit message
- D) Delete the source branch

---

**Q29.** You are mid-merge with conflicts and want to cancel completely. Which command?

- A) `git merge --skip`
- B) `git merge --quit`
- C) `git merge --abort`
- D) `git reset --merge`

---

**Q30.** Rebasing rewrites commit:

- A) Messages only
- B) Timestamps only
- C) SHA-1 hashes (the commit IDs change)
- D) Author names only

---

**Q31.** The golden rule of rebase is:

- A) Always rebase before merging
- B) Never rebase commits that have been pushed to a shared branch
- C) Rebase is always better than merge
- D) Only rebase on `develop`, never on `main`

---

**Q32.** Interactive rebase (`-i`) allows you to:

- A) Only change commit messages
- B) Squash, reorder, edit, or drop specific commits
- C) Merge two branches without conflicts
- D) Rebase from a remote branch automatically

---

## Collaboration & PRs (Q33–Q37)

**Q33.** In a fork workflow, `upstream` refers to:

- A) Your fork on GitHub
- B) The original repository you forked from
- C) The local clone
- D) The CI/CD server

---

**Q34.** `--force-with-lease` is safer than `--force` because:

- A) It skips the remote verification
- B) It fails if someone else has pushed to the branch since your last fetch
- C) It only works on protected branches
- D) It creates a backup before pushing

---

**Q35.** "Dismiss stale reviews" in branch protection means:

- A) Delete reviews after 7 days automatically
- B) If new commits are pushed, existing approvals are dismissed — re-review required
- C) Reviews from non-members are dismissed
- D) Draft PR reviews are ignored

---

**Q36.** You open a PR and the reviewer clicks "Request changes". What must happen before merging?

- A) Nothing — the PR can still be merged
- B) The reviewer must be removed from the PR
- C) The author must address the feedback and the reviewer must re-approve
- D) A second reviewer must override the first

---

**Q37.** After your PR is merged, what should you do with your local feature branch?

- A) Keep it for reference
- B) Push it to a backup remote
- C) Delete it locally and on the remote
- D) Rename it to `archive/feature-name`

---

## Branch Protection & Security (Q38–Q41)

**Q38.** On GitHub Free, branch protection rules work on:

- A) All repositories regardless of visibility
- B) Private repositories only
- C) Public repositories only
- D) Organization repositories only

---

**Q39.** Signed commits use GPG to:

- A) Encrypt the commit content
- B) Cryptographically verify that a commit was made by who it claims
- C) Compress the commit size
- D) Back up commits automatically

---

**Q40.** A `CODEOWNERS` file is used to:

- A) Restrict who can clone a repository
- B) Automatically request specific reviewers when PR touches certain files
- C) Set commit message formats
- D) Define which branches are protected

---

**Q41.** "Block force pushes" protection prevents:

- A) Pushing new commits to any branch
- B) `git push --force` rewriting history on the protected branch
- C) Creating new branches
- D) Deleting files in a commit

---

## Tags & Releases (Q42–Q44)

**Q42.** What is the difference between a lightweight and annotated tag?

- A) Lightweight tags can be pushed, annotated cannot
- B) Annotated tags store tagger name, email, date, and message — lightweight is just a pointer
- C) They are identical
- D) Lightweight tags point to trees, annotated to commits

---

**Q43.** According to SemVer, if you add a new backward-compatible feature, which part changes?

- A) MAJOR
- B) PATCH
- C) MINOR
- D) PRE-RELEASE

---

**Q44.** Tags are NOT pushed by default with `git push`. To push all tags, you run:

- A) `git push --all`
- B) `git push origin --tags`
- C) `git tag --push`
- D) `git push --include-tags`

---

## Advanced Git & History (Q45–Q50)

**Q45.** `git cherry-pick` does what?

- A) Merges an entire branch
- B) Applies a specific commit from another branch onto the current branch
- C) Removes a commit from history
- D) Creates a tag at a commit

---

**Q46.** `git stash pop` differs from `git stash apply` because:

- A) `pop` applies the stash AND removes it from the stash list
- B) `pop` only works on the oldest stash
- C) `apply` removes the stash, `pop` keeps it
- D) They are identical

---

**Q47.** Which reset mode discards all staged and unstaged changes along with the commits?

- A) `--soft`
- B) `--mixed`
- C) `--hard`
- D) `--clean`

---

**Q48.** Why is `git revert` safer than `git reset` on a shared branch?

- A) `revert` is faster
- B) `revert` creates a new undo commit without rewriting history
- C) `reset` requires admin access
- D) `revert` only works locally

---

**Q49.** How many commits does `git bisect` need to check in a 1024-commit range? (binary search)

- A) 512
- B) 1024
- C) 10 ($\log_2(1024) = 10$)
- D) 32

---

**Q50.** `git reflog` helps you recover from:

- A) Remote repository corruption
- B) Accidentally deleted files in the working directory
- C) Commits you thought were lost after `git reset --hard`
- D) Network errors during push

---

*Answers: [answers/assessment-solutions/quiz-answers.md](../answers/assessment-solutions/quiz-answers.md)*
