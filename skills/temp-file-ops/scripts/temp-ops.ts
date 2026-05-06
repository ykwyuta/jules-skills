import * as fs from "node:fs/promises";
import * as path from "node:path";

const TEMP_DIR = ".jules/temp";

/**
 * Ensures the temporary directory exists.
 */
async function ensureTempDirExists(): Promise<void> {
  try {
    await fs.mkdir(TEMP_DIR, { recursive: true });
  } catch (err: any) {
    throw new Error(`Failed to create temp directory: ${err.message}`);
  }
}

/**
 * Resolves a filename to a path inside the temporary directory.
 * @param filename The name of the temporary file.
 * @returns The resolved path.
 */
function resolveTempPath(filename: string): string {
  // Prevent directory traversal attacks
  const safeFilename = path.basename(filename);
  return path.join(TEMP_DIR, safeFilename);
}

/**
 * Writes data to a temporary file.
 * @param filename The name of the file to create or overwrite.
 * @param data The string content to write.
 */
export async function writeTempFile(filename: string, data: string): Promise<string> {
  await ensureTempDirExists();
  const filePath = resolveTempPath(filename);
  try {
    await fs.writeFile(filePath, data, "utf-8");
    return filePath;
  } catch (err: any) {
    throw new Error(`Failed to write temp file ${filename}: ${err.message}`);
  }
}

/**
 * Reads data from a temporary file.
 * @param filename The name of the file to read.
 * @returns The file content as a string.
 */
export async function readTempFile(filename: string): Promise<string> {
  const filePath = resolveTempPath(filename);
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return data;
  } catch (err: any) {
    if (err.code === "ENOENT") {
      throw new Error(`Temp file not found: ${filename}`);
    }
    throw new Error(`Failed to read temp file ${filename}: ${err.message}`);
  }
}

/**
 * Deletes a temporary file.
 * @param filename The name of the file to delete.
 */
export async function deleteTempFile(filename: string): Promise<void> {
  const filePath = resolveTempPath(filename);
  try {
    await fs.unlink(filePath);
  } catch (err: any) {
    if (err.code !== "ENOENT") {
      throw new Error(`Failed to delete temp file ${filename}: ${err.message}`);
    }
  }
}

/**
 * Lists all temporary files currently stored.
 * @returns An array of filenames.
 */
export async function listTempFiles(): Promise<string[]> {
  try {
    const files = await fs.readdir(TEMP_DIR);
    return files;
  } catch (err: any) {
    if (err.code === "ENOENT") {
      return [];
    }
    throw new Error(`Failed to list temp files: ${err.message}`);
  }
}
