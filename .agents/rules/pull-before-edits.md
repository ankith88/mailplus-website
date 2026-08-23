# Mandatory Rule: Pull Latest GitHub Changes Before Local Modifications

## Policy
Before attempting **ANY** local file edits, file creation, or code modifications, the agent **MUST ALWAYS** verify and pull incoming changes from GitHub to prevent merge conflicts and ensure work is built on top of the latest remote commit.

## Execution Steps Before Edits

1. **Fetch & Check Status**:
   - Run `git fetch origin` to retrieve remote ref updates.
   - Run `git status` to inspect current working directory state.

2. **Check Remote Divergence**:
   - Execute `git rev-list --count HEAD..origin/$(git branch --show-current)` or check `git status` to determine if the local branch is behind remote.

3. **Safely Pull Remote Changes**:
   - If local changes exist:
     - Run `git stash --include-untracked`
     - Run `git pull --rebase origin $(git branch --show-current)`
     - Run `git stash pop`
   - If working directory is clean:
     - Run `git pull --rebase origin $(git branch --show-current)`
   - Alternatively, execute the `sync_remote_changes` skill or `/pull_latest` workflow.

4. **Update Dependencies If Needed**:
   - If `package.json` or lockfiles changed during the pull, run `npm install`.

5. **Execute Task**:
   - Proceed with local changes ONLY after remote changes have been pulled and verified up to date.
