# Cleanup Skill

A Jules Agent Skill designed to keep your repository clean by automatically moving temporary, unwanted, or inappropriate files to the `.jules/temp/` directory.

## Features

- **Automated moving:** Quickly moves files to `.jules/temp/`.
- **Gitignore management:** Automatically ensures `.jules/temp` is added to your root `.gitignore` file to prevent these files from being committed.
- **Safe handling:** Creates the `.jules/temp/` directory if it doesn't exist.

## Usage

When this skill is installed, the agent can clean up files for you.

You can also run the script manually:

```bash
bun run skills/cleanup/scripts/cleanup.ts <path-to-file1> <path-to-file2>
```

Example:
```bash
bun run skills/cleanup/scripts/cleanup.ts my_temp_data.csv
```
