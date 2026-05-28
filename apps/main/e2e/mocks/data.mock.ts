// e2e/mocks/data.mock.ts

export let mockConsortiums = {
  consorcios: [
    { ID: 'C001', NOME: 'Consórcio Leste-Oeste', CONCESSIONARIA: 'Expresso Municipal' },
    { ID: 'C002', NOME: 'Consórcio Sul-Norte', CONCESSIONARIA: 'TransLuz' }
  ]
}

export let mockVehicles = {
  veiculos: [
    { NUM_VEIC: '10022', IDN_PLAC_VEIC: 'ABC-1234', VEIC_ATIV_EMPR: true },
    { NUM_VEIC: '20044', IDN_PLAC_VEIC: 'KGE-9876', VEIC_ATIV_EMPR: false }
  ]
}

export let mockLines = {
  linha: [
    { COD_LINH: '5502C', COMPARTILHADA: false, ID_OPERADORA: 1, LINH_ATIV_EMPR: true },
    { COD_LINH: '8207A', COMPARTILHADA: true, ID_OPERADORA: 2, LINH_ATIV_EMPR: true }
  ]
}

export let mockInfractions = {
  autos: [
    {
      NUM_NOTF: 'NOT-12345',
      TIP_PENL: 'Multa',
      NUM_AI: 'AI-99992',
      NOM_CONC: 'Expresso Municipal',
      COD_LINH: '5502C',
      NOM_LINH: 'Linha Centro',
      NUM_VEIC: 10022,
      IDN_PLAC_VEIC: 'ABC-1234',
      DAT_OCOR_INFR: new Date('2026-05-28T10:00:00Z').getTime(),
      DAT_OCOR_INFR_STR: '2026-05-28',
      DES_LOCA: 'Av. Principal, 100',
      COD_IRRG_FISC: 1,
      ARTIGO: 'Art. 181',
      DESC_OBSE: 'Sem observações',
      NUM_MATR_FISC: 999,
      QTE_PONT: 4,
      DAT_EMIS_NOTF: new Date('2026-05-28T12:00:00Z').getTime(),
      DAT_EMIS_NOTF_STR: '2026-05-28',
      DAT_LIMIT_RECU: new Date('2026-06-28T23:59:59Z').toISOString(),
      VAL_INFR: 195.23,
      DAT_CANC: new Date('2026-07-28T23:59:59Z').toISOString()
    }
  ]
}

export let mockRecurses = {
  recurses: [
    {
      COD_LINH: '5502C',
      DAT_PUBL: '2026-05-28',
      DAT_VENC: '2026-06-28',
      IDN_PLAC_VEIC: 'ABC-1234',
      NUM_AI: 'AI-99992',
      NUM_ATA: 105,
      NUM_VEIC: 10022
    }
  ]
}

export function resetMockData() {
  mockConsortiums = {
    consorcios: [
      { ID: 'C001', NOME: 'Consórcio Leste-Oeste', CONCESSIONARIA: 'Expresso Municipal' },
      { ID: 'C002', NOME: 'Consórcio Sul-Norte', CONCESSIONARIA: 'TransLuz' }
    ]
  }
  mockVehicles = {
    veiculos: [
      { NUM_VEIC: '10022', IDN_PLAC_VEIC: 'ABC-1234', VEIC_ATIV_EMPR: true },
      { NUM_VEIC: '20044', IDN_PLAC_VEIC: 'KGE-9876', VEIC_ATIV_EMPR: false }
    ]
  }
  mockLines = {
    linha: [
      { COD_LINH: '5502C', COMPARTILHADA: false, ID_OPERADORA: 1, LINH_ATIV_EMPR: true },
      { COD_LINH: '8207A', COMPARTILHADA: true, ID_OPERADORA: 2, LINH_ATIV_EMPR: true }
    ]
  }
  mockInfractions = {
    autos: [
      {
        NUM_NOTF: 'NOT-12345',
        TIP_PENL: 'Multa',
        NUM_AI: 'AI-99992',
        NOM_CONC: 'Expresso Municipal',
        COD_LINH: '5502C',
        NOM_LINH: 'Linha Centro',
        NUM_VEIC: 10022,
        IDN_PLAC_VEIC: 'ABC-1234',
        DAT_OCOR_INFR: new Date('2026-05-28T10:00:00Z').getTime(),
        DAT_OCOR_INFR_STR: '2026-05-28',
        DES_LOCA: 'Av. Principal, 100',
        COD_IRRG_FISC: 1,
        ARTIGO: 'Art. 181',
        DESC_OBSE: 'Sem observações',
        NUM_MATR_FISC: 999,
        QTE_PONT: 4,
        DAT_EMIS_NOTF: new Date('2026-05-28T12:00:00Z').getTime(),
        DAT_EMIS_NOTF_STR: '2026-05-28',
        DAT_LIMIT_RECU: new Date('2026-06-28T23:59:59Z').toISOString(),
        VAL_INFR: 195.23,
        DAT_CANC: new Date('2026-07-28T23:59:59Z').toISOString()
      }
    ]
  }
  mockRecurses = {
    recurses: [
      {
        COD_LINH: '5502C',
        DAT_PUBL: '2026-05-28',
        DAT_VENC: '2026-06-28',
        IDN_PLAC_VEIC: 'ABC-1234',
        NUM_AI: 'AI-99992',
        NUM_ATA: 105,
        NUM_VEIC: 10022
      }
    ]
  }
}
