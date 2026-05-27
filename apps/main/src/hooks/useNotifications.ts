import { EventT } from '@/schemas/NotificationSchema'
import {
  clearNotifications,
  getNotifications,
  addNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  NotificationT,
} from '@/services/localStorage'

import { useEffect, useState } from 'react'
import { useAuth } from '@bonfire/core'

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationT[]>([])
  const { session } = useAuth()

  function handleInsert(notification: EventT) {
    const userName = session?.user?.name || session?.user?.email || 'Usuário'
    const updated = addNotification(notification, userName)
    setNotifications(updated)
  }

  function handleClear() {
    clearNotifications()
    setNotifications([])
  }

  function handleMarkAsRead(id: string) {
    const updated = markNotificationAsRead(id)
    setNotifications(updated)
  }

  function handleMarkAllAsRead() {
    const updated = markAllNotificationsAsRead()
    setNotifications(updated)
  }

  useEffect(() => {
    setNotifications(getNotifications())
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  return {
    notifications,
    qtdNotifications: unreadCount, // Only count unread items for the badge
    handleInsert,
    handleClear,
    handleMarkAsRead,
    handleMarkAllAsRead,
  }
}
