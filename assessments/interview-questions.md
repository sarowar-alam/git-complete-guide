# Interview Questions

20 questions covering Git concepts, strategies, and real-world problem solving.

Suggested answers: [answers/assessment-solutions/interview-answers.md](../answers/assessment-solutions/interview-answers.md)

---

## Conceptual Questions

**1.** Explain the difference between Git and GitHub in one clear sentence each.

**2.** Walk me through what happens internally when you run `git commit`. What objects does Git create?

**3.** What is a detached HEAD state? When does it happen, and is it always a problem?

**4.** Why does rebasing change commit SHAs? What consequences does that have for shared branches?

**5.** What's the difference between `git merge --ff`, `git merge --no-ff`, and `git merge --squash`? When would you choose each?

---

## Strategy Questions

**6.** Your team is building a SaaS product with continuous deployment. Which branching strategy would you recommend and why? What would you NOT use and why?

**7.** You're the first engineer at a startup. The codebase has no Git workflow. Five developers will join next month. Design a simple, scalable Git workflow and explain each component.

**8.** How do you ensure sensitive data (API keys, passwords) never enters the Git history?

**9.** When would you recommend `git rebase` over `git merge`? Are there situations where merge is always better?

**10.** What is trunk-based development? What team size and culture does it suit?

---

## Problem-Solving Questions

**11.** A critical bug was introduced somewhere in the last 200 commits. The repo has a known-good tag three weeks ago. Walk me through the exact process of finding the bad commit.

**12.** You need to deploy a bug fix to production immediately, but `develop` has 15 half-finished features. Walk through your approach using GitFlow.

**13.** Two developers both modified `src/auth.js` in their respective branches. Both branches need to merge into `main`. What's your plan to avoid or resolve conflicts cleanly?

**14.** A new developer pushed their SSH private key to GitHub. The commit has been there for two hours and the repo is public. What do you do in the next 10 minutes?

**15.** Your team's PR review cycle takes 3–4 days and is blocking developers. What Git-related and process-related changes would you propose?

---

## Command & Configuration Questions

**16.** What does `git reflog` show that `git log` doesn't? Give a specific recovery scenario.

**17.** Explain `git cherry-pick`. When is it the right tool? What are its risks?

**18.** What is a `CODEOWNERS` file? Where does it live and what does it do automatically?

**19.** You're setting up a new repository for a team of 8. List five `.gitignore` entries that should almost certainly be in every project and why.

**20.** What is `git stash`? Give a real-world scenario where it solves a specific problem. What's the difference between `stash pop` and `stash apply`?

---

*Answers: [answers/assessment-solutions/interview-answers.md](../answers/assessment-solutions/interview-answers.md)*
