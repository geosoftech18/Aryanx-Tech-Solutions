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

  if (!isProfileComplete.isComplete) {
    return (
      <div className="p-20">
        <CompanyForm userId={session.user.id} initialData={null} />
      </div>
    );
  } else {
    return <EmployerDashboard />;
  }
};

export default EmployerPage;
