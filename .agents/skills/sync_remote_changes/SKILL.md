---
name: sync_remote_changes
description: "Check for and pull incoming changes from GitHub to the local branch before starting local edits."
---

# Sync Remote Changes

Use this skill whenever you or the developer are about to start a new task or modify files, to ensure the local repository is up to date with any changes pushed by other developers on GitHub.

## Instructions

1. **Check for untracked or uncommitted local changes**:
   Run `git status` in the repository root to evaluate the state of local files.

2. **Fetch remote branch state**:
   Run `git fetch origin` to update tracking branches without altering working files.

3. **Check divergence count**:
   Run `git rev-list --count HEAD..origin/$(git branch --show-current)` to see how many commits the local branch is behind remote.

4. **Pull Remote Changes**:
   - If local branch is behind:
     - If local changes exist, run `git stash --include-untracked` first.
     - Run `git pull --rebase origin $(git branch --show-current)` to integrate incoming commits smoothly.
     - If stashed previously, run `git stash pop`.
   - If local branch is already up to date, inform the user and proceed with the task.

5. **Dependency Check**:
   If `package.json` or package lockfiles were updated in the pulled commits, execute `npm install` (or the corresponding package manager command) to sync dependencies.
