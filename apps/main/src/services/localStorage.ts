import { EventT } from '@/schemas/NotificationSchema'

export type NotificationT = EventT & {
  id: string
  date: string
  read: boolean
  user?: string
}

const STORAGE_KEY = 'notifications'

function safeParse<T>(value: string | null, fallback: T): T {
  try {
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export function getNotifications(): NotificationT[] {
  if (typeof window === 'undefined') return []

  const data = window.localStorage.getItem(STORAGE_KEY)

  return safeParse<NotificationT[]>(data, [])
}

export function addNotification(notification: EventT, userName?: string): NotificationT[] {
  if (typeof window === 'undefined') return []

  const notifications = getNotifications()

  // Use full local locale string to capture both date and exact time
  const dateStr = new Date().toLocaleString('pt-BR')

  const newNotification: NotificationT = {
    ...notification,
    id: crypto.randomUUID(),
    date: dateStr,
    read: false,
    user: userName || 'Sistema',
  }

  const updated = [newNotification, ...notifications]

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

  return updated
}

export function markNotificationAsRead(id: string): NotificationT[] {
  if (typeof window === 'undefined') return []

  const notifications = getNotifications()
  const updated = notifications.map((n) =>
    n.id === id ? { ...n, read: true } : n
  )

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

  return updated
}

export function markAllNotificationsAsRead(): NotificationT[] {
  if (typeof window === 'undefined') return []

  const notifications = getNotifications()
  const updated = notifications.map((n) => ({ ...n, read: true }))

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

  return updated
}

export function clearNotifications() {
  if (typeof window === 'undefined') return

  window.localStorage.removeItem(STORAGE_KEY)
}

export function deleteNotification(id: string): NotificationT[] {
  if (typeof window === 'undefined') return []

  const notifications = getNotifications()
  const updated = notifications.filter((n) => n.id !== id)

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

  return updated
}

