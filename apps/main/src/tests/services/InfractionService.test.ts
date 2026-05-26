/**
 * TESTES UNITÁRIOS — CAMADA DE SERVIÇOS (API SERVICES)
 * 
 * Melhores Práticas Demonstradas:
 * 1. Desacoplamento da Infraestrutura (HTTP): Injetamos um mock da interface `IHttpClient` no construtor do serviço.
 *    Isso garante que os testes não façam requisições de verdade (sem efeitos colaterais de rede).
 * 2. Isolamento de Responsabilidade: Testamos apenas o comportamento de negócio do serviço (parâmetros enviados e retornos mapeados).
 * 3. Mocks e Stubs com Vitest: Usamos `vi.fn()` para espionar e controlar as respostas simuladas dos métodos HTTP.
 * 4. Validação de payload e comportamento: Testamos tanto os caminhos felizes (sucesso) quanto a captura robusta de erros.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { InfractionService } from '@/services/infractions'
import { IHttpClient } from '@bonfire/core'

describe('InfractionService (Unit Tests)', () => {
  let mockClient: IHttpClient

  beforeEach(() => {
    // Inicializa stubs para todos os métodos do HttpClient antes de cada teste
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    }
  })

  describe('getAutoInfractions', () => {
    it('deve chamar o endpoint correto com os parâmetros de consulta mapeados', async () => {
      // Massa de dados simulada (Mock Data)
      const mockAutos = [
        { ID_AUTO_INFRACAO: '1', NUM_AI: 'AI001', DAT_INFRACAO: '2026-05-25' },
        { ID_AUTO_INFRACAO: '2', NUM_AI: 'AI002', DAT_INFRACAO: '2026-05-25' }
      ]

      // Configura o mock do GET para retornar os dados esperados
      vi.mocked(mockClient.get).mockResolvedValue({
        data: { autos: mockAutos },
        status: 200,
      })

      // Instancia o serviço injetando o mock do cliente
      const infractionService = new InfractionService(mockClient)
      
      // Executa o método sob teste
      const result = await infractionService.getAutoInfractions('2026-05-25', 'AI001')

      // Assert: Garante que os parâmetros de filtro foram convertidos no Map e repassados como Params
      expect(mockClient.get).toHaveBeenCalledWith('/infracao', {
        params: {
          date: '2026-05-25',
          ai: 'AI001',
        }
      })

      // Assert: Valida se o retorno foi retornado sem modificações no payload
      expect(result).toEqual(mockAutos)
    })
  })

  describe('postAutoInfraction', () => {
    it('deve formatar FormData corretamente e retornar um evento de sucesso ao importar', async () => {
      const mockFile = new File(['csv-data'], 'import.csv', { type: 'text/csv' })
      const mockApiResponse = {
        message: 'Importação concluída com sucesso!'
      }

      vi.mocked(mockClient.post).mockResolvedValue({
        data: mockApiResponse,
        status: 200,
      })

      const infractionService = new InfractionService(mockClient)
      const { event } = await infractionService.postAutoInfraction(mockFile)

      // Assert: Garante que o endpoint multipart correto foi acionado
      expect(mockClient.post).toHaveBeenCalledWith('/infracao/csv', expect.any(FormData), {
        timeout: 320000,
      })

      // Assert: Garante que as propriedades do evento de log de auditoria foram devidamente populadas
      expect(event.document).toBe('import.csv')
      expect(event.message).toBe('Importação concluída com sucesso!')
    })

    it('deve lidar amigavelmente com falhas lançadas pela API', async () => {
      const mockFile = new File(['csv-data'], 'import_failed.csv', { type: 'text/csv' })
      
      // Simula uma falha inesperada na rede ou servidor
      vi.mocked(mockClient.post).mockRejectedValue(new Error('Erro na análise do arquivo CSV'))

      const infractionService = new InfractionService(mockClient)
      const { event } = await infractionService.postAutoInfraction(mockFile)

      // Assert: O serviço não deve crashar, mas sim capturar e mapear o erro para o evento
      expect(event.document).toBe('import_failed.csv')
      expect(event.message).toContain('Erro na análise do arquivo CSV')
    })
  })
})
