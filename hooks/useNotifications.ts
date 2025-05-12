"use client";
import { useEffect, useState, useCallback } from "react";
import { Notification, Role } from "@prisma/client";
import {
  getAdminNotifications,
  getCandidateNotifications,
  getEmployerNotifications,
  getUnreadNotificationCount,
} from "@/actions/notifications/notification-actions";
import { useSocket } from "./useSocket";

export function useNotifications(userId: string, userRole: Role) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const {
    subscribeToNotifications,
    unsubscribeFromNotifications,
    joinRoom,
    leaveRoom,
    connected,
  } = useSocket({
    // For local development, use current origin. For production, set serverUrl as needed.
    serverUrl: process.env.NEXT_PUBLIC_BASE_URL,
    path: "/api/socket",
  });

  // Fetch notifications function
  const fetchNotifications = useCallback(async () => {
    try {
      const result =
        userRole === "CANDIDATE"
          ? await getCandidateNotifications(userId)
          : userRole === "EMPLOYER"
          ? await getEmployerNotifications(userId)
          : await getAdminNotifications(userId);

      if (result.success && result.notifications) {
        setNotifications(result.notifications);
      }

      const unreadResult = await getUnreadNotificationCount(userId);
      if (unreadResult.success) {
        setUnreadCount(unreadResult.count || 0);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  }, [userId, userRole]);

  // Callback for handling new notifications
  const handleNewNotification = useCallback((notification: Notification) => {
    console.log(notification)
    // alert("new notificnisf")
    setNotifications((prev) => [notification, ...prev]);
    setUnreadCount((prev) => prev + 1);
  }, []);

  // Initial fetch, socket subscription, and room join/leave
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    // Only join/leave room and subscribe/unsubscribe when connected
    if (!connected || !userId) return;
    joinRoom(`user-${userId}`);
    subscribeToNotifications(handleNewNotification);
    return () => {
      unsubscribeFromNotifications(handleNewNotification);
      leaveRoom(`user-${userId}`);
    };
  }, [connected, userId, userRole, handleNewNotification, joinRoom, leaveRoom, subscribeToNotifications, unsubscribeFromNotifications]);

  return {
    notifications,
    unreadCount,
    loading,
    setNotifications,
    setUnreadCount,
    refetch: fetchNotifications,
  };
}
