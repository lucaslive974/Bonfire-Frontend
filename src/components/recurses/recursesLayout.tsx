'use client'

import { DEFAULTTIMEOUT } from '@/lib/utils'
import { RecurseData } from '@/schemas/Infractions'
import { GetRecurses } from '@/services/recurse'
import { useCallback, useEffect, useState } from 'react'
import { Scale } from 'lucide-react'
import { columns } from './columns'
import { DataTable } from './data-table'

enum InstancesE {
  primeira = 1,
  segunda = 2,
}
interface RecursesLayoutProps {
  instance?: InstancesE
}

export function RecursesLayout({ instance }: RecursesLayoutProps) {
  const [date, setDate] = useState<string>('')
  const [ata, setAta] = useState<string>('')
  const [recursos, setRecursos] = useState<RecurseData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [scheduleId, setScheduleId] = useState<NodeJS.Timeout | null>(null)

  const wrapper = useCallback(() => {
    GetRecurses(date, ata, instance)
      .then((res) => {
        setRecursos(res)
      })
      .finally(() => {
        setIsLoading(false)
        setScheduleId(null)
      })
  }, [date, ata, instance])

  useEffect(() => {
    setIsLoading(true)
    if (scheduleId) clearTimeout(scheduleId)
    const id = setTimeout(wrapper, DEFAULTTIMEOUT)
    return () => clearTimeout(id)
  }, [date, ata, wrapper])

  const isFirstInstance = instance === InstancesE.primeira
  const title = isFirstInstance ? "Recursos em 1ª Instância" : "Recursos em 2ª Instância"
  const description = isFirstInstance
    ? "Acompanhamento e julgamento de recursos na Junta Administrativa de Recursos de Infrações (JARI)."
    : "Acompanhamento e julgamento de recursos em segunda instância administrativa no CETRAN."

  return (
    <div className="w-full flex flex-col animate-in fade-in duration-300">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm transition-all duration-200 hover:shadow-md">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-xl border border-indigo-100 dark:border-indigo-900/50 animate-pulse-subtle">
            <Scale className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {title}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center px-4 py-2 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
            {isFirstInstance ? 'JARI Ativa' : 'CETRAN Ativo'}
          </span>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={recursos}
        setDate={setDate}
        setAta={setAta}
        isLoading={isLoading}
      />
    </div>
  )
}
