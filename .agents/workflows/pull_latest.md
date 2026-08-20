---
description: "Check for remote GitHub changes and safely pull them into local branch before editing"
---

# Pull Latest Workflow

This workflow automates checking for remote updates pushed by team members to GitHub, safely stashing uncommitted local work if needed, pulling remote changes into the current branch, and restoring local stashed work.

## Usage

Execute this workflow prior to making local code changes:
`/pull_latest`

## Steps

1. **Fetch remote branch updates** without modifying local working directory:
   ```bash
   git fetch origin
   ```

2. **Check working tree status**:
   - If local changes exist (modified or untracked files), stash them to prevent merge conflicts:
     ```bash
     git stash --include-untracked
     ```

3. **Pull remote changes into current branch**:
   ```bash
   BRANCH_NAME=$(git branch --show-current)
   git pull --rebase origin "$BRANCH_NAME"
   ```

4. **Restore stashed local changes** (if changes were stashed in step 2):
   ```bash
   git stash pop
   ```

5. **Verify dependency updates**:
   - If `package.json` or lockfiles changed, run `npm install` to keep dependencies in sync.
