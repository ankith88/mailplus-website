---
name: push_changes
description: "Commit and push all local changes in the current workspace to the remote repository."
---
# Push Changes

This skill automates staging, committing, and pushing all local changes in the current repository.

## Instructions
1. Run `git status` in the repository root to see if there are any changes (modified, deleted, or untracked files).
2. If there are no changes to commit, inform the user and stop.
3. Stage all local changes by running `git add .`.
4. Create a concise, descriptive commit message based on the changed files and the nature of the edits.
5. Commit the staged changes using `git commit -m "<commit_message>"`.
6. Determine the current branch name, then push the commits to the remote repository (e.g., `git push origin <branch>`).
7. Provide a brief summary of the files committed and the success of the push command to the user.
