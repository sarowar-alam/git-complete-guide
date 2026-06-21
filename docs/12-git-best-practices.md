# Git Best Practices

The difference between a repository that's a pleasure to work in and one that's a nightmare is almost entirely habits. These practices won't be enforced by Git — they're things your team agrees on and then does consistently.

---

## Commit Standards

### Write Meaningful Commit Messages

A commit message is a note to your future self (and your teammates). Six months from now, `git log` should tell a story.

**The Conventional Commits format:**

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

| Type | When to use |
|------|------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no logic change |
| `refactor` | Code change that isn't a fix or feature |
| `test` | Adding or fixing tests |
| `chore` | Build process, dependency updates |
| `revert` | Reverts a previous commit |

**Examples:**

```bash
# Good
git commit -m "feat(auth): add JWT token refresh logic"
git commit -m "fix(cart): prevent negative quantity on item removal"
git commit -m "docs(readme): update deployment instructions for Render"
git commit -m "chore: upgrade Express from 4.18 to 4.19"

# Bad
git commit -m "fix"
git commit -m "changes"
git commit -m "asdfgh"
git commit -m "WIP"   # ← acceptable locally, never merge to main
```

### Commit Small, Commit Often

Each commit should represent one logical change. If you need "and" in your commit message, you probably have two commits.

```bash
# Bad — two unrelated things in one commit
git commit -m "fix login bug and update README"

# Good — separate commits
git commit -m "fix(auth): resolve session expiry on login"
git commit -m "docs(readme): add SSH setup instructions"
```

### What Not to Commit

```bash
# Use .gitignore to keep these out:

# Dependencies
node_modules/
vendor/
.venv/

# Build output
dist/
build/
*.pyc
*.class

# Environment / secrets
.env
.env.local
.env.production
*.pem
*.key

# OS files
.DS_Store
Thumbs.db

# Editor files
.vscode/settings.json
.idea/
*.swp
```

Always check `git status` before committing. Never commit secrets.

---

## Branch Naming Standards

```
feature/<ticket-or-description>     feature/PROJ-123-user-login
fix/<ticket-or-description>         fix/PROJ-456-cart-empty-bug
hotfix/<description>                hotfix/payment-null-pointer
release/<version>                   release/v2.1.0
chore/<description>                 chore/upgrade-dependencies
experiment/<description>            experiment/ai-product-search
```

**Rules:**
- Lowercase only
- Hyphens between words (no underscores, no spaces)
- Include ticket/issue number if your team uses a tracker
- Keep it short enough to read in `git branch -a` output

---

## Pull Request Standards

A good PR makes the reviewer's job easy. They should understand what changed and why without having to read every line of code.

**PR Title:** same format as a commit message  
`feat(auth): add OAuth2 Google login`

**PR Description template:**

```markdown
## What changed
Brief description of the change and why it was needed.

## How to test
1. Go to the login page
2. Click "Sign in with Google"
3. Verify you're redirected to Google OAuth
4. Verify you're redirected back and logged in

## Screenshots
[attach if UI changed]

## Checklist
- [ ] Tests pass locally
- [ ] No console errors
- [ ] Docs updated if needed
```

**PR size:** keep PRs small. A PR over 400 changed lines is hard to review properly. Break large features into multiple PRs if possible.

---

## Code Review Standards

When reviewing:
- **Be specific** — "This function will break if `user` is null" not "This is wrong"
- **Suggest, don't demand** — Use GitHub's Suggestion feature to propose exact changes
- **Approve fast** — don't let PRs sit for days
- **Focus on correctness and clarity** — not style (that's what linters are for)

When receiving a review:
- Don't take it personally — reviewers are reviewing code, not you
- Respond to every comment, even if just "Done" or "Disagree because..."
- Push fixes in additional commits during review, then squash before merge

---

## Repository Governance

### Protect Important Branches

```
main:     no direct push, require 1 review, require CI pass
develop:  no direct push, require 1 review
release/* require 2 reviews, require CI pass
```

### Keep Dependencies Updated

Outdated dependencies are a security risk. Check them regularly:

```bash
# Node.js
npm audit
npm outdated

# Python
pip list --outdated
safety check
```

### Use `.gitattributes` for Consistency

`.gitattributes` ensures everyone handles line endings and file types the same way regardless of OS:

```
# .gitattributes
* text=auto eol=lf
*.sh text eol=lf
*.bat text eol=crlf
*.png binary
*.jpg binary
*.pdf binary
```

---

## Security Best Practices

1. **Never commit secrets** — API keys, passwords, tokens, certificates
2. **Use `.gitignore`** for sensitive files before the first commit
3. **Scan before push** — use tools like `git-secrets` or `truffleHog`
4. **Rotate credentials immediately** if they're ever committed accidentally
5. **Use fine-grained PATs** for CI/CD — scoped to specific repos and minimum permissions
6. **Enable secret scanning** on GitHub (available on public repos for free)
7. **Sign your commits** with GPG for high-security repos
8. **Audit your collaborators list** regularly — remove people who no longer need access

---

## The Golden Rules Summary

```
1. Commit often, push often — don't sit on local work for days
2. One commit = one logical change
3. Write commit messages for your 6-months-future self
4. Never force-push to shared branches
5. Never commit secrets — not even "just temporarily"
6. Always pull before you push
7. Keep branches short-lived — merge within days, not weeks
8. Broken main = everyone's problem — fix it immediately
9. Review your own PR before requesting a review
10. Delete merged branches — they're just clutter
```

---

## Knowledge Check

1. Your commit message is `"fix stuff"`. Why is this a problem and what should it say instead?
2. You accidentally committed your `.env` file with API keys. What are the two things you must do immediately?
3. A PR has 1,200 changed lines across 15 files. What's the problem with this?
4. You're on Windows and your teammate is on macOS. Their `.gitattributes` sets `eol=lf`. Why does this matter?
5. Your CI/CD pipeline needs a GitHub token. Should you use your personal access token or create a dedicated one? Why?

---

Previous: [History Management →](11-history-management.md)
Next: [Deploying with Git →](13-deployment.md)
