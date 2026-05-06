import * as fs from 'fs';
import * as path from 'path';

const IGNORE_DIRS = new Set(['.git', 'node_modules', '.jules', '.trash', 'dist', 'build']);
const AGENTS_MD_PATH = 'Agents.md';
const DOCS_DIR = '.jules/docs/project-structure';
const TARGET_LINES = 200;
const STRUCTURE_HEADER = '## Project Structure';

interface FileNode {
  name: string;
  isDirectory: boolean;
  children: FileNode[];
  size: number; // total files and directories inside
  path: string;
}

function buildTree(dirPath: string, rootPath: string): FileNode {
  const name = path.basename(dirPath) || '.';
  const stats = fs.statSync(dirPath);

  if (!stats.isDirectory()) {
    return { name, isDirectory: false, children: [], size: 1, path: dirPath };
  }

  const children: FileNode[] = [];
  let size = 1;

  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    if (IGNORE_DIRS.has(item)) continue;

    const fullPath = path.join(dirPath, item);
    const childNode = buildTree(fullPath, rootPath);
    children.push(childNode);
    size += childNode.size;
  }

  // Sort: directories first, then files, alphabetically
  children.sort((a, b) => {
    if (a.isDirectory && !b.isDirectory) return -1;
    if (!a.isDirectory && b.isDirectory) return 1;
    return a.name.localeCompare(b.name);
  });

  return { name, isDirectory: true, children, size, path: dirPath };
}

function generateTreeString(node: FileNode, prefix: string = '', isLast: boolean = true, isRoot: boolean = true, offloadedDirs: Map<string, string>): string {
  let result = '';
  const marker = isRoot ? '' : (isLast ? '└── ' : '├── ');
  const childPrefix = isRoot ? '' : (isLast ? '    ' : '│   ');

  if (!isRoot) {
    if (node.isDirectory && offloadedDirs.has(node.path)) {
       result += `${prefix}${marker}[${node.name}/](${offloadedDirs.get(node.path)})\n`;
       return result; // Don't traverse children if offloaded
    } else {
       result += `${prefix}${marker}${node.name}${node.isDirectory ? '/' : ''}\n`;
    }
  } else {
     result += `.\n`;
  }

  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    const childIsLast = i === node.children.length - 1;
    result += generateTreeString(child, prefix + childPrefix, childIsLast, false, offloadedDirs);
  }

  return result;
}

function countLines(str: string): number {
  return str.split('\n').length;
}

function main() {
  if (!fs.existsSync(AGENTS_MD_PATH)) {
    console.error(`Error: ${AGENTS_MD_PATH} not found.`);
    process.exit(1);
  }

  const agentsMdContent = fs.readFileSync(AGENTS_MD_PATH, 'utf-8');
  const lines = agentsMdContent.split('\n');

  let headerIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith(STRUCTURE_HEADER)) {
      headerIndex = i;
      break;
    }
  }

  let nonStructureContent = agentsMdContent;
  if (headerIndex !== -1) {
    // We assume the structure section goes to the end of the file.
    nonStructureContent = lines.slice(0, headerIndex).join('\n');
  }

  const baseLineCount = countLines(nonStructureContent);

  const rootNode = buildTree('.', '.');

  let offloadedDirs = new Map<string, string>();
  let currentTreeString = generateTreeString(rootNode, '', true, true, offloadedDirs);
  let totalLines = baseLineCount + countLines(STRUCTURE_HEADER) + 2 + countLines(currentTreeString);

  if (totalLines > TARGET_LINES) {
    fs.mkdirSync(DOCS_DIR, { recursive: true });

    // Find largest directories to offload
    const allDirs: FileNode[] = [];
    function collectDirs(node: FileNode) {
        if (node.isDirectory && node.path !== '.') {
            allDirs.push(node);
        }
        node.children.forEach(collectDirs);
    }
    collectDirs(rootNode);

    // Sort directories by size descending
    allDirs.sort((a, b) => b.size - a.size);

    for (const dir of allDirs) {
      if (totalLines <= TARGET_LINES) break;
      if (offloadedDirs.has(dir.path)) continue;

      const docFilename = `${dir.name}.md`;
      const docPath = path.join(DOCS_DIR, docFilename);
      const relativeDocPath = `./${DOCS_DIR}/${docFilename}`; // Relative to root

      offloadedDirs.set(dir.path, relativeDocPath);

      // Generate detailed tree for offloaded doc
      const detailedTree = generateTreeString(dir, '', true, true, new Map());
      const docContent = `# Structure of ${dir.name}/\n\n\`\`\`text\n${detailedTree}\`\`\`\n`;
      fs.writeFileSync(docPath, docContent);
      console.log(`Offloaded details for ${dir.path} to ${docPath}`);

      // Recalculate size
      currentTreeString = generateTreeString(rootNode, '', true, true, offloadedDirs);
      totalLines = baseLineCount + countLines(STRUCTURE_HEADER) + 2 + countLines(currentTreeString);
    }
  }

  const finalAgentsMdContent = `${nonStructureContent.trim()}\n\n${STRUCTURE_HEADER}\n\n\`\`\`text\n${currentTreeString.trim()}\n\`\`\`\n`;
  fs.writeFileSync(AGENTS_MD_PATH, finalAgentsMdContent);
  console.log(`Updated ${AGENTS_MD_PATH}.`);
}

main();
