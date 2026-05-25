import { convertToBoolean } from '@/lib/utils'
import { LinesFrameData, LoadLines } from '@/schemas/LinesFrameDataSchema'
import { EventT } from '@/schemas/NotificationSchema'
import { TApiResponse } from '@/schemas/ResponseSchema'
import useSWR from 'swr'
import { BaseService } from './BaseService'
import { HttpError } from './http/HttpClient.interface'

export class LineService extends BaseService {
  async getLines(): Promise<LinesFrameData[]> {
    const response = await this.client.get<LoadLines>('/linha')
    const lines = response.data.linha
    lines?.forEach((linha) => {
      linha.COMPARTILHADA = convertToBoolean(linha.COMPARTILHADA)
      linha.LINH_ATIV_EMPR = convertToBoolean(linha.LINH_ATIV_EMPR)
    })
    return lines
  }

  async updateLine({
    COMPARTILHADA,
    COD_LINH,
    LINH_ATIV_EMPR,
    ID_OPERADORA,
  }: LinesFrameData) {
    const event: EventT = {}
    const linha = [{ COD_LINH, ID_OPERADORA, COMPARTILHADA, LINH_ATIV_EMPR }]
    event.document = COD_LINH

    try {
      const response = await this.client.patch<TApiResponse>('/linha', linha)
      if (response.status === 200) event.message = response.data.message
    } catch (error: any) {
      if (error instanceof HttpError) {
        event.message = error.data?.message || error.message
      } else {
        event.message = error.message || 'Erro desconhecido'
      }
    }
    return { linha: linha[0], event }
  }

  async includeLine({
    COMPARTILHADA,
    COD_LINH,
    LINH_ATIV_EMPR,
    ID_OPERADORA,
  }: LinesFrameData) {
    const linha = [{ COD_LINH, ID_OPERADORA, COMPARTILHADA, LINH_ATIV_EMPR }]
    const event: EventT = {}
    event.document = COD_LINH

    try {
      const response = await this.client.post<TApiResponse>('/linha', linha)
      if (response.status === 201) event.message = response.data.message
    } catch (error: any) {
      if (error instanceof HttpError) {
        event.message = error.data?.message || error.message
      } else {
        event.message = error.message || 'Erro desconhecido'
      }
    }
    return { linha: linha[0], event }
  }

  async deleteLine(COD_LINH: string) {
    const event: EventT = {}
    event.document = COD_LINH

    try {
      const response = await this.client.delete<TApiResponse>(`/linha/${COD_LINH}`)
      if (response.status === 200) event.message = response.data.message
    } catch (error: any) {
      if (error instanceof HttpError) {
        event.message = error.data?.message || error.message
      } else {
        event.message = error.message || 'Erro desconhecido'
      }
    }

    return { COD_LINH, event }
  }
}

export const lineService = new LineService()

// Backward compatibility exports
export function GetLines() {
  const { data, mutate } = useSWR<LinesFrameData[]>('/linha', async () => {
    return lineService.getLines()
  })

  return { data, mutate }
}

export async function UpdateLine(data: LinesFrameData) {
  return lineService.updateLine(data)
}

export async function IncludeLine(data: LinesFrameData) {
  return lineService.includeLine(data)
}

export async function DeleteLine(COD_LINH: string) {
  return lineService.deleteLine(COD_LINH)
}
