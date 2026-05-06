# temp-file-ops Skill

The `temp-file-ops` skill enforces a standard location for all temporary and intermediate files created by Jules agents. It provides a set of TypeScript utilities for managing these files securely within `.jules/temp/`.

## Mission

This skill prevents repository pollution by guaranteeing that all intermediate artifacts (e.g., test fixtures, downloaded patches, logs) are confined to the `.jules/temp/` directory.

## Installation

Add this skill to your workspace:

```bash
npx skills add google-labs-code/jules-skills --skill temp-file-ops
```

## Usage

Agents guided by this skill will automatically route file operations to `.jules/temp/`.

### Developer Script Usage

If you need to incorporate temporary file operations into your custom TypeScript agents or scripts, you can use the provided utilities:

```typescript
import {
  writeTempFile,
  readTempFile,
  deleteTempFile,
  listTempFiles
} from "./scripts/temp-ops.ts";

// Write a file. It will be safely placed at `.jules/temp/my-temp.txt`
await writeTempFile("my-temp.txt", "Temporary content");

// Read the file
const content = await readTempFile("my-temp.txt");
console.log(content); // "Temporary content"

// List all temporary files
const files = await listTempFiles();
console.log(files); // ["my-temp.txt"]

// Delete the file
await deleteTempFile("my-temp.txt");
```

## Security & Reliability

- **Directory Traversal Prevention:** The utilities use `path.basename` to prevent malicious or accidental writes outside the designated temporary directory (e.g., `writeTempFile("../etc/passwd", "...")` will map to `.jules/temp/passwd`).
- **Safe Cleanup:** Files are safely deleted without throwing errors if the file has already been removed.
