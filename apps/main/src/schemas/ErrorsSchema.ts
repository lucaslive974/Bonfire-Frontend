import z from 'zod'

export const ErrorSchema = z.object({
  error: z.string(),
  message: z.string(),
  status: z.number().optional(),
  qtdAtas: z.number().optional(),
  qtdTables: z.number().optional(),
})

export type TCustomError = z.infer<typeof ErrorSchema>
