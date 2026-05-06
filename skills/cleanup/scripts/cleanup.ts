import { rename, mkdir, readFile, appendFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, basename } from 'node:path';

const TEMP_DIR = '.jules/temp';
const GITIGNORE_PATH = '.gitignore';

async function ensureTempDirExists() {
  if (!existsSync(TEMP_DIR)) {
    await mkdir(TEMP_DIR, { recursive: true });
    console.log(`Created directory: ${TEMP_DIR}`);
  }
}

async function ensureGitignoreContainsTempDir() {
  if (existsSync(GITIGNORE_PATH)) {
    const gitignoreContent = await readFile(GITIGNORE_PATH, 'utf-8');
    if (!gitignoreContent.includes(TEMP_DIR)) {
      // Ensure there's a newline before appending if the file doesn't end with one
      const prefix = gitignoreContent.endsWith('\n') || gitignoreContent.length === 0 ? '' : '\n';
      await appendFile(GITIGNORE_PATH, `${prefix}${TEMP_DIR}\n`);
      console.log(`Added ${TEMP_DIR} to ${GITIGNORE_PATH}`);
    }
  } else {
    await appendFile(GITIGNORE_PATH, `${TEMP_DIR}\n`);
    console.log(`Created ${GITIGNORE_PATH} and added ${TEMP_DIR}`);
  }
}

async function moveFileToTemp(filePath: string) {
  if (!existsSync(filePath)) {
    console.warn(`Warning: File not found: ${filePath}`);
    return;
  }

  const fileName = basename(filePath);
  const targetPath = join(TEMP_DIR, fileName);

  try {
    await rename(filePath, targetPath);
    console.log(`Moved ${filePath} to ${targetPath}`);
  } catch (error) {
    console.error(`Error moving ${filePath}:`, error);
  }
}

async function main() {
  const filesToMove = process.argv.slice(2);

  if (filesToMove.length === 0) {
    console.log('Usage: bun run cleanup.ts <file1> <file2> ...');
    return;
  }

  await ensureTempDirExists();
  await ensureGitignoreContainsTempDir();

  for (const file of filesToMove) {
    await moveFileToTemp(file);
  }
}

main().catch(console.error);
