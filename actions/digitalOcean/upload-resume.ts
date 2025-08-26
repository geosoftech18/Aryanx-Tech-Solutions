"use server";

import {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "./spacesConnection";
import prismaDB from "@/lib/prismaDB";
import { v4 as uuidv4 } from "uuid";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

/**
 * Type definition for file upload result
 */
interface UploadResult {
  success: boolean;
  error?: string;
  fileData?: {
    filename: string;
    size: number;
    mimetype: string;
    resumeUrl: string;
    key: string;
  };
}

/**
 * Server action for uploading resume files to DigitalOcean Spaces
 * Features:
 * - Strict PDF validation
 * - 1MB file size limit
 * - Organized storage with prefixes (resumes/{candidateId}/)
 * - Database integration to update candidate's resume URL
 * - Unique file naming to prevent conflicts
 *
 * @param formData - The form data containing the resume file and candidateId
 * @returns Promise with upload result or error
 */
export async function uploadResumeAction(
  formData: FormData
): Promise<UploadResult> {
  try {
    // Extract the resume file and candidate ID from FormData
    const resumeFile = formData.get("resume") as File;
    const candidateId = formData.get("candidateId") as string;

    // Validate required fields
    if (!resumeFile) {
      return {
        success: false,
        error: "No resume file provided",
      };
    }

    if (!candidateId) {
      return {
        success: false,
        error: "Candidate ID is required",
      };
    }

    // Strict PDF validation - only allow PDF files
    if (!resumeFile || resumeFile.type !== "application/pdf") {
      return {
        success: false,
        error: "Only PDF files are allowed",
      };
    }

    // Check file size limit (1MB maximum)
    const maxFileSize = 1 * 1024 * 1024; // 1 MB
    if (resumeFile.size > maxFileSize) {
      return {
        success: false,
        error: "File too large (max 1MB)",
      };
    }

    // Verify candidate exists in database
    const candidate = await prismaDB.candidate.findUnique({
      where: { id: candidateId },
      include: {
        user: true,
      },
    });

    if (!candidate) {
      return {
        success: false,
        error: "Candidate not found",
      };
    }

    // Convert File to Buffer for upload
    const buffer = Buffer.from(await resumeFile.arrayBuffer());

    // Generate unique file key with proper prefix structure
    // Format: resumes/{candidateId}/{uniqueId}_resume.pdf
    // This ensures:
    // 1. Organized storage under 'resumes/' prefix
    // 2. Per-user partitioning using candidateId
    // 3. Unique naming to prevent conflicts
    const uniqueId = uuidv4().substring(0, 8); // Short UUID for uniqueness
    const sanitizedFileName = resumeFile.name.replace(/[^a-zA-Z0-9.-]/g, "_"); // Sanitize filename
    const key = `resumes/${candidateId}/${uniqueId}_${sanitizedFileName}`;

    // Configure DigitalOcean Spaces upload parameters
    const uploadParams = {
      Bucket: "aryanx-bucket", // Your DigitalOcean Spaces bucket name
      Key: key,
      Body: buffer,
      ContentType: "application/pdf",
      ACL: "private" as const, // Ensure private access (default but explicit)
      ContentLength: resumeFile.size, // Optional but helps with upload optimization
      Metadata: {
        "candidate-id": candidateId,
        "original-filename": resumeFile.name,
        "upload-timestamp": new Date().toISOString(),
        "candidate-name":
          candidate.user.firstname +
          " " +
          candidate.user.middlename +
          " " +
          candidate.user.lastname,
      },
    };

    // Upload file to DigitalOcean Spaces
    await s3.send(new PutObjectCommand(uploadParams));

    // Generate the public URL for the uploaded file
    // Note: Since ACL is private, this URL will require signed access
    // For public access, change ACL to 'public-read' above
    const signedUrl = await getSignedUrl(
      s3,
      new GetObjectCommand({ Bucket: "aryanx-bucket", Key: key }),
      { expiresIn: 60 * 60 }
    );

    // Update candidate's resume URL in the database
    await prismaDB.candidate.update({
      where: { id: candidateId },
      data: {
        resume: signedUrl,
        // Optional: track when resume was last updated
        updatedAt: new Date(),
      },
    });

    // Return success response with file details
    return {
      success: true,
      fileData: {
        filename: resumeFile.name,
        size: resumeFile.size,
        mimetype: resumeFile.type,
        resumeUrl: signedUrl,
        key: key,
      },
    };
  } catch (error) {
    // Log detailed error for debugging while returning generic message to user
    console.error("Resume upload error:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });

    return {
      success: false,
      error: "Resume upload failed. Please try again.",
    };
  }
}

/**
 * Server action to delete a resume from DigitalOcean Spaces and update database
 * @param candidateId - The candidate's ID
 * @param resumeKey - The S3 key of the resume to delete
 * @returns Promise with deletion result
 */
export async function deleteResumeAction(
  candidateId: string,
  resumeKey: string
): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    // Verify candidate exists
    const candidate = await prismaDB.candidate.findUnique({
      where: { id: candidateId },
    });

    if (!candidate) {
      return {
        success: false,
        error: "Candidate not found",
      };
    }

    // Delete file from DigitalOcean Spaces
    const deleteParams = {
      Bucket: "aryanx-bucket",
      Key: resumeKey,
    };

    await s3.send(new DeleteObjectCommand(deleteParams));

    // Update database to remove resume URL
    await prismaDB.candidate.update({
      where: { id: candidateId },
      data: {
        resume: null,
        updatedAt: new Date(),
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Resume deletion error:", error);
    return {
      success: false,
      error: "Failed to delete resume. Please try again.",
    };
  }
}

/**
 * Alternative implementation using formidable (requires: npm install formidable @types/formidable)
 * Uncomment and use this if you prefer formidable for more complex scenarios
 */

/*
import formidable from 'formidable';
import { IncomingMessage } from 'http';

export async function uploadResumeWithFormidable(request: IncomingMessage): Promise<UploadResult> {
  return new Promise((resolve) => {
    const form = new formidable.IncomingForm({ 
      maxFileSize: 1 * 1024 * 1024, // 1 MB limit
      keepExtensions: true,
      multiples: false
    });

    form.parse(request, async (err: any, fields: any, files: any) => {
      if (err) {
        if (err.message.includes('maxFileSize')) {
          return resolve({
            success: false,
            error: 'File exceeds 1MB limit'
          });
        }
        return resolve({
          success: false,
          error: 'Upload parsing error'
        });
      }

      const file = Array.isArray(files.resume) ? files.resume[0] : files.resume;
      
      if (!file) {
        return resolve({
          success: false,
          error: 'No resume file provided'
        });
      }

      // Read file buffer
      const fs = require('fs');
      const buffer = fs.readFileSync(file.filepath);

      resolve({
        success: true,
        fileData: {
          filename: file.originalFilename || 'unknown',
          size: file.size,
          mimetype: file.mimetype || 'application/octet-stream',
          buffer: buffer
        }
      });
    });
  });
}
*/

/**
 * Server action to get a secure download link for a candidate's resume
 *
 * Features:
 * - Role-based access control (candidate can access own resume, employers/admins can access any)
 * - Database verification to ensure resume exists
 * - Extracts storage key from database URL
 * - Supports both direct URLs and signed URLs for enhanced security
 * - Comprehensive error handling and logging
 *
 * Security Considerations:
 * - Private resumes require authentication
 * - Candidates can only access their own resumes
 * - Employers and admins can access any resume
 * - URLs can be time-limited using signed URLs
 *
 * @param candidateId - The ID of the candidate whose resume to access
 * @param userId - Optional: Current user ID for additional authorization checks
 * @returns Promise with download URL or error
 */
export async function getResumeDownloadLinkAction(
  candidateId: string,
  userId?: string
): Promise<{
  success: boolean;
  error?: string;
  downloadUrl?: string;
  metadata?: {
    filename: string;
    uploadDate: Date;
    candidateName: string;
  };
}> {
  try {
    // Get current session for authorization
    const session = await getServerSession(NEXT_AUTH_CONFIG);

    if (!session?.user) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    // Fetch candidate with resume and user information
    const candidate = await prismaDB.candidate.findUnique({
      where: { id: candidateId },
      include: {
        user: true,
      },
    });

    if (!candidate) {
      return {
        success: false,
        error: "Candidate not found",
      };
    }

    if (!candidate.resume) {
      return {
        success: false,
        error: "No resume found for this candidate",
      };
    }

    // Authorization check - role-based access control
    const currentUserRole = session.user.role;
    const currentUserId = session.user.id;

    // Candidates can only access their own resume
    if (currentUserRole === "CANDIDATE" && candidate.userId !== currentUserId) {
      return {
        success: false,
        error: "Access denied. You can only access your own resume.",
      };
    }

    // Employers and admins can access any resume (business requirement)
    // Additional checks could be added here for employer-specific permissions
    if (!["CANDIDATE", "EMPLOYER", "ADMIN"].includes(currentUserRole)) {
      return {
        success: false,
        error: "Insufficient permissions to access resumes",
      };
    }

    // Extract the storage key from the stored resume URL
    // URL format: https://aryanx-bucket.blr1.digitaloceanspaces.com/resumes/{candidateId}/{filename}
    const resumeUrl = candidate.resume;
    const urlParts = resumeUrl.split("/");
    const key = urlParts.slice(3).join("/"); // Extract everything after the domain

    if (!key.startsWith("resumes/")) {
      return {
        success: false,
        error: "Invalid resume storage path",
      };
    }


    const command = new GetObjectCommand({
      Bucket: "aryanx-bucket",
      Key: key,
    });

    // Generate signed URL with 1-hour expiration
    const signedUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600, // 1 hour in seconds
    });
    const candidateName = [
      candidate.user.firstname,
      candidate.user.middlename,
      candidate.user.lastname,
    ]
      .filter(Boolean)
      .join(" ");

    // Extract filename from key
    const keyParts = key.split("/");
    const filename = keyParts[keyParts.length - 1];

    // Log access for security audit trail
    console.log("Resume access:", {
      candidateId,
      accessedBy: currentUserId,
      userRole: currentUserRole,
      timestamp: new Date().toISOString(),
      filename: filename,
    });

    return {
      success: true,
      downloadUrl: signedUrl,
      metadata: {
        filename: filename,
        uploadDate: candidate.updatedAt,
        candidateName: candidateName,
      },
    };
  } catch (error) {
    // Log detailed error for debugging
    console.error("Resume download link generation error:", {
      candidateId,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });

    return {
      success: false,
      error: "Failed to generate download link. Please try again.",
    };
  }
}

/**
 * Server action to check if a candidate has an uploaded resume
 *
 * This is a lightweight function to check resume availability without
 * generating download links, useful for UI state management.
 *
 * @param candidateId - The ID of the candidate to check
 * @returns Promise with resume availability status
 */
export async function checkResumeAvailabilityAction(
  candidateId: string
): Promise<{
  success: boolean;
  hasResume: boolean;
  error?: string;
  metadata?: {
    filename: string;
    uploadDate: Date;
  };
}> {
  try {
    // Get current session for authorization
    const session = await getServerSession(NEXT_AUTH_CONFIG);

    if (!session?.user) {
      return {
        success: false,
        hasResume: false,
        error: "Authentication required",
      };
    }

    // Fetch candidate resume information
    const candidate = await prismaDB.candidate.findUnique({
      where: { id: candidateId },
      select: {
        id: true,
        userId: true,
        resume: true,
        updatedAt: true,
      },
    });

    if (!candidate) {
      return {
        success: false,
        hasResume: false,
        error: "Candidate not found",
      };
    }

    // Authorization check - same as download function
    const currentUserRole = session.user.role;
    const currentUserId = session.user.id;

    if (currentUserRole === "CANDIDATE" && candidate.userId !== currentUserId) {
      return {
        success: false,
        hasResume: false,
        error: "Access denied",
      };
    }

    const hasResume = !!candidate.resume;
    let filename = "";

    if (hasResume && candidate.resume) {
      // Extract filename from URL
      const urlParts = candidate.resume.split("/");
      filename = urlParts[urlParts.length - 1];
    }

    return {
      success: true,
      hasResume: hasResume,
      metadata: hasResume
        ? {
            filename: filename,
            uploadDate: candidate.updatedAt,
          }
        : undefined,
    };
  } catch (error) {
    console.error("Resume availability check error:", {
      candidateId,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return {
      success: false,
      hasResume: false,
      error: "Failed to check resume availability",
    };
  }
}
