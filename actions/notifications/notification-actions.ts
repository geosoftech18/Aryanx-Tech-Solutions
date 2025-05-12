"use server";

import prismadb from "@/lib/prismaDB";
import { Role } from "@prisma/client";

// Get all notifications for a candidate
export async function getCandidateNotifications(userId: string) {
  try {
    const notifications = await prismadb.notification.findMany({
      where: {
        userId,
        user: {
          role: Role.CANDIDATE
        }
      },
      include: {
        job: {
          include: {
            company: true
          }
        },
        application: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return { success: true, notifications };
  } catch (error) {
    console.error("Error fetching candidate notifications:", error);
    return { success: false, error: "Failed to fetch notifications" };
  }
}

// Get all notifications for an employer
export async function getEmployerNotifications(userId: string) {
  try {
    const notifications = await prismadb.notification.findMany({
      where: {
        userId,
        user: {
          role: Role.EMPLOYER
        }
      },
      include: {
        job: true,
        application: {
          include: {
            Candidate: {
              include: {
                user: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return { success: true, notifications };
  } catch (error) {
    console.error("Error fetching employer notifications:", error);
    return { success: false, error: "Failed to fetch notifications" };
  }
}

// Get notifications for a specific application
export async function getApplicationNotifications(applicationId: string) {
  try {
    const notifications = await prismadb.notification.findMany({
      where: {
        applicationId
      },
      include: {
        job: {
          include: {
            company: true
          }
        },
        application: {
          include: {
            Candidate: {
              include: {
                user: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return { success: true, notifications };
  } catch (error) {
    console.error("Error fetching application notifications:", error);
    return { success: false, error: "Failed to fetch notifications" };
  }
}

// Delete a notification
export async function deleteNotification(notificationId: string, userId: string) {
  try {
    // Verify the notification belongs to the user
    const notification = await prismadb.notification.findFirst({
      where: {
        id: notificationId,
        userId
      }
    });

    if (!notification) {
      return { success: false, error: "Notification not found or unauthorized" };
    }

    await prismadb.notification.delete({
      where: {
        id: notificationId
      }
    });

    return { success: true, message: "Notification deleted successfully" };
  } catch (error) {
    console.error("Error deleting notification:", error);
    return { success: false, error: "Failed to delete notification" };
  }
}

// Mark notification as read
export async function markNotificationAsRead(notificationId: string, userId: string) {
  try {
    const notification = await prismadb.notification.findFirst({
      where: {
        id: notificationId,
        userId
      }
    });

    if (!notification) {
      return { success: false, error: "Notification not found or unauthorized" };
    }

    await prismadb.notification.update({
      where: {
        id: notificationId
      },
      data: {
        isRead: true
      }
    });

    return { success: true, message: "Notification marked as read" };
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return { success: false, error: "Failed to update notification" };
  }
}

// Get unread notification count
export async function getUnreadNotificationCount(userId: string) {
  try {
    const count = await prismadb.notification.count({
      where: {
        userId,
        isRead: false
      }
    });

    return { success: true, count };
  } catch (error) {
    console.error("Error counting unread notifications:", error);
    return { success: false, error: "Failed to count notifications" };
  }
}

// Get all notifications for an admin
export async function getAdminNotifications(userId: string) {
  try {
    const notifications = await prismadb.notification.findMany({
      where: {
        userId,
        user: {
          role: Role.ADMIN
        }
      },
      include: {
        job: true,
        application: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return { success: true, notifications };
  } catch (error) {
    console.error("Error fetching admin notifications:", error);
    return { success: false, error: "Failed to fetch notifications" };
  }
} 