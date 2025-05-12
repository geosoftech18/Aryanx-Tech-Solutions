import { getCandidateProfileData } from "@/actions/candidate-actions/getCandidateProfile";
import CandidateProfileCompletion from "@/components/candidate/candidateProfileCompletion";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function ProfilePage() {

  const session = await getServerSession(NEXT_AUTH_CONFIG );

  if (!session?.user?.id) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Not Authenticated</h1>
          <p className="mt-2 text-gray-600">Please log in to access your profile.</p>
        </div>
      </div>
    );
  }

  const initialData = await getCandidateProfileData(session.user.id);


  if (!session?.user?.id) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Not Authenticated</h1>
          <p className="mt-2 text-gray-600">Please log in to access your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <CandidateProfileCompletion
      userId={session.user.id}
      initialData={initialData}
      mode={initialData ? 'update' : 'create'}
    />
  );
} 