# Repository Roles & Permissions

Every Git hosting platform has a permission model that controls who can read, write, review, and administer a repository. Getting this right matters — too open and anyone can overwrite production, too restrictive and your team can't get work done.

---

## GitHub Roles

GitHub uses five repository-level roles. These apply to both personal and organization repositories.

| Role | Read | Clone | Open Issues | Push Code | Merge PRs | Manage Settings | Delete Repo |
|------|------|-------|-------------|-----------|-----------|-----------------|-------------|
| **Read** | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| **Triage** | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| **Write** | ✓ | ✓ | ✓ | ✓ | ✓* | ✗ | ✗ |
| **Maintain** | ✓ | ✓ | ✓ | ✓ | ✓ | Partial | ✗ |
| **Admin** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

*Write role can merge PRs unless branch protection rules restrict it.

### Read

Someone with Read access can view and clone the repository. They can open issues and comment on PRs, but they can't push any code.

**Use for:** external stakeholders, clients who need visibility, security auditors.

### Triage

Everything Read can do, plus managing labels, milestones, and assigning/closing issues and PRs — but no code push.

**Use for:** project managers, QA who manage the issue backlog but don't write code.

### Write

Full read access plus the ability to push branches, create PRs, and merge them (unless branch protection restricts this). This is the standard role for developers.

**Use for:** developers on the team.

### Maintain

Everything Write can do, plus managing repository settings like webhooks, branch protection (but not security settings), and pushing to protected branches.

**Use for:** tech leads, senior engineers who need to manage the repo but shouldn't be able to delete it.

### Admin

Full control — everything Maintain can do, plus managing security settings, adding/removing collaborators, and deleting the repository.

**Use for:** repository owners, DevOps engineers managing the infrastructure of a repo.

---

## Setting Roles on GitHub

### Personal Repository (your own repo)

```
Repo → Settings → Collaborators → Add people
→ Choose their permission level
```

> 📸 Screenshot: GitHub repo Settings → Collaborators page with the Add people button and permission dropdown

### Organization Repository

```
Organization → Settings → Teams → Create team
→ Add members to team
→ Assign team to repository with a role
```

Organizations let you manage roles at team level rather than individual level — much cleaner at scale.

---

## GitLab Roles

GitLab uses a five-level system at both project (repo) and group level:

| Role | Can push | Can merge | Can manage settings | Can delete |
|------|----------|-----------|--------------------|-----------| 
| **Guest** | ✗ | ✗ | ✗ | ✗ |
| **Reporter** | ✗ | ✗ | ✗ | ✗ |
| **Developer** | ✓ (non-protected) | ✓ (non-protected) | ✗ | ✗ |
| **Maintainer** | ✓ | ✓ | ✓ | ✗ |
| **Owner** | ✓ | ✓ | ✓ | ✓ |

GitLab's **Developer** role is roughly equivalent to GitHub's **Write** role. GitLab's **Maintainer** maps roughly to GitHub's **Admin** (minus account-level settings).

---

## Bitbucket Roles

Bitbucket Workspace uses three project-level roles:

| Role | Equivalent |
|------|-----------|
| **Read** | GitHub Read |
| **Write** | GitHub Write |
| **Admin** | GitHub Admin |

For repositories, Bitbucket maps these through project permissions. Direct repository permissions are also available but project-level is the recommended approach.

---

## Least Privilege Principle

Always assign the minimum permission level someone needs to do their job.

**Practical examples:**
- Intern joining the team → **Write** (can push code, can't change settings)
- QA engineer → **Triage** (manages issues, can't touch code)
- External contractor → **Read** (reviews code, can't push)
- DevOps setting up webhooks → **Admin** on the infra repos they own
- CI/CD bot account → **Write** on specific repos only (use a fine-grained personal access token scoped to those repos)

---

## Service Accounts & Tokens

When your CI/CD pipeline (GitHub Actions, Jenkins, etc.) needs to push or read from a repository, don't use a personal account's credentials. Use a:

- **GitHub Actions built-in `GITHUB_TOKEN`** — automatically generated per workflow run, scoped to the repo, expires after the run
- **Fine-grained personal access token** — scoped to specific repos and specific permissions (read/write code, read/write issues, etc.)
- **Deploy key** — SSH key attached to a single repository, read-only or read-write

```bash
# Example: fine-grained PAT in a CI script
# Store as a GitHub Actions secret called DEPLOY_TOKEN
git remote set-url origin https://x-access-token:${{ secrets.DEPLOY_TOKEN }}@github.com/you/repo.git
git push
```

---

## Knowledge Check

1. Your team adds a designer who needs to clone the repo and leave comments on PRs. What role should they get?
2. What's the difference between **Maintain** and **Admin** on GitHub?
3. Your CI/CD pipeline needs to push built artifacts to a GitHub repository. What credential approach should you use and why?
4. On GitLab, a **Developer** tries to push directly to a protected branch. What happens?
5. Why is it a bad idea to give every team member Admin access?

---

Previous: [Repository Collaboration →](06-repository-collaboration.md)
Next: [Branch Protection & Security →](08-branch-protection-security.md)
