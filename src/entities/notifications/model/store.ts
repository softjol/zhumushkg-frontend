import { create } from 'zustand'

interface NotificationStore {
  hasUnread: boolean
  setHasUnread: (value: boolean) => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  hasUnread: false,
  setHasUnread: (value) => set({ hasUnread: value }),
}))
