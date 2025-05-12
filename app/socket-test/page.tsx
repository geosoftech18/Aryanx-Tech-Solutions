// SERVER COMPONENT
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { Role } from "@prisma/client";
import SocketTestClient from "./SocketTestClient";

export default async function SocketTest() {
  // Fetch session on the server
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  const userId = session?.user?.id as string | undefined;
  const userRole = session?.user?.role as Role | undefined;

  if (!userId || !userRole) {
    return <div>No user found</div>;
  }
  // Render the client component, passing session info as props
  return (
    <SocketTestClient userId={userId} userRole={userRole} />
  );
} 