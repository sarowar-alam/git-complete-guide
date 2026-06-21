# Project 02 — Release Management

You'll take the `company-website` sample project through a complete release lifecycle: semantic versioning, tagged releases, a GitHub Release with notes, and a live deployment on Render that auto-updates on every push.

---

## The Scenario

**Nexus Tools** from Project 01 is ready for launch. You need to:
1. Ship v1.0.0 as the first production release
2. Add a quick improvement → v1.1.0 (minor release)
3. Fix a critical bug in production → v1.1.1 (patch release)
4. Each version should be live on Render automatically

---

## Prerequisites

- Completed Project 01 (or have the `nexus-tools-website` repo)
- Render free account
- GitHub CLI (`gh`) installed

---

## Phase 1 — First Production Release (v1.0.0)

```bash
cd nexus-tools-website
git switch main
git pull origin main

# Make sure everything looks good
cat index.html
```

Create a `CHANGELOG.md`:

```bash
cat > CHANGELOG.md << 'EOF'
# Changelog

## [1.0.0] - 2025-06-21

### Added
- Hero section with CTA button
- Features section with three key benefits
- Footer with legal links

### Notes
- First public release of Nexus Tools marketing website
EOF

git add CHANGELOG.md
git commit -m "docs: add changelog for v1.0.0"
```

Tag the release:

```bash
git tag -a v1.0.0 -m "First production release

Full marketing website with hero, features, and footer sections."

git push origin main --follow-tags
```

Create the GitHub Release:

```bash
gh release create v1.0.0 \
  --title "v1.0.0 — Launch Release" \
  --notes-file CHANGELOG.md
```

---

## Phase 2 — Connect to Render

1. Go to [dashboard.render.com](https://dashboard.render.com)
2. **New** → **Static Site** → connect `nexus-tools-website`
3. Settings:
   - Branch: `main`
   - Publish directory: `.`
4. Create and wait for deployment

Your site is now live. Every push to `main` = automatic redeploy.

---

## Phase 3 — Minor Release (v1.1.0)

Add a navigation bar — a new feature, backward-compatible:

```bash
git switch -c feature/navigation
```

Add after `<body>` in `index.html`:
```html
<nav class="main-nav">
  <div class="nav-brand">Nexus Tools</div>
  <ul>
    <li><a href="#features">Features</a></li>
    <li><a href="#footer">Contact</a></li>
    <li><a href="/demo" class="btn-nav">Request Demo</a></li>
  </ul>
</nav>
```

Add to `styles/main.css`:
```css
.main-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  background: #0f3460;
  color: white;
}
.main-nav ul { list-style: none; display: flex; gap: 24px; }
.main-nav a { color: white; text-decoration: none; }
```

```bash
git add .
git commit -m "feat: add main navigation bar"
git push origin feature/navigation
# Open PR → merge → delete branch

git switch main
git pull origin main
```

Update changelog and tag:

```bash
cat >> CHANGELOG.md << 'EOF'

## [1.1.0] - 2025-06-21

### Added
- Main navigation bar with brand logo and links
EOF

git add CHANGELOG.md
git commit -m "docs: update changelog for v1.1.0"
git tag -a v1.1.0 -m "Add main navigation"
git push origin main --follow-tags

gh release create v1.1.0 --title "v1.1.0 — Navigation" \
  --notes "## Added\n- Main navigation bar with brand and CTA links"
```

Watch Render automatically redeploy.

---

## Phase 4 — Patch Release (v1.1.1)

A bug report: the CTA button on the hero section is the wrong color on mobile.

```bash
git switch -c hotfix/cta-mobile-color
```

Fix in `styles/main.css` — add:
```css
@media (max-width: 600px) {
  .btn { background: #c73652; display: block; margin: 16px auto; }
}
```

```bash
git add styles/main.css
git commit -m "fix: correct CTA button color on mobile viewports"

git push origin hotfix/cta-mobile-color
# PR → merge → delete branch

git switch main
git pull origin main
```

```bash
cat >> CHANGELOG.md << 'EOF'

## [1.1.1] - 2025-06-21

### Fixed
- CTA button color incorrect on mobile (< 600px viewports)
EOF

git add CHANGELOG.md
git commit -m "docs: update changelog for v1.1.1"
git tag -a v1.1.1 -m "Fix mobile CTA button color"
git push origin main --follow-tags

gh release create v1.1.1 --title "v1.1.1 — Mobile Fix" \
  --notes "## Fixed\n- CTA button color on mobile viewports"
```

---

## Final Validation

```bash
# All three tags exist
git tag
# v1.0.0, v1.1.0, v1.1.1

# Each one on GitHub
git ls-remote --tags origin

# CHANGELOG.md has all three entries
grep "^\[1\." CHANGELOG.md | wc -l
# 3

# Render shows the latest deployment
# Your live site URL: https://nexus-tools-website-xxxx.onrender.com
```

---

## What You Practiced

- Semantic versioning (major/minor/patch)
- Annotated tags and GitHub Releases
- Git-based deployment with Render
- Auto-deploy on push
- Hotfix workflow for production issues
- `CHANGELOG.md` maintenance

---

Back to [mini-projects](../README.md) · Next: [Project 03 →](../project-03-gitflow-simulation/README.md)
