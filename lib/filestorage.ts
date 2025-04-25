import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const UPLOADS_DIR = path.join(process.cwd(), 'public/uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

export async function storeFile(
  file: File,
  userId: string,
  fileType: 'resume'
): Promise<{ filePath: string; fileName: string }> {
  try {
    // Create user-specific directory if it doesn't exist
    const userDir = path.join(UPLOADS_DIR, fileType, userId);
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }

    // Generate unique filename
    const fileExtension = path.extname(file.name);
    const uniqueFileName = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(userDir, uniqueFileName);

    // Convert file to buffer and write to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.promises.writeFile(filePath, buffer);

    // Return the public-accessible path (relative to /public)
    return {
      filePath: `/uploads/${fileType}/${userId}/${uniqueFileName}`,
      fileName: file.name,
    };
  } catch (error) {
    console.error('Error storing file:', error);
    throw new Error('Failed to store file');
  }
}

export async function deleteFile(filePath: string): Promise<void> {
  try {
    // Remove the /public prefix to get the filesystem path
    const fsPath = path.join(process.cwd(), 'public', filePath);
    if (fs.existsSync(fsPath)) {
      await fs.promises.unlink(fsPath);
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new Error('Failed to delete file');
  }
}