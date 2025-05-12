"use client";

import { listUsersByRole } from "@/actions/test/list-users-by-role";
import { Button } from "@/components/ui/button";
import { NotificationDropdown } from "@/components/ui/notification-dropdown";
import { useNotifications } from "@/hooks/useNotifications";
import { useSocket } from "@/hooks/useSocket";
import { Role } from "@prisma/client";
import { useEffect, useState } from "react";

interface UserLite {
  id: string;
  name: string;
  role: Role;
}

interface SocketTestClientProps {
  userId: string;
  userRole: Role;
}

export default function SocketTestClient({ userId, userRole }: SocketTestClientProps) {
  const [sendStatus, setSendStatus] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<UserLite[]>([]);
  const [employers, setEmployers] = useState<UserLite[]>([]);
  const [, setAdmins] = useState<UserLite[]>([]);
  const [targetId, setTargetId] = useState<string>("");
  const { connected, joinRoom, emit } = useSocket();

  // Provide fallback values to avoid undefined errors
  const { notifications } = useNotifications(
    userId || "",
    userRole
  );

  // Fetch all users on mount
  useEffect(() => {
    // Helper to fetch and set users by role
    const fetchUsers = async () => {
      try {
        if (userRole === "CANDIDATE") {
          const employers = await listUsersByRole("EMPLOYER");
          setEmployers(employers);
        } else if (userRole === "EMPLOYER") {
          const candidates = await listUsersByRole("CANDIDATE");
          setCandidates(candidates);
        }
        const admins = await listUsersByRole("ADMIN");
        setAdmins(admins);
      } catch (err) {
        console.log('Error fetching users:', err);
        setCandidates([]);
        setEmployers([]);
        setAdmins([]);
      }
    };
    fetchUsers();
  }, [userRole]);

  // Join the user's own room after connecting
  useEffect(() => {
    if (connected && userId) {
      joinRoom(`user-${userId}`);
    }
  }, [connected, userId, joinRoom]);

  if (!userId || !userRole) {
    return <div className="p-8 text-red-600">Not authenticated. Please log in.</div>;
  }

  // Determine possible targets
  let possibleTargets: UserLite[] = [];
  if (userRole === "CANDIDATE") possibleTargets = employers;
  else if (userRole === "EMPLOYER") possibleTargets = candidates;
  else if (userRole === "ADMIN") possibleTargets = [...candidates, ...employers];

  // Send notification to selected user and all admins
  const sendNotification = async () => {
    if (!targetId || !connected) return;
    setSendStatus("Sending...");
    const event = "new-notification";
    const notification = {
      id: Math.random().toString(36).slice(2),
      title: `Test Notification from ${userRole}`,
      message: `Hello from ${userRole} at ${new Date().toLocaleTimeString()}`,
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    // console.log('Emitting emit-to-room', {
    //   room: `user-${targetId}`,
    //   event,
    //   data: { notification }
    // });
    // Emit to receiver's room
    emit('emit-to-room', {
      room: `user-${targetId}`,
      event,
      data: { notification }
    });
    // Also emit to all admins
    // admins.forEach((admin) => {
    //   emit('emit-to-room', {
    //     room: `user-${admin.id}`,
    //     event,
    //     data: { notification }
    //   });
    // });
    setSendStatus(`Notification sent to user and all admins`);
    setTimeout(() => setSendStatus(null), 2000);
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Socket.IO Notification Testbed</h1>
      <div className="flex items-center gap-4 mb-4">
        <NotificationDropdown userId={userId} userRole={userRole === "ADMIN" ? "EMPLOYER" : (userRole as "EMPLOYER" | "CANDIDATE")} />
        <span className="text-gray-600">Logged in as: <b>{userRole}</b> (id: {userId})</span>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Send Test Notification</h2>
        <div className="flex gap-2 items-center">
          <select
            className="border rounded px-2 py-1"
            value={targetId}
            onChange={e => setTargetId(e.target.value)}
          >
            <option value="">Select a user...</option>
            {possibleTargets.map(u => (
              <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
            ))}
          </select>
          <Button onClick={sendNotification} disabled={!targetId}>Send Notification</Button>
        </div>
        {sendStatus && <div className="text-blue-600 mt-2">{sendStatus}</div>}
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Received Notifications (most recent first):</h2>
        <div className="space-y-2">
          {notifications.length === 0 ? (
            <div className="text-gray-500">No notifications received yet.</div>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className="p-3 bg-gray-100 rounded border">
                <div className="font-medium">{n.title}</div>
                <div className="text-sm text-gray-700">{n.message}</div>
                <div className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 