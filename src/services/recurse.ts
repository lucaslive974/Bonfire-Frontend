import { RecurseData } from '@/schemas/Infractions'
import { EventT } from '@/schemas/NotificationSchema'
import { TResponseImport } from '@/schemas/ImportFormSchema'
import { BaseService } from './BaseService'
import { HttpError } from './http/HttpClient.interface'

interface ILoadRecurses {
  recurses: RecurseData[]
}

export class RecurseService extends BaseService {
  async getRecurses(
    date: string,
    ata: string,
    instance = 1,
  ): Promise<RecurseData[]> {
    const map = new Map()

    if (date) map.set('date', date)
    if (ata) map.set('ata', ata)

    const response = await this.client.get<ILoadRecurses>(
      `/recurso/${instance === 1 ? 'primeiraInstancia' : 'segundaInstancia'}`,
      {
        params: Object.fromEntries(map.entries()),
      },
    )

    return response.data.recurses
  }

  async postRecurse(file: File, instance = 1) {
    if (!file) throw new Error('Auto vazio')

    const event: EventT = {}
    const body = new FormData()
    event.document = file.name

    body.append('file', file, file.name)

    try {
      const response = await this.client.post<TResponseImport>(
        `/recurso/${instance === 1 ? 'primeiraInstancia' : 'segundaInstancia'}/resultado`,
        body,
        { timeout: 320000 },
      )
      if (response.status === 200) {
        event.message = `${response.data.message} Quantidade: ${response.data.counter}`
      }
    } catch (error: any) {
      if (error instanceof HttpError) {
        event.message = error.data?.message || error.message
      } else {
        event.message = error.message || 'Erro desconhecido'
      }
    }

    return { event }
  }
}

export const recurseService = new RecurseService()
