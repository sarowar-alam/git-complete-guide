# Exercise Solutions

---

## Beginner

### Ex-01 — Init & First Commit

```bash
mkdir my-project && cd my-project
git init
touch README.md
git add README.md
git commit -m "docs: add README"
echo "# My Project" >> README.md
git add README.md
git commit -m "docs: add project title"
git log --oneline
```

### Ex-02 — Branching Basics

```bash
git switch -c feature/about-page
touch about.html
git add about.html
git commit -m "feat: add about page"
git switch main
git merge --no-ff feature/about-page -m "Merge branch 'feature/about-page'"
git branch -d feature/about-page
```

### Ex-03 — Simple Merge

```bash
# Create diverged history
git switch -c feature/nav
echo "<nav>Nav</nav>" >> index.html
git commit -am "feat: add nav"

git switch main
echo "<footer>Footer</footer>" >> index.html
git commit -am "feat: add footer"

# Merge — no conflict because different lines
git merge feature/nav
```

---

## Intermediate

### Ex-01 — Conflict Resolution

Conflicting section in `config.json`:
```json
<<<<<<< HEAD
  "theme": "dark"
=======
  "theme": "light"
>>>>>>> feature/ui-theme
```
Resolution (choose one, or combine):
```json
  "theme": "dark"
```
Then:
```bash
git add config.json
git commit -m "merge: resolve theme conflict, keeping dark"
```

### Ex-02 — Rebase Workflow

```bash
git switch feature/search
git fetch origin
git rebase origin/main
# resolve any conflicts, then:
git rebase --continue
git push origin feature/search --force-with-lease
```

### Ex-03 — Fork + Upstream + PR

```bash
# After forking on GitHub:
git clone https://github.com/YOUR_USERNAME/REPO.git
cd REPO
git remote add upstream https://github.com/ORIGINAL_OWNER/REPO.git
git switch -c feature/your-change
# make changes, commit
git fetch upstream
git rebase upstream/main
git push origin feature/your-change
# open PR on GitHub from feature/your-change → upstream:main
```

---

## Advanced

### Ex-01 — Interactive Rebase (8 commits → 3)

```bash
git rebase -i HEAD~8
```
In editor, change `pick` to `squash` (or `s`) for commits that belong together. Keep `pick` on the first of each logical group. Write meaningful commit messages when prompted.

Target result:
```
feat: implement user authentication
feat: add product search
fix: resolve mobile navigation issue
```

### Ex-02 — Cherry-Pick

```bash
# Find the commit SHA on security-fix branch
git log security-fix --oneline

# Cherry-pick to current branch
git cherry-pick <sha>

# If conflict:
# resolve files, then:
git add .
git cherry-pick --continue
```

### Ex-03 — Bisect (30 commits)

$\log_2(30) \approx 5$ steps needed.

```bash
git bisect start
git bisect bad HEAD
git bisect good HEAD~30   # or a known-good tag

# Git checks out the midpoint — test it, then:
git bisect good   # if this commit is fine
git bisect bad    # if this commit has the bug

# Repeat until Git announces the first bad commit

git bisect reset  # return to HEAD when done
```

Automated version (if you have a test script):
```bash
git bisect run bash -c 'npm test 2>/dev/null; exit $?'
```
