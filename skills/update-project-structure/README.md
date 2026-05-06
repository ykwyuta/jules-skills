# Update Project Structure

A Jules skill to automatically update `Agents.md` with the current repository file structure.

## What it does

This skill updates the `## Project Structure` section in the root `Agents.md` file with a visual tree representation of your repository.
To keep `Agents.md` concise and within approximately 200 lines, it automatically offloads the detailed structure of large directories into separate Markdown files under `.jules/docs/project-structure/` and creates clickable links from the main tree.

## Usage

When you want to refresh the project structure in `Agents.md` (e.g. after adding or restructuring many files/folders), you can run:

```bash
bun run skills/update-project-structure/scripts/update.ts
```

Or just ask Jules:
- "Update the folder structure in Agents.md"
- "Agents.mdのフォルダ構成を更新して"
