import { S3Client } from "@aws-sdk/client-s3";

if (!process.env.DO_SPACES_KEY || !process.env.DO_SPACES_SECRET) {
  throw new Error("Missing required DigitalOcean Spaces environment variables: DO_SPACES_KEY and DO_SPACES_SECRET");
}

const s3 = new S3Client({
    region: "blr1", // DigitalOcean region
    endpoint: "https://blr1.digitaloceanspaces.com", // <-- no bucket in endpoint
    credentials: {
      accessKeyId: process.env.DO_SPACES_KEY!,
      secretAccessKey: process.env.DO_SPACES_SECRET!,
    },
    forcePathStyle: false, // virtual-hosted style is fine when endpoint doesn't include bucket
});

/**
 * Export the configured S3 client for use throughout the application
 * 
 * Usage Examples:
 * 
 * 1. Upload a file:
 *    const command = new PutObjectCommand({
 *      Bucket: 'aryanx-bucket',
 *      Key: 'path/to/file.pdf',
 *      Body: fileBuffer,
 *      ContentType: 'application/pdf'
 *    });
 *    await s3.send(command);
 * 
 * 2. Delete a file:
 *    const command = new DeleteObjectCommand({
 *      Bucket: 'aryanx-bucket',
 *      Key: 'path/to/file.pdf'
 *    });
 *    await s3.send(command);
 * 
 * 3. Generate presigned URL:
 *    const command = new GetObjectCommand({
 *      Bucket: 'aryanx-bucket',
 *      Key: 'path/to/file.pdf'
 *    });
 *    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
 * 
 * Best Practices:
 * - Use meaningful key prefixes to organize files (e.g., 'resumes/', 'avatars/')
 * - Implement per-user partitioning (e.g., 'resumes/{userId}/file.pdf')
 * - Set appropriate Content-Type headers for proper browser handling
 * - Use private ACL for sensitive data, public-read only when necessary
 * - Implement proper error handling for network and authentication failures
 */
export { s3 };
