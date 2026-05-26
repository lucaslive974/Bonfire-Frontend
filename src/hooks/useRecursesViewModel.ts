import { useState, useEffect, useCallback } from 'react'
import { RecurseData } from '@/schemas/Infractions'
import { recurseService } from '@/services/recurse'
import { DEFAULTTIMEOUT, notify } from '@/lib/utils'
import { HttpError } from '@/services/http/HttpClient.interface'

export function useRecursesViewModel(instance: number = 1) {
  const [date, setDate] = useState<string>('')
  const [ata, setAta] = useState<string>('')
  const [recursos, setRecursos] = useState<RecurseData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [scheduleId, setScheduleId] = useState<NodeJS.Timeout | null>(null)

  const fetchRecurses = useCallback(async () => {
    try {
      const res = await recurseService.getRecurses(date, ata, instance)
      setRecursos(res)
    } catch (error: any) {
      if (error instanceof HttpError) {
        notify.error(error.data?.message || error.message)
      } else {
        notify.error('Erro ao carregar os recursos. Por favor, tente novamente.')
      }
    } finally {
      setIsLoading(false)
      setScheduleId(null)
    }
  }, [date, ata, instance])

  useEffect(() => {
    setIsLoading(true)
    if (scheduleId) clearTimeout(scheduleId)
    const id = setTimeout(fetchRecurses, DEFAULTTIMEOUT)
    return () => clearTimeout(id)
  }, [date, ata, fetchRecurses])

  return {
    recursos,
    setDate,
    setAta,
    isLoading,
  }
}
