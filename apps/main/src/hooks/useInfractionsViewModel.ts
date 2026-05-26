import { useState, useEffect, useCallback } from 'react'
import { AutoData } from '@/schemas/Infractions'
import { infractionService } from '@/services/infractions'
import { DEFAULTTIMEOUT, notify } from '@/lib/utils'
import { HttpError } from '@bonfire/core'

export function useInfractionsViewModel() {
  const [date, setDate] = useState('')
  const [ai, setAi] = useState('')
  const [infracoes, setInfracoes] = useState<AutoData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [scheduleId, setScheduleId] = useState<NodeJS.Timeout | null>(null)

  const fetchInfractions = useCallback(
    async function fetchInfractions() {
      try {
        const res = await infractionService.getAutoInfractions(date, ai)
        setInfracoes(res)
      } catch (error: any) {
        if (error instanceof HttpError) {
          notify.error(error.data?.message || error.message)
        } else {
          notify.error('Erro ao carregar as infrações. Por favor, tente novamente.')
        }
      } finally {
        setIsLoading(false)
        setScheduleId(null)
      }
    },
    [date, ai],
  )

  useEffect(() => {
    setIsLoading(true)
    if (scheduleId) clearTimeout(scheduleId)
    const id = setTimeout(fetchInfractions, DEFAULTTIMEOUT)

    return () => clearTimeout(id)
  }, [date, ai, fetchInfractions])

  return {
    infracoes,
    setDate,
    setAi,
    isLoading,
  }
}
