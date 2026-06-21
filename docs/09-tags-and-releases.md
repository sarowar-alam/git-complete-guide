# Tags & Releases

Tags mark specific points in history as significant — typically a version release. Unlike branches, tags don't move. Once you tag a commit, that tag permanently points to it.

---

## Lightweight Tags

A lightweight tag is just a pointer to a commit — like a branch that never moves.

```bash
# Create a lightweight tag at the current commit
git tag v1.0.0

# Create a tag at a specific commit
git tag v0.9.0 abc123def

# List all tags
git tag
git tag -l "v1.*"    # filter by pattern

# See what commit a tag points to
git show v1.0.0
```

---

## Annotated Tags

Annotated tags are full objects in the Git database. They store the tagger's name, email, date, and a message — making them suitable for releases.

```bash
# Create an annotated tag
git tag -a v1.0.0 -m "First stable release"

# Create an annotated tag at a specific commit
git tag -a v1.0.0 abc123def -m "First stable release"

# See the full tag object
git show v1.0.0
# → tag v1.0.0
# → Tagger: Sarowar Alam <sarowar@example.com>
# → Date: Sat Jun 21 12:00:00 2025 +0600
# → First stable release
# → commit abc123def...
```

**Use annotated tags for releases** — they carry metadata that tools like `git describe` and GitHub Releases use.

---

## Pushing Tags to GitHub

Tags are not pushed by default when you run `git push`. You have to push them explicitly.

```bash
# Push a single tag
git push origin v1.0.0

# Push all tags at once
git push origin --tags

# Push all annotated tags (excludes lightweight)
git push origin --follow-tags
```

---

## Semantic Versioning (SemVer)

The standard versioning scheme for software releases. Version numbers follow the format `MAJOR.MINOR.PATCH`:

| Part | Bump when... | Example |
|------|-------------|---------|
| MAJOR | Breaking change — existing users must update their code | `1.x.x → 2.0.0` |
| MINOR | New feature added, backward-compatible | `1.2.x → 1.3.0` |
| PATCH | Bug fix, backward-compatible | `1.2.3 → 1.2.4` |

Pre-release versions:
```
1.0.0-alpha    early testing, unstable
1.0.0-beta     feature complete, may have bugs
1.0.0-rc.1     release candidate, close to stable
1.0.0          stable release
```

---

## Deleting Tags

```bash
# Delete a local tag
git tag -d v1.0.0-beta

# Delete a tag on the remote
git push origin --delete v1.0.0-beta
# or
git push origin :refs/tags/v1.0.0-beta
```

---

## Creating a GitHub Release

A GitHub Release is built on top of a tag. It adds release notes, attached binary files (build artifacts), and a changelog — visible on the GitHub Releases page.

### Via GitHub UI

1. Go to your repository → **Releases** → **Draft a new release**
2. Choose your tag (or create a new one)
3. Set the release title: `v1.0.0 — Initial Release`
4. Write release notes describing what changed
5. Mark as **pre-release** if it's a beta/rc
6. Click **Publish release**

> 📸 Screenshot: GitHub release drafting page with tag selector, title field, release notes editor, and pre-release checkbox

### Via GitHub CLI

```bash
# Install GitHub CLI: https://cli.github.com
gh release create v1.0.0 \
  --title "v1.0.0 — Initial Release" \
  --notes "First stable release. Includes user auth, product listing, and cart."

# Create from a notes file
gh release create v1.1.0 --notes-file CHANGELOG.md

# Upload build artifacts with the release
gh release create v1.0.0 \
  --title "v1.0.0" \
  ./dist/app-linux.tar.gz \
  ./dist/app-windows.zip
```

---

## Checking Out a Tag

To inspect the code at a specific tag:

```bash
git checkout v1.0.0
# You're now in "detached HEAD" state
# HEAD is not on a branch — it points directly to the commit

# To make changes, create a branch from this point
git checkout -b hotfix/v1.0.1 v1.0.0
```

---

## `git describe` — Finding the Nearest Tag

```bash
git describe
# → v1.0.0-3-gabc123d
#   v1.0.0 = nearest tag
#   3 = commits since that tag
#   gabc123d = abbreviated commit hash (g = git prefix)

git describe --tags --abbrev=0
# → v1.0.0   (just the tag name)
```

Useful in CI/CD pipelines to auto-generate build version strings.

---

## Knowledge Check

1. What's the difference between a lightweight and an annotated tag?
2. You run `git push origin main`. Do your tags get pushed? What do you need to run?
3. You release version 1.4.2. You then find a critical security bug and fix it without adding any new features. What's the next version number?
4. What does "detached HEAD" mean when you check out a tag?
5. Your CI pipeline needs to know the current version. What command gives you the nearest tag?

---

Previous: [Branch Protection & Security →](08-branch-protection-security.md)
Next: [Advanced Git Operations →](10-advanced-git-operations.md)
