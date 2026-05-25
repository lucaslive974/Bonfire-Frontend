import { TResponseImport } from '@/schemas/ImportFormSchema'
import { AutoData } from '@/schemas/Infractions'
import { EventT } from '@/schemas/NotificationSchema'
import { BaseService } from './BaseService'
import { HttpError } from './http/HttpClient.interface'

interface ILoadAutos {
  autos: AutoData[]
}

export class InfractionService extends BaseService {
  async getAutoInfractions(date?: string, ai?: string): Promise<AutoData[]> {
    const map = new Map()

    if (date) map.set('date', date)
    if (ai) map.set('ai', ai)

    const response = await this.client.get<ILoadAutos>('/infracao', {
      params: Object.fromEntries(map.entries()),
    })

    return response.data.autos
  }

  async postAutoInfraction(file: File) {
    if (!file) throw new Error('Auto vazio')

    const event: EventT = {}
    const body = new FormData()
    event.document = file.name

    body.append('file', file, file.name)

    try {
      const response = await this.client.post<TResponseImport>('/infracao/csv', body, {
        timeout: 320000,
      })
      if (response.status === 200) {
        event.message = response.data.message
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

export const infractionService = new InfractionService()

// Backward compatibility exports
export async function GetAutoInfractions(date?: string, ai?: string): Promise<AutoData[]> {
  return infractionService.getAutoInfractions(date, ai)
}

export async function PostAutoInfraction(file: File) {
  return infractionService.postAutoInfraction(file)
}
