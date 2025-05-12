"use client"
/**
 * Client-Side Socket.IO Hook (Best Practices)
 *
 * - Connects to the backend singleton server via network (never imports backend code)
 * - Allows custom server URL and path (defaults to current origin and '/api/socket')
 * - Ensures only one connection per component lifecycle
 * - Exposes stable join/leave/subscribe/unsubscribe methods
 * - Cleans up on unmount
 * - Tracks connection state for UI feedback
 */

import { useEffect, useRef, useCallback, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Notification } from "@prisma/client";

interface UseSocketOptions {
  serverUrl?: string; // e.g., "http://localhost:3000"
  path?: string; // e.g., "/api/socket"
}

export const useSocket = (options: UseSocketOptions = {}) => {
  const { serverUrl = "", path = "/api/socket" } = options;
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Only connect if not already connected
    if (!socketRef.current) {
      socketRef.current = io(serverUrl, {
        path,
        transports: ["websocket", "polling"],
        withCredentials: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socketRef.current.on("connect", () => {
        setConnected(true);
        console.log("[useSocket] Connected to Socket.IO server");
      });

      socketRef.current.on("disconnect", () => {
        setConnected(false);
        console.log("[useSocket] Disconnected from Socket.IO server");
      });

      socketRef.current.on("connect_error", (error) => {
        setConnected(false);
        console.error("[useSocket] Socket.IO connection error:", error);
      });
    }

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setConnected(false);
      }
    };
    // Only run on mount/unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverUrl, path]);

  /**
   * Join a room (user-specific or otherwise)
   * Stable reference for use in effects
   */
  const joinRoom = useCallback((roomId: string) => {
    console.log("[useSocket] Joining room:", roomId);
    if (socketRef.current && connected) {
      socketRef.current.emit("join-room", roomId);
    }
  }, [connected]);

  /**
   * Leave a room
   */
  const leaveRoom = useCallback((roomId: string) => {
    if (socketRef.current && connected) {
      socketRef.current.emit("leave-room", roomId);
    }
  }, [connected]);

  /**
   * Subscribe to notifications (event: 'new-notification')
   * Expects payload: { notification: Notification }
   */
  const subscribeToNotifications = useCallback((callback: (notification: Notification) => void) => {
    if (socketRef.current) {
      console.log("[useSocket] Subscribing to notifications");
      socketRef.current.on("new-notification", (payload: { notification: Notification }) => {
        console.log("[useSocket] Received new notification:", payload.notification);
        callback(payload.notification);
      });
    }
  }, []);

  /**
   * Unsubscribe from notifications
   */
  const unsubscribeFromNotifications = useCallback((callback: (notification: Notification) => void) => {
    if (socketRef.current) {
      // Remove the wrapped handler
      socketRef.current.off("new-notification", (payload: { notification: Notification }) => {
        callback(payload.notification);
      });
    }
  }, []);

  const emit = useCallback((event: string, ...args: any[]) => {
    if (socketRef.current && connected) {
      socketRef.current.emit(event, ...args);
    }
  }, [connected]);

  useEffect(() => {
    emit('ping', { test: true });
  }, [emit]);

  return {
    socket: socketRef.current,
    connected,
    joinRoom,
    leaveRoom,
    subscribeToNotifications,
    unsubscribeFromNotifications,
    emit,
  };
}; 