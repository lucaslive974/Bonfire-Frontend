'use client'

import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { ScrollArea } from './scroll-area'
import { Bell, CheckCheck, Trash2, User, Clock, Inbox } from 'lucide-react'

export interface NotificationT {
  id: string
  date: string
  read: boolean
  user?: string
  document?: string
  message?: string
  counter?: string
}

export interface NotificationBarProps {
  notifications: NotificationT[]
  qtdNotifications: number
  handleClear: () => void
  handleMarkAsRead: (id: string) => void
  handleMarkAllAsRead: () => void
}

export function NotificationBar({
  notifications,
  qtdNotifications,
  handleClear,
  handleMarkAsRead,
  handleMarkAllAsRead,
}: NotificationBarProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all')

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === 'unread') return !n.read
    return true
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          aria-label="Notificações"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors focus:outline-none"
        >
          <Bell size={18} className="text-zinc-600 dark:text-zinc-300" />

          {qtdNotifications > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white ring-2 ring-white dark:ring-zinc-950 animate-in zoom-in-50">
              {qtdNotifications}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-96 p-0 rounded-xl border border-zinc-200/80 dark:border-zinc-800 shadow-xl bg-white dark:bg-zinc-950 z-50 animate-in fade-in slide-in-from-top-2 duration-250"
      >
        {/* HEADER */}
        <div className="flex flex-col border-b border-zinc-100 dark:border-zinc-900">
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <div className="space-y-0.5">
              <span className="text-sm font-bold text-zinc-950 dark:text-white">Notificações</span>
              {qtdNotifications > 0 && (
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  {qtdNotifications} não {qtdNotifications === 1 ? 'lida' : 'lidas'}
                </p>
              )}
            </div>

            <div className="flex items-center gap-1">
              {qtdNotifications > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  title="Marcar todas como lidas"
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                >
                  <CheckCheck size={16} />
                </button>
              )}

              {notifications.length > 0 && (
                <button
                  onClick={handleClear}
                  title="Limpar todas"
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>

          {/* TABS FILTER */}
          <div className="flex border-t border-zinc-100 dark:border-zinc-900 px-2 pt-1 pb-1 gap-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 py-1 px-3 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'all'
                  ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setActiveTab('unread')}
              className={`flex-1 py-1 px-3 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'unread'
                  ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              Não lidas
              {qtdNotifications > 0 && (
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              )}
            </button>
          </div>
        </div>

        {/* LIST */}
        <ScrollArea className="h-80">
          {filteredNotifications.length > 0 ? (
            <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                  className={`relative flex flex-col gap-1 px-4 py-3.5 transition-all duration-200 cursor-pointer ${
                    !notification.read
                      ? 'bg-blue-50/20 dark:bg-blue-950/5 hover:bg-blue-50/40 dark:hover:bg-blue-950/10'
                      : 'hover:bg-zinc-50 dark:hover:bg-zinc-900/40'
                  }`}
                >
                  {/* Unread dot visual indicator */}
                  {!notification.read && (
                    <span className="absolute left-1.5 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-blue-600 ring-2 ring-blue-100 dark:ring-blue-950" />
                  )}

                  {/* Header info */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 flex items-center gap-1 shrink-0">
                      <Clock className="h-3 w-3" />
                      {notification.date}
                    </span>
                    {notification.user && (
                      <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-0.5 truncate max-w-[150px]">
                        <User className="h-3 w-3 text-zinc-400" />
                        {notification.user}
                      </span>
                    )}
                  </div>

                  {/* Document Title */}
                  <span className="text-xs font-bold text-zinc-900 dark:text-white">
                    {notification.document}
                  </span>

                  {/* Message body */}
                  <span className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {notification.message}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col h-60 items-center justify-center text-zinc-400 dark:text-zinc-500 gap-2">
              <Inbox size={24} className="stroke-1" />
              <span className="text-xs">
                {activeTab === 'unread'
                  ? 'Nenhuma notificação não lida'
                  : 'Sem notificações registradas'}
              </span>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
