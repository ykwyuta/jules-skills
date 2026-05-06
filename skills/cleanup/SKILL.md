# Cleanup Skill

## Mission

You are responsible for keeping the repository clean by moving any inappropriate or temporary files into the `.jules/temp/` directory.

## Instructions

When the user asks to clean up the repository, or you identify files that should not be committed to the repository (e.g. temporary files, test artifacts, unneeded generated files), execute the cleanup script.

### Running Cleanup

To clean up files, use the `cleanup.ts` script provided in this skill. Run this command from the repository root:

```bash
bun run skills/cleanup/scripts/cleanup.ts <path/to/file1> <path/to/file2> ...
```

The script will automatically:
1. Ensure `.jules/temp` exists.
2. Ensure `.jules/temp` is added to `.gitignore`.
3. Move the specified files to the `.jules/temp` directory.

### Example

User: "Move `test_output.log` and `temp_data.csv` to the temporary directory."

Action:
```bash
bun run skills/cleanup/scripts/cleanup.ts test_output.log temp_data.csv
```
