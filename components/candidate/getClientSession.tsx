"use client";

import { useSession } from "next-auth/react";

const ClientSession = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>No active session</div>;
  }

  return (
    <div>
      <h1>Welcome, {session.user?.name || "User"}!</h1>
      <p>Email: {session.user?.email}</p>
    </div>
  );
};

export default ClientSession;