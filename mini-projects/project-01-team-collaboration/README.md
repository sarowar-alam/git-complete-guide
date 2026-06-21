# Project 01 — Team Collaboration Simulation

You're going to simulate a 3-person team working on the same repository — with yourself playing all three roles. This teaches you how code review, conflicting work, and pull requests work at a team level.

---

## The Scenario

Your team is building a simple product page for a fictional startup called **Nexus Tools**. Three things need to happen in parallel:

- **Dev 1 (you):** Build the hero section of the homepage
- **Dev 2 (you again):** Build the features section
- **Dev 3 (you again):** Write the copy for the footer

All three submit pull requests. You review and merge them in sequence.

---

## Setup

```bash
# Create the project repo
mkdir nexus-tools-website
cd nexus-tools-website
git init

# Create the base file
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Nexus Tools</title>
  <link rel="stylesheet" href="styles/main.css">
</head>
<body>
  <!-- Hero section goes here -->
  <!-- Features section goes here -->
  <!-- Footer goes here -->
</body>
</html>
EOF

mkdir styles
echo "/* Nexus Tools Styles */" > styles/main.css

git add .
git commit -m "feat: initial project structure"

# Push to GitHub
gh repo create nexus-tools-website --public --push --source=.
```

---

## Instructions

### Round 1 — Dev 1: Hero Section

```bash
git switch -c feature/hero-section
```

Replace `<!-- Hero section goes here -->` in `index.html` with:
```html
<section class="hero">
  <h1>Build Better. Ship Faster.</h1>
  <p>Nexus Tools gives your team the power to deliver great software, every time.</p>
  <a href="#features" class="btn">See Features</a>
</section>
```

Add to `styles/main.css`:
```css
.hero {
  background: #1a1a2e;
  color: white;
  padding: 80px 40px;
  text-align: center;
}
.hero h1 { font-size: 2.5rem; }
.btn { background: #e94560; color: white; padding: 12px 24px; text-decoration: none; }
```

```bash
git add .
git commit -m "feat: add hero section with CTA button"
git push origin feature/hero-section
# Open a PR on GitHub: feature/hero-section → main
```

### Round 2 — Dev 2: Features Section

```bash
git switch main
git switch -c feature/features-section
```

Replace `<!-- Features section goes here -->` with:
```html
<section id="features" class="features">
  <h2>Why Nexus Tools?</h2>
  <div class="feature-grid">
    <div class="feature"><h3>Fast</h3><p>Deploy in seconds, not hours.</p></div>
    <div class="feature"><h3>Secure</h3><p>End-to-end encryption on everything.</p></div>
    <div class="feature"><h3>Scalable</h3><p>Grows with your team from 1 to 10,000.</p></div>
  </div>
</section>
```

```bash
git add .
git commit -m "feat: add features section with three benefits"
git push origin feature/features-section
# Open a PR on GitHub: feature/features-section → main
```

### Round 3 — Dev 3: Footer

```bash
git switch main
git switch -c feature/footer
```

Replace `<!-- Footer goes here -->` with:
```html
<footer>
  <p>&copy; 2025 Nexus Tools Inc. All rights reserved.</p>
  <nav>
    <a href="/privacy">Privacy</a>
    <a href="/terms">Terms</a>
    <a href="/contact">Contact</a>
  </nav>
</footer>
```

```bash
git add .
git commit -m "feat: add footer with legal links"
git push origin feature/footer
# Open a PR on GitHub: feature/footer → main
```

---

## Review & Merge Round

Now act as the team lead:

1. Go to GitHub and review each of the 3 open PRs
2. On each PR: look at the **Files changed** tab and leave at least one comment
3. Approve each PR
4. Merge them in order: hero → features → footer
5. If any PR shows "merge conflict" after the first merge, resolve it locally using rebase

```bash
# After each merge, pull main and rebase the next waiting branch
git switch main
git pull origin main

git switch feature/features-section
git rebase main
git push origin feature/features-section --force-with-lease
```

---

## Final Validation

```bash
git switch main
git pull origin main

# All three sections should be in index.html
grep -c "hero\|features\|footer" index.html
# Should return 3 (or more)

git log --oneline --graph
# Should show 3 merge commits, one per feature

git branch
# Only main remaining
```

---

## What You Practiced

- Running parallel feature branches
- Opening and reviewing pull requests
- Keeping branches in sync with rebase before merging
- Resolving conflicts from concurrent work
- The full GitHub Flow cycle: branch → push → PR → review → merge

---

Back to [mini-projects](../README.md) · Next: [Project 02 →](../project-02-release-management/README.md)
