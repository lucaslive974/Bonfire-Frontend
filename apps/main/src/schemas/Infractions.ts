import z from 'zod'

const autoSchema = z.object({
  NUM_NOTF: z.string(),
  TIP_PENL: z.string(),
  NUM_AI: z.string(),
  NOM_CONC: z.string(),
  COD_LINH: z.string(),
  NOM_LINH: z.string(),
  NUM_VEIC: z.number(),
  IDN_PLAC_VEIC: z.string(),
  DAT_OCOR_INFR: z.number(),
  DAT_OCOR_INFR_STR: z.string(),
  DES_LOCA: z.string(),
  COD_IRRG_FISC: z.number(),
  ARTIGO: z.string(),
  DESC_OBSE: z.string(),
  NUM_MATR_FISC: z.number(),
  QTE_PONT: z.number(),
  DAT_EMIS_NOTF: z.number(),
  DAT_EMIS_NOTF_STR: z.string(),
  DAT_LIMIT_RECU: z.date(),
  VAL_INFR: z.number(),
  DAT_CANC: z.date(),
})

const recurseSchema = z.object({
  COD_LINH: z.string(),
  DAT_PUBL: z.string(),
  DAT_VENC: z.string(),
  IDN_PLAC_VEIC: z.string(),
  NUM_AI: z.string(),
  NUM_ATA: z.number(),
  NUM_VEIC: z.number(),
})

export type AutoData = z.infer<typeof autoSchema>

export type RecurseData = z.infer<typeof recurseSchema>
