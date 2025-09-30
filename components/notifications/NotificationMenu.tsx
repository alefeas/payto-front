'use client';

import { useState } from 'react';
import { Bell, X, Info, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Notification, NotificationType } from '@/types/notifications';

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Nueva factura recibida',
    message: 'Has recibido una nueva factura para revisión.',
    type: 'info',
    createdAt: new Date(),
    read: false,
  },
  {
    id: '2',
    title: 'Pago pendiente',
    message: 'Tienes un pago que vence pronto.',
    type: 'warning',
    createdAt: new Date(),
    read: false,
  }
];

const NotificationIcon = ({ type }: { type: NotificationType }) => {
  switch (type) {
    case 'info':
      return <Info className="h-4 w-4 text-blue-500" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case 'success':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'error':
      return <AlertCircle className="h-4 w-4 text-red-500" />;
  }
};

export function NotificationMenu() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const hasNotifications = notifications.length > 0;

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {hasNotifications && (
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-4">
          <h4 className="font-medium">Notificaciones</h4>
          {hasNotifications && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setNotifications([])}
            >
              Limpiar todo
            </Button>
          )}
        </div>
        <ScrollArea className="h-[400px]">
          {hasNotifications ? (
            <div className="px-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-3 p-3 hover:bg-accent rounded-lg group relative"
                >
                  <NotificationIcon type={notification.type} />
                  <div className="flex-1">
                    <h5 className="font-medium">{notification.title}</h5>
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {notification.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeNotification(notification.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-muted-foreground">
              No hay notificaciones
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}