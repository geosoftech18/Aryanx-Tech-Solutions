import { isEmployerProfileComplete } from "@/actions/company-actions/isProfileComplete";
import CompanyForm from "@/components/employer/employerCompanyForm";
import EmployerDashboard from "@/components/employer/employerDashboard";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth";

const EmployerPage = async () => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  if (!session || !session.user.id || !session.user.name) {
    return <div>session not available</div>;
  }

  const isProfileComplete: {
    success: boolean;
    isComplete?: boolean;
    message: string;
  } = await isEmployerProfileComplete(session.user.id);

  // Handle case where user is not an employer
  if (isProfileComplete.message === "User is not an employer. Access denied.") {
    return <div className="p-6 text-red-600 font-semibold">Access denied: You are not registered as an employer.</div>;
  }

  if (!isProfileComplete.isComplete) {
    return (
      <div className="p-20">
        <CompanyForm userId={session.user.id} initialData={null} />
        <div className="mt-4 text-yellow-700 font-medium">{isProfileComplete.message}</div>
      </div>
    );
  } else {
    return <EmployerDashboard />;
    
  }
};

export default EmployerPage;
