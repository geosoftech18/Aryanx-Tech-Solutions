import { getCandidateApplicationsByUserId } from "@/actions/candidate-actions/getCandidateApplicationsByUserId";
import { isCandidateProfileComplete } from "@/actions/candidate-actions/isProfileComplete";
import { getRecommendedJobsForCandidate } from "@/actions/candidate-actions/getRecommendedJobs";
import CandidateDashboard from "@/components/candidate/candidateDashboard";
import CandidateProfileCompletion from "@/components/candidate/candidateProfileCompletion";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth";

const CandidatePage = async () => {

  const session = await getServerSession(NEXT_AUTH_CONFIG);

  //   console.log(session);
  // isCandidateProfileComplete

  if (!session || !session.user.id || !session.user.name) {
    return <div>session not available</div>;
  }

  const isProfileComplete: {
    success: boolean;
    isComplete?: boolean;
    message: string;
  } = await isCandidateProfileComplete(session.user.id);

  // Handle case where user is not a candidate
  if (isProfileComplete.message === "User is not a candidate. Access denied.") {
    return <div className="p-6 text-red-600 font-semibold">Access denied: You are not registered as a candidate.</div>;
  }
  //   await deleteCandidate(session.user.id);
  //   console.log(isProfileComplete);

  const userName = session.user.name;

  if (!isProfileComplete.isComplete) {

    return (
      <CandidateProfileCompletion
        userId={session.user.id}
        mode="create"
      />
    );
  } else {
    const applications = await getCandidateApplicationsByUserId(
      session.user.id
    );
    const jobRecommendations = (await getRecommendedJobsForCandidate(session.user.id)).slice(0, 3);
    return <CandidateDashboard userName={userName} applications={applications} jobRecommendations={jobRecommendations} />;
  }
};

export default CandidatePage;
