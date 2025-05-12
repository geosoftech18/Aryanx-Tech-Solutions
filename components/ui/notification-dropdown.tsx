"use client";
import { markNotificationAsRead } from "@/actions/notifications/notification-actions";
import { useNotifications } from "@/hooks/useNotifications";
import { formatDistanceToNow } from "date-fns";
import { Bell } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card } from "./card";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ScrollArea } from "./scroll-area";


interface NotificationDropdownProps {
  userId: string;
  userRole: 'CANDIDATE' | 'EMPLOYER';
}

export function NotificationDropdown({ userId, userRole }: NotificationDropdownProps) {
  const { notifications, unreadCount, refetch } = useNotifications(userId, userRole);

  const handleNotificationClick = async (notificationId: string) => {
    await markNotificationAsRead(notificationId, userId);
    // Refetch notifications to update the UI
    refetch();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full relative">
          <Bell className="h-4 w-4 text-black" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <ScrollArea className="h-80">
          <div className="p-4 space-y-4">
            <h4 className="font-medium leading-none mb-4">Notifications</h4>
            {notifications.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No notifications
              </p>
            ) : (
              notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`p-3 cursor-pointer transition-colors hover:bg-accent ${
                    !notification.isRead ? "bg-accent/50" : ""
                  }`}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}