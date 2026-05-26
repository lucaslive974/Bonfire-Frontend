import { ImportFormData } from '@/schemas/ImportFormSchema'
import { infractionService } from '@/services/infractions'
import { useState } from 'react'
import { useNotifications } from './useNotifications'
import { notify } from '@/lib/utils'

export function useInfractions() {
  // Função de handling do import
  const [importing, setImporting] = useState(false)
  const { handleInsert: handleInsertNotification } = useNotifications()

  async function HandleImportAutoInfractions(data: ImportFormData) {
    if (!data.file) return
    try {
      setImporting(true)
      const { event } = await infractionService.postAutoInfraction(data.file)
      notify.success(event.message)
      handleInsertNotification(event)
    } finally {
      setImporting(false)
    }
  }

  return { importing, HandleImportAutoInfractions }
}
