"use server";

import prismadb from "@/lib/prismaDB";

export async function deleteCandidate(userId: string): Promise<{
  success: boolean;
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

    // Find the candidate by userId
    const candidate = await prismadb.candidate.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!candidate) {
      return {
        success: false,
        message: "Candidate not found for the given User ID",
      };
    }

    // Delete all linked entries in the correct order
    await prismadb.$transaction([
      prismadb.address.deleteMany({ where: { candidateId: candidate.id } }), // Delete Address first
      prismadb.education.deleteMany({ where: { candidateId: candidate.id } }),
      prismadb.certification.deleteMany({ where: { candidateId: candidate.id } }),
      prismadb.workExperience.deleteMany({ where: { candidateId: candidate.id } }),
      prismadb.application.deleteMany({ where: { candidateId: candidate.id } }),
      prismadb.candidate.delete({ where: { id: candidate.id } }), // Delete Candidate last
    ]);

    return {
      success: true,
      message: "Candidate and all linked entries deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting candidate:", error);
    return {
      success: false,
      message: "An error occurred while deleting the candidate",
    };
  }
}