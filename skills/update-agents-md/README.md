# Update Agents.md Skill

This skill provides an automated way to keep the project structure section in `Agents.md` up-to-date.

## Installation

You can install this skill globally or locally in your project:

```bash
npx skills add google-labs-code/jules-skills --skill update-agents-md
```

## Usage

Once installed, your Jules AI agent will have access to the `bun run skills/update-agents-md/scripts/update-agents-md.ts` command to automatically update `Agents.md`.

You can also run it manually:

```bash
bun run skills/update-agents-md/scripts/update-agents-md.ts
```

### Features

- **Automated Directory Scanning:** Scans the project root to build an accurate representation of the codebase structure.
- **Context Limit Protection:** To prevent `Agents.md` from exceeding LLM context windows (kept under ~200 lines), directories containing many files (>10) are moved into separate markdown files.
- **External Links:** Large directories are linked from `Agents.md` to `.jules/docs/project-structure/` for deep diving.
