import { readdir, stat, readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';

const MAX_LINES = 200;
const MAX_FILES_PER_DIR = 10;
const DOCS_DIR = '.jules/docs/project-structure';

interface DirNode {
  name: string;
  type: 'file' | 'dir';
  children?: DirNode[];
}

async function getDirTree(dir: string, indent = ''): Promise<{ tree: string[], separateDocs: { path: string, content: string[] }[] }> {
  let entries = await readdir(dir, { withFileTypes: true });
  entries = entries.filter(e => !['.git', 'node_modules', '.jules'].includes(e.name));

  let files = entries.filter(e => e.isFile());
  let dirs = entries.filter(e => e.isDirectory());

  let tree: string[] = [];
  let separateDocs: { path: string, content: string[] }[] = [];

  if (files.length > MAX_FILES_PER_DIR) {
    const docPath = join(DOCS_DIR, `${dir.replace(/[\/\\]/g, '_') || 'root'}.md`);
    tree.push(`${indent}├── [${dir} files...](${docPath})`);
    let docContent = [`# Files in ${dir || '.'}\n`];
    for (const f of files) {
      docContent.push(`- ${f.name}`);
    }
    separateDocs.push({ path: docPath, content: docContent });
  } else {
    for (const f of files) {
      tree.push(`${indent}├── ${f.name}`);
    }
  }

  for (const d of dirs) {
    const nextPath = join(dir, d.name);
    tree.push(`${indent}├── ${d.name}/`);
    const result = await getDirTree(nextPath, indent + '│   ');
    tree.push(...result.tree);
    separateDocs.push(...result.separateDocs);
  }

  return { tree, separateDocs };
}

async function updateAgentsMd() {
  const agentsMdPath = 'Agents.md';
  let agentsMdContent = '';
  try {
    agentsMdContent = await readFile(agentsMdPath, 'utf8');
  } catch (e) {
    console.error(`Error reading ${agentsMdPath}:`, e);
    return;
  }

  const { tree, separateDocs } = await getDirTree('.');

  const structureSection = `\n## Project Structure\n\n\`\`\`text\n.\n${tree.join('\n')}\n\`\`\`\n`;

  // Insert or update Project Structure section
  const sectionRegex = /\n## Project Structure\n\n```text\n[\s\S]*?\n```\n/;
  let updatedContent = agentsMdContent;
  if (sectionRegex.test(updatedContent)) {
    updatedContent = updatedContent.replace(sectionRegex, structureSection);
  } else {
    updatedContent += structureSection;
  }

  // Ensure Agents.md is under ~200 lines (this is a rough heuristic, we can't easily truncate if it's already long, but we try to limit the tree size)
  const lines = updatedContent.split('\n');
  if (lines.length > MAX_LINES) {
    console.warn(`Warning: Agents.md is ${lines.length} lines, which exceeds the target of ${MAX_LINES} lines. Generating more separate docs might be needed in a future update.`);
  }

  await writeFile(agentsMdPath, updatedContent, 'utf8');

  // Write separate docs
  await mkdir(DOCS_DIR, { recursive: true });
  for (const doc of separateDocs) {
    await writeFile(doc.path, doc.content.join('\n'), 'utf8');
  }

  console.log('Agents.md updated successfully.');
}

updateAgentsMd().catch(console.error);