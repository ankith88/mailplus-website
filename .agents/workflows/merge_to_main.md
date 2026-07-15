---
description: "Merge active branch to main and push to remote"
---

# Merge to Main Workflow

This workflow automates safely merging the active development branch into the `main` branch, pushing the changes to GitHub with a commit message referencing an issue to trigger closing hooks, and leaving the local environment clean on the `main` branch.

## Usage

This workflow accepts one argument:
- `{{args.[0]}}`: The issue number to be closed (e.g., `123`).

## Steps

1. **Stash current changes** to ensure a clean working directory before switching branches:
   ```bash
   git stash
   ```

2. **Identify and save the active development branch name**:
   ```bash
   DEVELOPMENT_BRANCH=$(git branch --show-current)
   ```

3. **Switch to the main branch**:
   ```bash
   git checkout main
   ```

4. **Pull the latest changes** from the remote repository:
   ```bash
   git pull origin main
   ```

5. **Merge the development branch into main** with a merge commit message that triggers the GitHub closing hooks:
   ```bash
   git merge "$DEVELOPMENT_BRANCH" --no-ff -m "Merge branch '$DEVELOPMENT_BRANCH' (closes #{{args.[0]}})"
   ```

6. **Push the merged main branch** to the remote repository:
   ```bash
   git push origin main
   ```

7. **Clean up the local development branch** (optional, but recommended to keep the environment clean):
   ```bash
   git branch -d "$DEVELOPMENT_BRANCH"
   ```
