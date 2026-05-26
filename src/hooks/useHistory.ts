'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  getNotifications,
  clearNotifications,
  deleteNotification,
  NotificationT,
} from '@/services/localStorage'
import { notify } from '@/lib/utils'

export function getEventTitle(notification: NotificationT): string {
  const message = (notification.message || '').toLowerCase()
  const doc = (notification.document || '').toLowerCase()

  if (
    doc.endsWith('.csv') ||
    message.includes('infrações') ||
    message.includes('infracao')
  ) {
    return 'Importação de Auto de Infrações'
  }
  if (
    message.includes('primeira instancia') ||
    message.includes('primeirainstancia') ||
    message.includes('1° instância') ||
    message.includes('1ª instância')
  ) {
    return 'Importação de Recursos — 1ª Instância'
  }
  return 'Importação de Recursos — 2ª Instância'
}

export function useHistory() {
  const [logs, setLogs] = useState<NotificationT[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<
    'all' | 'infractions' | 'recurse-first' | 'recurse-second'
  >('all')
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null)

  // Fetch audit logs on mount
  useEffect(() => {
    setLogs(getNotifications())
  }, [])

  // Clear all notifications
  const handleClearAll = () => {
    if (
      window.confirm('Tem certeza de que deseja limpar todo o histórico de logs?')
    ) {
      clearNotifications()
      setLogs([])
      notify.success('Histórico de logs apagado com sucesso.')
    }
  }

  // Delete a single log
  const handleDeleteLog = (id: string) => {
    if (
      window.confirm('Tem certeza de que deseja apagar este log de auditoria?')
    ) {
      const updated = deleteNotification(id)
      setLogs(updated)
      notify.success('Log apagado com sucesso.')
      if (expandedCardId === id) {
        setExpandedCardId(null)
      }
    }
  }

  // Toggle card expansion
  const toggleExpand = (id: string) => {
    setExpandedCardId((prev) => (prev === id ? null : id))
  }

  // Filter logs reactively based on search term and dropdown type selection
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch =
        (log.document || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (log.message || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (log.user || '').toLowerCase().includes(searchTerm.toLowerCase())

      if (filterType === 'all') return matchesSearch

      const title = getEventTitle(log).toLowerCase()
      if (filterType === 'infractions') {
        return (
          matchesSearch &&
          (title.includes('infração') || title.includes('infrações'))
        )
      }
      if (filterType === 'recurse-first') {
        return matchesSearch && (title.includes('1ª') || title.includes('1°'))
      }
      if (filterType === 'recurse-second') {
        return matchesSearch && (title.includes('2ª') || title.includes('2°'))
      }

      return matchesSearch
    })
  }, [logs, searchTerm, filterType])

  return {
    logs,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    expandedCardId,
    toggleExpand,
    handleClearAll,
    handleDeleteLog,
    filteredLogs,
  }
}
