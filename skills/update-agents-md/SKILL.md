# Update Agents.md Skill

This skill allows the agent to update the `Agents.md` file with the current project structure.

## Context

The `Agents.md` file often contains the structure of the repository. Over time, as files and folders are added or removed, this structure becomes out of date. This skill provides a script to automatically scan the project directory and update the `Agents.md` file.

To prevent `Agents.md` from becoming too large (which can impact LLM context limits), the script ensures the file stays around 200 lines. If a directory contains more than 10 files, the script extracts the file list for that directory into a separate markdown document located under `.jules/docs/project-structure/` and places a link in `Agents.md`.

## Instructions

To update the `Agents.md` file, run the following script:

```bash
bun run skills/update-agents-md/scripts/update-agents-md.ts
```

This will automatically:
1. Scan the project directory.
2. Generate a tree representation of the structure.
3. Update the `## Project Structure` section in `Agents.md`.
4. Create separate documentation files for large directories under `.jules/docs/project-structure/`.

Do not manually edit the `## Project Structure` section in `Agents.md`. Let the script handle it.
