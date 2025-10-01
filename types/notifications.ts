export type NotificationType = 'info' | 'warning' | 'success' | 'error';

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: NotificationType;
    createdAt: Date;
    read: boolean;
    link?: string; // URL opcional para navegar al hacer clic
    actionData?: {
        type: 'connection_request' | 'shared_invoice';
        id: string;
    };
}

export interface NotificationGroup {
    label: string;
    notifications: Notification[];
}