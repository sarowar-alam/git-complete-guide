# Exercise 01 — Interactive Rebase

## Scenario

You've been working on a feature for two days. Your commit history is a mess of WIP saves, typo fixes, and experimental changes. Before opening the PR, clean it up so it tells a clear story.

---

## Tasks

### Task 1
Create a repo and branch `feature/checkout-flow` with **exactly these 8 commits** (in this order):

```
1. WIP saving progress
2. add cart total calculation
3. fix: oops forgot to import
4. more cart stuff
5. add shipping calculator
6. fix typo in variable name
7. fix: shipping calc edge case
8. feat: finalize checkout flow
```

Create one file (`checkout.js`) and modify it for each commit. Content can be anything as long as the file changes each time.

### Task 2
Use `git rebase -i HEAD~8` to transform those 8 commits into **3 clean commits**:

```
feat: add cart total calculation
feat: add shipping calculator
feat: finalize checkout flow
```

Rules:
- `pick` the first commit for each feature, `squash` or `fixup` the related ones into it
- `drop` any commit that is purely a WIP save with no meaningful content

### Task 3
After the interactive rebase, verify:
- `git log --oneline | wc -l` shows 3 (just your 3 clean feature commits from the branch)
- No "WIP", "typo", "oops", or "fix:" messages in the log
- The actual file changes from all 8 commits are still present

### Task 4
Use `git rebase -i HEAD~3` again to **reorder** the commits so `feat: finalize checkout flow` comes last (it should already be last — this is practice with reordering).

### Task 5
Use `git rebase -i HEAD~1` to **reword** the last commit message to include the ticket number: `feat: finalize checkout flow [TICKET-42]`.

---

## Validation Checklist

- [ ] `git log --oneline` shows exactly 3 commits (no more)
- [ ] None of the commit messages contain "WIP", "oops", "typo", or "fix:"
- [ ] All file changes from the original 8 commits are present in `checkout.js`
- [ ] Last commit message contains `[TICKET-42]`

Check your answers: [answers/exercise-solutions/](../../answers/exercise-solutions/)
