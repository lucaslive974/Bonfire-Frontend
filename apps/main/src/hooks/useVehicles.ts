import { VehicleContext } from '@/contexts/vehicleContext'
import { VehiclesData } from '@/schemas/VechicleSchema'
import {
  DeleteVehicles,
  InsertVehicles,
  UpdateVehicles,
} from '@/services/vehicles'
import { useContext } from 'react'
import { useNotifications } from './useNotifications'
import { notify } from '@/lib/utils'

export function useVehicles() {
  const { data, mutate } = useContext(VehicleContext)
  const { handleInsert: handleInsertNotification } = useNotifications()

  async function handleUpdate(vehicle: VehiclesData) {
    const { vehicle: updatedVehicle, event } = await UpdateVehicles(vehicle)
    handleInsertNotification(event)
    notify.success(event.message)

    if (data) {
      const updatedData = [...data, updatedVehicle]
      mutate(updatedData, true)
    }
  }

  async function handleInsert(vehicle: VehiclesData) {
    const { vehicle: insertedVehicle, event } = await InsertVehicles(vehicle)
    handleInsertNotification(event)
    notify.success(event.message)

    if (data) {
      const updatedData = [...data, insertedVehicle]
      mutate(updatedData, true)
    }
  }

  async function handleDelete(NUM_VEIC: string) {
    const { NUM_VEIC: deletedVehicle, event } = await DeleteVehicles(NUM_VEIC)
      notify.success(event.message)

    if (data) {
      const updatedData = data.filter(
        (vehicle) => vehicle.NUM_VEIC !== deletedVehicle,
      )
      mutate(updatedData, true)
    }
  }

  return { handleInsert, handleUpdate, handleDelete }
}
