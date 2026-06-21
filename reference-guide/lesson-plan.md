# Lesson Plan

Two full days. Each session is 90 minutes.

> This document is for planning only — none of these labels appear in the participant-facing materials.

---

## Day 1 — Foundations to Collaboration (Block A)

### Session 1 (90 min) — How Git Works
| Time | Activity |
|------|----------|
| 0:00 | Welcome, repo clone, quick environment check |
| 0:10 | [docs/01 — Version Control Fundamentals](../docs/01-version-control-fundamentals.md) — walk through VCS history, centralized vs distributed diagram |
| 0:30 | [docs/02 — Git Architecture](../docs/02-git-architecture.md) — three areas (working/staging/local/remote), commit object internals |
| 0:55 | [Lab 01 — Version Control Setup](../labs/lab-01-version-control/README.md) — participants init, add, commit, push |
| 1:20 | Debrief: common errors (unrelated histories, PAT setup) |
| 1:30 | Break |

### Session 2 (90 min) — Branching
| Time | Activity |
|------|----------|
| 0:00 | [docs/03 — Git Branching](../docs/03-git-branching.md) — branch as a pointer, naming standards |
| 0:25 | [docs/04 — Branching Strategies](../docs/04-branching-strategies.md) — GitFlow vs GitHub Flow decision framework |
| 0:50 | [Lab 02 — Branching](../labs/lab-02-branching/README.md) — feature branch, restore from backup, merge --no-ff |
| 1:20 | Quick poll: which strategy fits their current/future workplace? |
| 1:30 | Break |

### Session 3 (90 min) — Merging & Collaboration
| Time | Activity |
|------|----------|
| 0:00 | [docs/05 — Merging & Rebasing](../docs/05-merging-and-rebasing.md) — fast-forward, 3-way, conflict markers, golden rule |
| 0:25 | [Lab 03 — Merge Conflicts](../labs/lab-03-merge-conflicts/README.md) — intentional conflict, resolution, abort |
| 0:55 | [docs/06 — Repository Collaboration](../docs/06-repository-collaboration.md) — forking workflow, upstream sync, PR lifecycle |
| 1:10 | [Lab 05 — Pull Requests](../labs/lab-05-pull-requests/README.md) (overview + step 1–4; full completion optional) |
| 1:30 | Break |

### Session 4 (90 min) — Rebase + Exercises
| Time | Activity |
|------|----------|
| 0:00 | [Lab 04 — Rebase](../labs/lab-04-rebase/README.md) — diverged history, interactive squash |
| 0:40 | [Beginner Exercises](../exercises/beginner/README.md) — ex-01 through ex-03 |
| 1:10 | [Mini-Project 01 — Team Collaboration](../mini-projects/project-01-team-collaboration/README.md) — overview and step 1 |
| 1:30 | End of Day 1 — wrap up, recap knowledge checks from docs/01–05 |

---

## Day 2 — Security, Advanced Operations & Deployment (Block B)

### Session 5 (90 min) — Security & Permissions
| Time | Activity |
|------|----------|
| 0:00 | [docs/07 — Repository Roles & Permissions](../docs/07-repository-roles-permissions.md) — GitHub/GitLab role tables, least privilege |
| 0:20 | [docs/08 — Branch Protection & Security](../docs/08-branch-protection-security.md) — CODEOWNERS, signed commits, GitHub Free limitation |
| 0:45 | [Lab 06 — Branch Protection](../labs/lab-06-branch-protection/README.md) — set up protection, test rejection, correct PR path |
| 1:20 | Discussion: which rules would you apply at your workplace? |
| 1:30 | Break |

### Session 6 (90 min) — Tags, Releases & Advanced Ops
| Time | Activity |
|------|----------|
| 0:00 | [docs/09 — Tags & Releases](../docs/09-tags-and-releases.md) — annotated vs lightweight, SemVer, GitHub Releases |
| 0:20 | [Lab 07 — Tags & Releases](../labs/lab-07-tags-releases/README.md) — tag, push, gh release create |
| 0:50 | [docs/10 — Advanced Git Operations](../docs/10-advanced-git-operations.md) — cherry-pick, stash, reset, bisect |
| 1:10 | [Lab 08 — Stash, Reset, Revert](../labs/lab-08-stash-reset-revert/README.md) — Part A + B |
| 1:30 | Break |

### Session 7 (90 min) — History & Best Practices
| Time | Activity |
|------|----------|
| 0:00 | [docs/11 — History Management](../docs/11-history-management.md) — reflog, squash, removing secrets |
| 0:25 | [Lab 09 — History & Recovery](../labs/lab-09-history-recovery/README.md) — reflog + bisect |
| 1:00 | [docs/12 — Git Best Practices](../docs/12-git-best-practices.md) — conventional commits, .gitignore, security rules |
| 1:20 | Intermediate + Advanced Exercises (pick one based on pace) |
| 1:30 | Break |

### Session 8 (90 min) — Deployment & Wrap-Up
| Time | Activity |
|------|----------|
| 0:00 | [docs/13 — Deployment](../docs/13-deployment.md) — Render static + web service, rollback |
| 0:20 | [Lab 10 — Deployment](../labs/lab-10-deployment/README.md) — deploy company-website to Render |
| 0:55 | [Mini-Project 02](../mini-projects/project-02-release-management/README.md) or [Mini-Project 03](../mini-projects/project-03-gitflow-simulation/README.md) — participant choice |
| 1:15 | Assessment briefing — point to [assessments/](../assessments/README.md) |
| 1:25 | Closing: Q&A, recap of the ten golden rules |
| 1:30 | End |

---

## Homework / Self-Study Recommendations

After Day 1:
- Complete Lab 05 (Pull Requests) fully on your own fork
- Finish Mini-Project 01

After Day 2:
- Take the 50-question quiz
- Attempt the practical assessment scenarios
- Deploy the ecommerce-app to Render as the Lab 10 challenge task

---

## Time Budget Summary

| Block | Sessions | Labs | Docs | Exercises |
|-------|----------|------|------|-----------|
| Day 1 (Block A) | 4 × 90 min | 01–04 (+ start 05) | 01–06 | Beginner |
| Day 2 (Block B) | 4 × 90 min | 05–10 | 07–13 | Intermediate + Advanced |
