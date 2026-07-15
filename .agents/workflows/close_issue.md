---
description: "Stage, commit with an issue reference, and push to close an issue"
---

# Close Issue Workflow

This workflow automates staging modified files, committing them with a message that closes a specific issue, and pushing the active branch upstream.

## Usage

This workflow accepts two arguments:
- `{{args.[0]}}`: The issue number to be closed (e.g., `123`).
- `{{args.[1]}}`: The custom commit message description (e.g., `Fix user session timeout bug`).

## Steps

1. **Stage all changes**:
   ```bash
   git add -A
   ```

2. **Commit changes** with the custom description and closing issue reference:
   ```bash
   git commit -m "{{args.[1]}} (closes #{{args.[0]}})"
   ```

3. **Push the active local branch** upstream:
   ```bash
   git push origin $(git branch --show-current)
   ```
