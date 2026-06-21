# Exercise 01 — Conflict Resolution

## Scenario

Two developers both edited the same configuration file on separate branches. Now it's time to merge them. You'll play both developers.

---

## Tasks

### Task 1
Create a repo with this `config.json` on `main`:

```json
{
  "app_name": "MyApp",
  "version": "1.0.0",
  "port": 3000,
  "debug": false
}
```
Commit: `chore: add initial config`.

### Task 2
Create branch `feature/dev-settings`. Change `"port"` to `8080` and `"debug"` to `true`. Commit: `feat: use dev port and enable debug`.

### Task 3
Back on `main`, change `"port"` to `4000` and `"app_name"` to `"MyApp v2"`. Commit: `feat: update port for staging and rename app`.

### Task 4
Merge `feature/dev-settings` into `main`. You will get a conflict on the `port` field.

### Task 5
Open the conflicted file. Understand both sides. Resolve it so:
- `app_name` is `"MyApp v2"` (from main)
- `port` is `4000` (staging takes priority)
- `debug` is `true` (from feature branch)

### Task 6
Complete the merge with a descriptive merge commit message. Verify no conflict markers remain.

### Task 7
Add a `styles.css` file on two branches with a conflicting `background-color` property. Merge and resolve that conflict too.

---

## Validation Checklist

- [ ] `grep "<<<<<<" config.json` returns empty (no conflict markers)
- [ ] `cat config.json` shows all four fields with the resolved values
- [ ] `git log --oneline` shows a merge commit
- [ ] `git status` shows clean working tree

Check your answers: [answers/exercise-solutions/](../../answers/exercise-solutions/)
