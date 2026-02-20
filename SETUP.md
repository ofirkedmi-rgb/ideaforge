# IdeaForge — Project Setup Guide

## What's in This Package

```
CLAUDE.md                           ← Project brain for Claude Code
plan.md                             ← Living task list with checkboxes
docs/
├── PRD.md                          ← Full product requirements
└── reference/
    ├── generate-claude-md.js       ← Generator engine (port to TypeScript in Phase 2)
    ├── CLAUDE-default.md           ← Sample output: default config
    └── CLAUDE-sidehustle.md        ← Sample output: side hustle config
```

## Step 1: Create the Project

```bash
mkdir ~/Projects/ideaforge
cd ~/Projects/ideaforge
git init
```

## Step 2: Copy Files

Copy all files from this package into the project folder, preserving the folder structure.

## Step 3: GitHub Setup

```bash
# Create repo on GitHub first (github.com/new → "ideaforge")
git add .
git commit -m "chore: initial project files (CLAUDE.md, PRD, plan)"
git remote add origin git@github.com:YOUR_USERNAME/ideaforge.git
git push -u origin main
```

## Step 4: Start Building

```bash
claude
```

**First prompt:**
```
Read CLAUDE.md, docs/PRD.md, and plan.md to understand this project.
Then execute Task 0.1 from plan.md: scaffold the Next.js project.
After done, commit with message "feat: initial project scaffold"
and update plan.md to mark Task 0.1 as complete.
```

## Step 5: Continue Building (each session)

**Start of session:**
```
Read CLAUDE.md and plan.md. Check git log --oneline -10.
What's the current state and what should we work on next?
```

**For each task:**
```
Read plan.md. Execute the next incomplete task.
Plan your approach first, show me the plan, then implement.
Commit when done. Update plan.md.
```

**At review checkpoints (🔍):**
```
We've finished [Phase X]. Run the review checklist from plan.md.
Fix any issues found. Then commit fixes and tag the release.
```

**End of session:**
```
Commit any uncommitted changes.
Update plan.md with current progress.
Update CLAUDE.md if any architecture decisions were made.
Push to GitHub.
```

## Phase Commit Strategy

| Event | Action |
|-------|--------|
| Each task complete | `git commit` |
| Review checkpoint (🔍) | Fix issues → `git commit -m "fix: ..."` |
| Phase complete (🏷️) | `git tag v0.X.0` → `git push --tags` |
| End of session | `git push origin main` |
| Breaking change | Create branch first: `git checkout -b feature/x` |

## Key Files to Keep Updated

| File | When to Update |
|------|---------------|
| `plan.md` | After every completed task (check the box) |
| `CLAUDE.md` | When architecture decisions change |
| `docs/PRD.md` | When requirements change (rare) |
