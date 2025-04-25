"use server";

import prismadb from "@/lib/prismaDB";

export async function isCandidateProfileComplete(userId: string): Promise<{
  success: boolean;
  isComplete?: boolean;
  message: string;
}> {
  try {
    // Validate userId
    if (!userId) {
      return {
        success: false,
        message: "User ID is required",
      };
    }

    // Find candidate by userId
    const candidate = await prismadb.candidate.findUnique({
      where: { userId },
      select: {
        candidateType: true,
        contact: true,
        education: true,
        // certifications: true,
        // WorkExperience: true,
        YOE: true,
        skills: true,
        Bio: true,
        Address: true,
        DOB: true,
        resume: true,
      },
    });

    // If no candidate exists for the given userId
    if (!candidate) {
      return {
        success: false,
        isComplete: false,
        message: "Candidate profile does not exist. Please complete your profile.",
      };
    }

    // Check if all required fields are set
    const isComplete =
      !!candidate.candidateType &&
      !!candidate.contact &&
      candidate.education.length > 0 &&
    //   candidate.certifications.length > 0 &&
    //   candidate.WorkExperience.length > 0 &&
      candidate.YOE > 0 &&
      candidate.skills.length > 0 &&
      !!candidate.Bio &&
      !!candidate.Address &&
      !!candidate.DOB &&
      !!candidate.resume;

    if (!isComplete) {
      return {
        success: false,
        isComplete: false,
        message: "Candidate profile is incomplete. Please fill in all required fields.",
      };
    }

    return {
      success: true,
      isComplete: true,
      message: "Candidate profile is complete.",
    };
  } catch (error) {
    console.error("Error checking candidate profile completeness:", error);
    return {
      success: false,
      message: "An error occurred while checking candidate profile completeness.",
    };
  }
}