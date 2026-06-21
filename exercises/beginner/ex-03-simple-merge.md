# Exercise 03 — Simple Merge

## Scenario

Your team is working on a product landing page. You branch off to add a pricing section while a teammate (simulated by you committing to `main` directly) adds a footer. Both changes need to land in `main` without losing either.

---

## Tasks

### Task 1
Start from a repo with this `index.html` on `main`:

```html
<!DOCTYPE html>
<html>
<body>
  <h1>Our Product</h1>
  <p>The best solution for your needs.</p>
</body>
</html>
```

Commit it as `feat: add landing page`.

### Task 2
Create branch `feature/pricing`. Add a `<section id="pricing"><h2>Pricing</h2><p>$9/month</p></section>` to `index.html` after the paragraph. Commit: `feat: add pricing section`.

### Task 3
Back on `main`, add `<footer><p>© 2025 Our Company</p></footer>` to `index.html` before `</body>`. Commit: `feat: add footer`.

### Task 4
Merge `feature/pricing` into `main` using `--no-ff`. Resolve any conflicts (the changes are in different parts of the file, so there may not be one).

### Task 5
Verify `index.html` on `main` contains **both** the pricing section AND the footer.

### Task 6
View `git log --oneline --graph`. Identify the merge commit and its two parent commits.

### Task 7
Push to GitHub and verify the commit graph is visible on GitHub's commit history page.

---

## Validation Checklist

- [ ] `grep -c "pricing" index.html` returns `1`
- [ ] `grep -c "footer" index.html` returns `1`
- [ ] `git log --oneline --graph` shows a merge commit with two parents
- [ ] `git branch` shows only `main`

---

## Hints

- `git merge --no-ff feature/pricing -m "feat: merge pricing section"`
- `git log --oneline --graph --all`

Check your answers: [answers/exercise-solutions/](../../answers/exercise-solutions/)
