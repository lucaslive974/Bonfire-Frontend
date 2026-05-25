'use client'

import { useState, useEffect } from 'react'
import { getNotifications, clearNotifications, NotificationT } from '@/services/localStorage'
import { 
  Search, 
  Trash2, 
  FileSpreadsheet, 
  FileText, 
  User, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Filter,
  Inbox
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { formatDistanceToNow, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { notify } from '@/lib/utils'
import Link from 'next/link'

export function HistoryLayout() {
  const [logs, setLogs] = useState<NotificationT[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'infractions' | 'recurse-first' | 'recurse-second'>('all')
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null)

  useEffect(() => {
    setLogs(getNotifications())
  }, [])

  function handleClearAll() {
    if (window.confirm('Tem certeza de que deseja limpar todo o histórico de logs?')) {
      clearNotifications()
      setLogs([])
      notify.success('Histórico de logs apagado com sucesso.')
    }
  }

  function getRelativeTime(dateStr: string) {
    try {
      const normalized = dateStr.replace(',', '')
      const parsed = parse(normalized, 'dd/MM/yyyy HH:mm:ss', new Date())
      return formatDistanceToNow(parsed, { addSuffix: true, locale: ptBR })
    } catch {
      return dateStr
    }
  }

  function getEventIcon(notification: NotificationT) {
    const message = (notification.message || '').toLowerCase()
    const doc = (notification.document || '').toLowerCase()

    if (doc.endsWith('.csv') || message.includes('infrações') || message.includes('infracao')) {
      return <FileSpreadsheet className="h-5 w-5 text-indigo-500" />
    }
    if (message.includes('primeira instancia') || message.includes('primeirainstancia') || message.includes('1° instância') || message.includes('1ª instância')) {
      return <FileText className="h-5 w-5 text-amber-500" />
    }
    return <FileText className="h-5 w-5 text-emerald-500" />
  }

  function getEventTitle(notification: NotificationT) {
    const message = (notification.message || '').toLowerCase()
    const doc = (notification.document || '').toLowerCase()

    if (doc.endsWith('.csv') || message.includes('infrações') || message.includes('infracao')) {
      return 'Importação de Auto de Infrações'
    }
    if (message.includes('primeira instancia') || message.includes('primeirainstancia') || message.includes('1° instância') || message.includes('1ª instância')) {
      return 'Importação de Recursos — 1ª Instância'
    }
    return 'Importação de Recursos — 2ª Instância'
  }

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = 
      (log.document || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.message || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.user || '').toLowerCase().includes(searchTerm.toLowerCase())

    if (filterType === 'all') return matchesSearch

    const title = getEventTitle(log).toLowerCase()
    if (filterType === 'infractions') return matchesSearch && (title.includes('infração') || title.includes('infrações'))
    if (filterType === 'recurse-first') return matchesSearch && (title.includes('1ª') || title.includes('1°'))
    if (filterType === 'recurse-second') return matchesSearch && (title.includes('2ª') || title.includes('2°'))

    return matchesSearch
  })

  const toggleExpand = (id: string) => {
    setExpandedCardId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6 dark:border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Histórico de Operações
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Audite e acompanhe todas as importações de arquivos, ações do sistema e logs de usuários.
          </p>
        </div>

        {logs.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/60 rounded-lg transition-colors border border-red-200 dark:border-red-900/30"
          >
            <Trash2 size={14} />
            Limpar Histórico
          </button>
        )}
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-zinc-50 dark:bg-zinc-900/40 p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/80">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Pesquisar por documento, e-mail do autor ou conteúdo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg outline-none focus:ring-2 focus:ring-zinc-950/10 dark:focus:ring-zinc-300/10 transition-shadow"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400 pointer-events-none" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-zinc-950/10 dark:focus:ring-zinc-300/10"
          >
            <option value="all">Todos os tipos de logs</option>
            <option value="infractions">Apenas Auto de Infrações</option>
            <option value="recurse-first">Apenas Recursos (1ª Instância)</option>
            <option value="recurse-second">Apenas Recursos (2ª Instância)</option>
          </select>
        </div>
      </div>

      {/* TIMELINE COMPONENT */}
      {filteredLogs.length > 0 ? (
        <div className="relative pl-6 sm:pl-8 border-l border-zinc-200 dark:border-zinc-800 space-y-8 py-2">
          <AnimatePresence>
            {filteredLogs.map((log, index) => {
              const isExpanded = expandedCardId === log.id
              const relativeTime = getRelativeTime(log.date)
              const title = getEventTitle(log)

              return (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4) }}
                  className="relative group"
                >
                  {/* Dotted Node Point on Timeline */}
                  <div className="absolute -left-[37px] sm:-left-[45px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm ring-4 ring-white dark:ring-zinc-950 group-hover:scale-110 transition-transform duration-200">
                    {getEventIcon(log)}
                  </div>

                  {/* LOG CARD */}
                  <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 rounded-xl hover:shadow-md transition-shadow duration-200 overflow-hidden">
                    <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      
                      {/* Left contents */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300">
                            {title}
                          </span>
                          <span className="text-[11px] text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {log.date}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                          {log.document}
                        </h3>

                        {/* Metadata row */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                          <span className="flex items-center gap-1 font-medium text-zinc-700 dark:text-zinc-300">
                            <User className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                            {log.user || 'Sistema'}
                          </span>
                          <span className="text-zinc-400 hidden sm:inline">•</span>
                          <span className="text-zinc-400 dark:text-zinc-500">
                            {relativeTime}
                          </span>
                        </div>
                      </div>

                      {/* Right button action */}
                      <div className="flex items-center gap-2 self-start md:self-center">
                        <button
                          onClick={() => toggleExpand(log.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-colors"
                        >
                          Detalhes
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      </div>
                    </div>

                    {/* EXPANDABLE AREA */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/10 border-t border-zinc-100 dark:border-zinc-900"
                        >
                          <div className="p-4 sm:p-5 text-sm text-zinc-600 dark:text-zinc-400 space-y-2">
                            <div className="font-semibold text-zinc-700 dark:text-zinc-300">
                              Resultado do Processamento:
                            </div>
                            <p className="p-3 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed">
                              {log.message || 'Sem detalhes técnicos registrados para este log.'}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      ) : (
        /* BLANK STATE */
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-zinc-50/50 dark:bg-zinc-900/10 border border-dashed rounded-2xl dark:border-zinc-800">
          <div className="h-12 w-12 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 dark:text-zinc-500 shadow-sm border dark:border-zinc-800">
            <Inbox className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-base font-bold text-zinc-900 dark:text-white">Nenhum log registrado</h3>
          <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400 text-center max-w-sm">
            Nenhuma operação de importação ou registro de ação foi encontrado no histórico.
          </p>
          <Link
            href="/import"
            className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 rounded-lg transition-colors shadow-sm"
          >
            Importar Arquivo
            <ArrowRight size={13} />
          </Link>
        </div>
      )}
    </div>
  )
}
