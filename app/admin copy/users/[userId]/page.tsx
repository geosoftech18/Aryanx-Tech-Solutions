import UserForm from "@/components/admin/users/UserForm";
import { getUserDetails } from "@/actions/admin/users/get-user-details";
import { UserStatus, Role } from "@prisma/client";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
      userId: string | null;
    }>;
  }

export default async function UserModePage({ params }: PageProps) {
  const { userId } = await params;

  if (userId === "create" || userId === null) {
    // Render empty form for create
    return <UserForm initialData={null} userId={null} />;
  }

  const user = await getUserDetails(userId);

  if (!user) {
    return notFound();
  }

  // Map user to initialData for the form
  const initialData = {
    firstname: user.firstname,
    middlename: user.middlename || "",
    lastname: user.lastname,
    email: user.email,
    password: "", // Do not prefill password
    role: user.role as Role,
    status: user.status as UserStatus,
  };

  return <UserForm initialData={initialData} userId={userId} />;
} 