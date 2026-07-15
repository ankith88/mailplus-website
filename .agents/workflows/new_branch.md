# New Branch Workflow

This workflow automates the process of creating a new git branch from the latest production main branch while preserving any local changes.

## Usage

This workflow accepts one argument:
- `{{args.[0]}}`: The name of the new branch to create.

## Steps

1. **Stash current changes** to ensure a clean working directory:
   ```bash
   git stash
   ```

2. **Switch to the production main branch**:
   ```bash
   git checkout main
   ```

3. **Fetch and pull the latest code**:
   ```bash
   git pull
   ```

4. **Switch to a new branch** using the provided argument:
   ```bash
   git checkout -b {{args.[0]}}
   ```
