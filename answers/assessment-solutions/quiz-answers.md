# Quiz Answer Key

| Q | Answer | Q | Answer | Q | Answer | Q | Answer | Q | Answer |
|---|--------|---|--------|---|--------|---|--------|---|--------|
| 1 | B | 11 | C | 21 | C | 31 | B | 41 | B |
| 2 | C | 12 | B | 22 | B | 32 | B | 42 | B |
| 3 | B | 13 | A | 23 | C | 33 | B | 43 | C |
| 4 | C | 14 | C | 24 | B | 34 | B | 44 | B |
| 5 | B | 15 | B | 25 | B | 35 | B | 45 | B |
| 6 | C | 16 | B | 26 | C | 36 | C | 46 | A |
| 7 | B | 17 | B | 27 | B | 37 | C | 47 | C |
| 8 | C | 18 | B | 28 | B | 38 | C | 48 | B |
| 9 | B | 19 | C | 29 | C | 39 | B | 49 | C |
| 10 | C | 20 | B | 30 | C | 40 | B | 50 | C |

---

## Explanations for Tricky Questions

**Q2 (C — Perforce):** Perforce (Helix Core) is dominant in AAA game studios for handling large binary assets (textures, 3D models) better than Git.

**Q12 (B):** A Git branch is physically just a file in `.git/refs/heads/` containing the 40-character SHA of its latest commit.

**Q13 (A):** `git fetch` downloads but does NOT merge. You merge separately with `git merge` or `git pull` does both in one step.

**Q25 (B):** GitHub Flow (one branch per feature, deploy from `main`) or Trunk-Based Development work for high-frequency deployment. GitFlow's release branches create too much overhead.

**Q34 (B):** `--force-with-lease` checks whether the remote ref matches what you last fetched. If someone else pushed, the push fails — preventing you from overwriting their work.

**Q38 (C):** GitHub Free only supports branch protection on public repositories. To protect branches on private repos, you need GitHub Team ($4/user/month) or GitHub Enterprise.

**Q49 (C):** Binary search of 1024 = $\log_2(1024) = 10$. Each bisect step eliminates half the remaining commits.
