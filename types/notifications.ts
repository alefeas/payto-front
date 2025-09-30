export type NotificationType = 'info' | 'warning' | 'success' | 'error';

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: NotificationType;
    createdAt: Date;
    read: boolean;
}

export interface NotificationGroup {
    label: string;
    notifications: Notification[];
}