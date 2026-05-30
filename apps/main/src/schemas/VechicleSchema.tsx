import z from 'zod'

import { bool_converter_helper } from '@/lib/utils'

export const VehicleSchema = z.object({
  NUM_VEIC: z.string().min(1),
  IDN_PLAC_VEIC: z.string().min(1).optional(),
  VEIC_ATIV_EMPR: z.boolean().transform(bool_converter_helper),
})

export type VehiclesData = z.infer<typeof VehicleSchema>

export type LoadVehicles = {
  veiculos: VehiclesData[]
}
