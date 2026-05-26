// Função de handling do import
import { useState } from 'react'
import { useNotifications } from '@/hooks/useNotifications'
import { ImportFormData } from '@/schemas/ImportFormSchema'
import { recurseService } from '@/services/recurse'
import { notify } from '@/lib/utils'

export function useRecurses() {
  const [importingFirst, setImportingFirst] = useState(false)
  const [importingSecond, setImportingSecond] = useState(false)
  const { handleInsert: handleInsertNotification } = useNotifications()

  async function HandleImport(data: ImportFormData, instance?: number) {
    if (!data.file) return
    try {
      instance === 1 ? setImportingFirst(true) : setImportingSecond(true)
      const { event } = await recurseService.postRecurse(data.file, instance)
      notify.success(event.message)
      handleInsertNotification(event)
    } finally {
      instance === 1 ? setImportingFirst(false) : setImportingSecond(false)
    }
  }

  return { importingFirst, importingSecond, HandleImport }
}
