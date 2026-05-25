import { ConsortiumFrameData, LoadConsortium } from '@/schemas/ConsortiumSchema'
import useSWR from 'swr'
import { BaseService } from './BaseService'

export class ConsortiumService extends BaseService {
  async getConsortiums(): Promise<ConsortiumFrameData[]> {
    const response = await this.client.get<LoadConsortium>('/consorcio')
    return response.data.consorcios
  }
}

export const consortiumService = new ConsortiumService()

// Backward compatibility exports
export function GetConsortiums() {
  const { data, mutate } = useSWR<ConsortiumFrameData[]>(
    '/consorcio',
    async () => {
      return consortiumService.getConsortiums()
    },
  )

  return { data, mutate }
}
