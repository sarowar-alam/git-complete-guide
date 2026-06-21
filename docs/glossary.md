# Glossary

Git terms from A to Z, explained plainly.

---

**Annotated Tag**
A tag that is a full Git object — it stores the tagger's name, email, date, and a message. Use these for releases. See also: Lightweight Tag.

**Bare Repository**
A repository with no working directory. Contains only the `.git` contents. Used as a central remote server.

**Binary Search (Bisect)**
The technique `git bisect` uses to find a bug-introducing commit by checking the midpoint of a range and halving it each time. $O(\log_2 n)$ steps to find the culprit in $n$ commits.

**Blob**
A Git object that stores the raw content of a file. No filename — just the bytes.

**Branch**
A lightweight pointer to a specific commit. Creating a branch writes a single file in `.git/refs/heads/`. See: [Branching guide](03-git-branching.md).

**Cherry-Pick**
Applying a specific commit from one branch onto your current branch without merging the full branch.

**Clone**
Creating a full local copy of a remote repository, including all history, branches, and tags.

**Commit**
A permanent snapshot of your project at a point in time. Every commit has a unique SHA-1 hash, author, timestamp, message, and pointer to one or more parent commits.

**Conflict**
When two branches modify the same part of the same file and Git can't automatically decide which version to keep. You resolve it manually.

**CODEOWNERS**
A special file (`.github/CODEOWNERS` or root `CODEOWNERS`) that maps file paths to required reviewers. When a PR touches those paths, the listed owners are automatically requested for review.

**Detached HEAD**
When `HEAD` points directly to a commit instead of a branch. This happens when you `git checkout <commit-hash>` or `git checkout <tag>`. Commits made in this state are not on any branch and can be lost.

**Diff**
A display of the differences between two versions of a file or between two commits.

**Distributed VCS**
A version control system where every user has a complete copy of the repository. Git is distributed. See: CVS, SVN for the centralized model.

**Fast-Forward Merge**
A merge where the target branch simply moves its pointer forward to the source branch's latest commit. Only possible when the target has no new commits since the branch point.

**Fetch**
Download objects and refs from a remote repository without merging them into your current branch. `git fetch` is safe — it never changes your working directory.

**Force Push (`--force`)**
Push even if it results in a non-fast-forward update — overwrites remote history. Dangerous on shared branches.

**`--force-with-lease`**
A safer alternative to `--force`. Refuses to push if someone else has pushed to the branch since your last fetch.

**Fork**
A copy of a repository on GitHub under your own account. You have full write access to your fork but not the original. Changes are proposed back via pull requests.

**Gitflow**
A branching strategy using `main`, `develop`, `feature/*`, `release/*`, and `hotfix/*` branches. Suited to scheduled releases.

**`.gitignore`**
A file listing patterns of files/folders that Git should ignore and never track.

**HEAD**
A special pointer that tells Git where you currently are. Normally points to a branch, which points to a commit.

**Hook**
A script that Git runs automatically at certain points (before commit, after push, etc.). Stored in `.git/hooks/`.

**Index**
Another name for the staging area — the `.git/index` file that holds the list of files queued for the next commit.

**Interactive Rebase (`-i`)**
A rebase that opens an editor letting you reorder, edit, squash, or drop individual commits.

**Lightweight Tag**
A simple pointer to a commit — just a name attached to a hash. No metadata. See also: Annotated Tag.

**Local Repository**
The `.git` directory on your machine. Contains the full history of the project.

**Merge**
Combining changes from one branch into another. Creates a merge commit (three-way) or just moves a pointer (fast-forward).

**Merge Commit**
A commit with two parent commits — the result of a three-way merge. It preserves the complete history of both branches.

**Object**
The fundamental unit of storage in Git. Four types: blob, tree, commit, tag. Each identified by its SHA-1 hash.

**Origin**
The conventional name for the default remote — typically the repository you cloned from (your fork, in a fork workflow).

**Pull**
`git pull` = `git fetch` + `git merge`. Downloads remote commits and merges them into your current branch.

**Pull Request (PR)**
A proposal to merge one branch into another, hosted on GitHub/GitLab/Bitbucket. The place where code review happens.

**Push**
Upload local commits to a remote repository.

**Rebase**
Replaying your commits on top of another branch. Produces a linear history. See: [Merging & Rebasing guide](05-merging-and-rebasing.md).

**Reflog**
A local log of every movement of HEAD and branch pointers. Your safety net for recovering "lost" commits.

**Remote**
A version of the repository hosted on a server (GitHub, GitLab, etc.). You can have multiple remotes (e.g., `origin`, `upstream`).

**Remote-Tracking Branch**
A local read-only copy of a remote branch (e.g., `origin/main`). Updated when you `git fetch`.

**Repository**
A directory tracked by Git. Contains the working directory and the `.git` folder.

**Reset**
Move a branch pointer to a different commit. Can also modify the staging area and working directory. Three modes: `--soft`, `--mixed`, `--hard`.

**Revert**
Create a new commit that undoes the changes of a previous commit. Safe for shared branches — history is preserved.

**SHA-1**
A 40-character hexadecimal string that uniquely identifies a Git object. Calculated from the object's contents.

**Squash**
Combine multiple commits into one. Done via interactive rebase or `git merge --squash`.

**Staging Area**
See: Index.

**Stash**
Temporarily save uncommitted changes so you can work on something else. Restored later with `git stash pop`.

**Tag**
A named pointer to a specific commit. Unlike a branch, it never moves. Used to mark releases.

**Three-Way Merge**
A merge where Git finds the common ancestor of two branches and uses it to automatically resolve differences. Produces a merge commit.

**Tracking Branch**
A local branch configured to track a remote branch. Allows `git push` and `git pull` without specifying the remote and branch name.

**Tree**
A Git object representing a directory — maps filenames to blob and tree objects (subdirectories).

**Trunk-Based Development**
A strategy where all developers commit frequently to a single long-lived branch (`main`/trunk), using feature flags to hide incomplete work.

**Upstream**
1. The original repository that a fork was created from.
2. The remote branch a local branch is configured to track.

**Working Directory**
The actual project files on your disk. Git tracks changes here but doesn't record them until you `git add` and `git commit`.

---

Back to [docs index](README.md) · Back to [root README](../README.md)
