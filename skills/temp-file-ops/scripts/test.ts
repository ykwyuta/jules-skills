import { writeTempFile, readTempFile, deleteTempFile, listTempFiles } from "./temp-ops.js";
import * as assert from "node:assert";
import * as fs from "node:fs/promises";
import * as path from "node:path";

async function runTests() {
  console.log("Running temp-ops tests...");
  const tempDir = ".jules/temp";

  // Clean up before tests
  try {
    await fs.rm(tempDir, { recursive: true, force: true });
  } catch (e) {
    // Ignore
  }

  // 1. Write file
  const file1 = "test1.txt";
  const content1 = "Hello, temp world!";
  const filePath1 = await writeTempFile(file1, content1);
  console.log(`✅ writeTempFile resolved to: ${filePath1}`);
  assert.strictEqual(filePath1, path.join(tempDir, file1));

  // 2. Read file
  const readContent = await readTempFile(file1);
  console.log(`✅ readTempFile returned: ${readContent}`);
  assert.strictEqual(readContent, content1);

  // 3. List files
  const files = await listTempFiles();
  console.log(`✅ listTempFiles returned: ${files}`);
  assert.strictEqual(files.length, 1);
  assert.strictEqual(files[0], file1);

  // 4. Delete file
  await deleteTempFile(file1);
  const filesAfterDelete = await listTempFiles();
  console.log(`✅ listTempFiles after delete returned: ${filesAfterDelete}`);
  assert.strictEqual(filesAfterDelete.length, 0);

  // 5. Directory traversal prevention
  const sneakyFile = "../../../sneaky.txt";
  const safeFilePath = await writeTempFile(sneakyFile, "I am a hacker");
  console.log(`✅ writeTempFile (sneaky) resolved to: ${safeFilePath}`);
  assert.strictEqual(safeFilePath, path.join(tempDir, "sneaky.txt"));
  await deleteTempFile(sneakyFile);

  console.log("All tests passed!");
}

runTests().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
