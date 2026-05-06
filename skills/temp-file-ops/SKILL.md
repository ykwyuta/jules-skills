---
name: temp-file-ops
description: A generic skill for handling temporary file operations. Instructs the agent to create all temporary files under .jules/temp/.
allowed-tools:
  - "Bash"
  - "Read"
  - "Write"
---

# Temporary File Operations Skill

This skill enforces best practices for handling temporary files during an agent's operation. Temporary files are any files that are not meant to be included as final artifacts in the repository.

## Mission Control

Whenever you need to create a temporary file (e.g., intermediate data, downloaded patches, test fixtures, temporary logs):

1. **Always** use `.jules/temp/` as the base directory.
2. If `.jules/temp/` does not exist, create it.
3. **Never** create temporary files in the root directory or adjacent to source files.
4. If you no longer need the temporary files, you may delete them from `.jules/temp/`.

By strictly placing temporary files in `.jules/temp/`, we avoid polluting the repository and make cleanup trivial.

### Example usage in planning or execution:

Instead of:
`echo "test" > temp_file.txt`

Do:
`mkdir -p .jules/temp/ && echo "test" > .jules/temp/temp_file.txt`
