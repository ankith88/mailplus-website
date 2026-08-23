# Repository Guidelines & Rules

## 🚨 MANDATORY: Pull Latest Changes from GitHub Before Edits

Before making **ANY** local changes, file creations, or code updates in this repository, you MUST ALWAYS check for and pull incoming changes from GitHub:

1. Run `git fetch origin` and `git status`.
2. If remote changes exist:
   - Stash any local uncommitted work if present (`git stash --include-untracked`).
   - Rebase on top of origin (`git pull --rebase origin $(git branch --show-current)`).
   - Restore stashed changes (`git stash pop`).
   - Run `npm install` if dependency manifests changed.
3. Only proceed with local code modifications after the branch is up to date with remote.
