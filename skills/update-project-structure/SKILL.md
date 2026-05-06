# Update Project Structure Skill

## Mission

This skill is responsible for updating `Agents.md` with the current file and directory structure of the repository. It ensures that `Agents.md` remains concise (around 200 lines) by offloading detailed structures of large directories into separate markdown files under `.jules/docs/project-structure/`.

## Instructions

When a user requests to update the project structure in `Agents.md`, run the update script.

### Running the Update

To update the structure, execute the `update.ts` script from the repository root:

```bash
bun run skills/update-project-structure/scripts/update.ts
```

### What it does

The script will automatically:
1. Scan the repository to build a tree of all files and directories (ignoring `.git`, `node_modules`, `.jules`, etc.).
2. Read the existing `Agents.md`.
3. Locate the `## Project Structure` section (or append it if missing).
4. Calculate if the new structure will cause `Agents.md` to exceed approximately 200 lines.
5. If the limit is exceeded, identify the largest directories and offload their detailed structure into `.jules/docs/project-structure/<dirname>.md`.
6. Replace the offloaded directories in the main tree with a link to their detail file.
7. Update `Agents.md` with the newly generated structure, preserving all other existing content.

### Example

User: "Agents.mdのフォルダ構成を更新して" (Update the folder structure in Agents.md)

Action:
```bash
bun run skills/update-project-structure/scripts/update.ts
```
