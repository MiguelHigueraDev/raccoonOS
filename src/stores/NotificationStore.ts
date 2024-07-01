import { ReactNode } from 'react';
import { create } from 'zustand';

type Store = {
  notifications: Notification[];
  addNotification: (id: string, title: string, message: ReactNode) => void;
  removeNotification: (id: string) => void;
};

interface Notification {
  id: string;
  title: string;
  message: ReactNode;
}

// This store manages notifications that are displayed in the top right corner of the screen
export default create<Store>((set) => ({
  notifications: [],
  addNotification: (id: string, title: string, message: ReactNode) =>
    set((state) => ({
      notifications: [...state.notifications, { id, title, message }],
    })),
  removeNotification: (id: string) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id
      ),
    })),
}));
