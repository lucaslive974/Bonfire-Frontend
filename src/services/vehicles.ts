import { convertToBoolean } from '@/lib/utils'
import { EventT } from '@/schemas/NotificationSchema'
import { TApiResponse } from '@/schemas/ResponseSchema'
import { LoadVehicles, VehiclesData } from '@/schemas/VechicleSchema'
import useSWR from 'swr'
import { BaseService } from './BaseService'
import { HttpError } from './http/HttpClient.interface'

export class VehicleService extends BaseService {
  async getVehicles(): Promise<VehiclesData[]> {
    const response = await this.client.get<LoadVehicles>('/veiculos')
    const vehicles = response.data.veiculos
    vehicles?.forEach((vehicle) => {
      vehicle.VEIC_ATIV_EMPR = convertToBoolean(vehicle.VEIC_ATIV_EMPR)
    })
    return vehicles
  }

  async updateVehicles({
    IDN_PLAC_VEIC,
    NUM_VEIC,
    VEIC_ATIV_EMPR,
  }: VehiclesData) {
    const data = [{ IDN_PLAC_VEIC, NUM_VEIC, VEIC_ATIV_EMPR }]
    const event: EventT = {}
    event.document = NUM_VEIC

    try {
      const response = await this.client.patch<TApiResponse>('/veiculos', data)
      if (response.status === 202) {
        event.message = response.data.message
      }
    } catch (error: any) {
      if (error instanceof HttpError) {
        event.message = error.data?.message || error.message
      } else {
        event.message = error.message || 'Erro desconhecido'
      }
    }
    return { vehicle: data[0], event }
  }

  async insertVehicles({
    IDN_PLAC_VEIC,
    NUM_VEIC,
    VEIC_ATIV_EMPR,
  }: VehiclesData) {
    const data = [{ IDN_PLAC_VEIC, NUM_VEIC, VEIC_ATIV_EMPR }]
    const event: EventT = {}
    event.document = NUM_VEIC

    try {
      const response = await this.client.post<TApiResponse>('/veiculos', data)
      if (response.status === 201) {
        event.message = response.data.message
      }
    } catch (error: any) {
      if (error instanceof HttpError) {
        event.message = error.data?.message || error.message
      } else {
        event.message = error.message || 'Erro desconhecido'
      }
    }
    return { vehicle: data[0], event }
  }

  async deleteVehicles(NUM_VEIC: string) {
    const event: EventT = {}
    event.document = NUM_VEIC

    try {
      const response = await this.client.delete<TApiResponse>(`/veiculos/${NUM_VEIC}`)
      if (response.status === 202) {
        event.message = response.data.message
      }
    } catch (error: any) {
      if (error instanceof HttpError) {
        event.message = error.data?.message || error.message
      } else {
        event.message = error.message || 'Erro desconhecido'
      }
    }

    return { NUM_VEIC, event }
  }
}

export const vehicleService = new VehicleService()

// Backward compatibility exports
export function GetVehicles() {
  const { data, mutate } = useSWR<VehiclesData[]>('/veiculos', async () => {
    return vehicleService.getVehicles()
  })

  return { data, mutate }
}

export async function UpdateVehicles(data: VehiclesData) {
  return vehicleService.updateVehicles(data)
}

export async function InsertVehicles(data: VehiclesData) {
  return vehicleService.insertVehicles(data)
}

export async function DeleteVehicles(NUM_VEIC: string) {
  return vehicleService.deleteVehicles(NUM_VEIC)
}
