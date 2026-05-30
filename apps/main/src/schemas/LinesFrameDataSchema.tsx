import z from 'zod'

import { bool_converter_helper } from '@/lib/utils'

export const LinesFrameDataSchema = z.object({
  COD_LINH: z.string().min(1, { message: 'Insira o código da linha' }),
  COMPARTILHADA: z.boolean().transform(bool_converter_helper),
  ID_OPERADORA: z.number(),
  LINH_ATIV_EMPR: z.boolean().transform(bool_converter_helper),
})

export type LinesFrameData = z.infer<typeof LinesFrameDataSchema>

export type LoadLines = {
  linha: LinesFrameData[]
}

export type TPatchLines = {
  message: string
  counter: string
}
