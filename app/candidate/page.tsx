import { getCandidateApplicationsByUserId } from "@/actions/candidate-actions/getCandidateApplicationsByUserId";
import { getCandidateProfileData } from "@/actions/candidate-actions/getCandidateProfile";
import { isCandidateProfileComplete } from "@/actions/candidate-actions/isProfileComplete";
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
  //   await deleteCandidate(session.user.id);
  //   console.log(isProfileComplete);

  const userName = session.user.name;

  if (!isProfileComplete.isComplete) {
    const initialData = await getCandidateProfileData(session.user.id);

    return (
      <CandidateProfileCompletion
        initialData={initialData}
        userId={session.user.id}
      />
    );
  } else {
    const applications = await getCandidateApplicationsByUserId(
      session.user.id
    );
    return <CandidateDashboard userName={userName} applications={applications} />;
  }
};

export default CandidatePage;
