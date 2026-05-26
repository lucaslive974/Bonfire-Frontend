import { z } from 'zod'

export const ConsortiumSchema = z.object({
  id: z.number().min(1),
  nome: z.string().min(1),
  concessionaria: z.string().min(1),
})

export type ConsortiumFrameData = z.infer<typeof ConsortiumSchema>

export type LoadConsortium = {
  consorcios: ConsortiumFrameData[]
}
