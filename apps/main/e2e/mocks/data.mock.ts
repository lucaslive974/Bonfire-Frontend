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
    { NUM_AUTO: 'AI-99992', DATA: '2026-05-28', PLACA: 'ABC-1234', GRAVIDADE: 'Média' }
  ]
}

export let mockRecurses = {
  recurses: [
    { ID: 'R001', NUM_AUTO: 'AI-99992', PLACA: 'ABC-1234', STATUS: 'Julgado' }
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
      { NUM_AUTO: 'AI-99992', DATA: '2026-05-28', PLACA: 'ABC-1234', GRAVIDADE: 'Média' }
    ]
  }
  mockRecurses = {
    recurses: [
      { ID: 'R001', NUM_AUTO: 'AI-99992', PLACA: 'ABC-1234', STATUS: 'Julgado' }
    ]
  }
}
