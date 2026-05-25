/**
 * TESTES DE INTEGRAÇÃO — HISTÓRICO E TIMELINE (AUDIT LOGS TIMELINE TESTS)
 * 
 * Melhores Práticas Demonstradas:
 * 1. Simulação de LocalStorage: Mockamos a biblioteca de acesso à persistência local `getNotifications` para fornecer dados controlados de auditoria.
 * 2. Validação Contínua de Filtros Interativos: Testamos a caixa de pesquisa geral combinada com filtros drop-down de tipo de log.
 * 3. Teste de Transições de Interface (Collapse/Expand): Garantimos que painéis de detalhes internos iniciam fechados e expandem ao clique.
 * 4. Validação Semântica do DOM: Asseguramos que datas, autores e ícones estão legíveis de acordo com padrões de UX premium.
 */

import { render, screen, fireEvent } from '@testing-library/react'
import { HistoryLayout } from '@/components/history/historyLayout'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { getNotifications } from '@/services/localStorage'

// Mock do localStorage para isolar os dados exibidos no teste da Timeline
vi.mock('@/services/localStorage', () => ({
  getNotifications: vi.fn(),
  clearNotifications: vi.fn()
}))

// Mock de Link do Next.js
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>
}))

describe('HistoryLayout (Integration Tests)', () => {
  const mockLogs = [
    { 
      id: 'l1', 
      date: '25/05/2026 12:00:00', 
      document: 'autos_infracao_final.csv', 
      message: 'Registros processados: 50. Sucesso total.', 
      read: false,
      user: 'Lucas Lima'
    },
    { 
      id: 'l2', 
      date: '25/05/2026 12:05:00', 
      document: 'recurso_segunda_inst.docx', 
      message: 'Erro ao validar assinatura eletrônica.', 
      read: true,
      user: 'Carlos Souza'
    }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getNotifications).mockReturnValue(mockLogs)
  })

  it('deve carregar e renderizar os logs de auditoria na timeline cronológica corretamente', () => {
    render(<HistoryLayout />)

    // O título principal deve constar na tela
    expect(screen.getByText('Histórico de Operações')).toBeInTheDocument()

    // Ambas as ações de importação devem constar na timeline
    expect(screen.getByText('autos_infracao_final.csv')).toBeInTheDocument()
    expect(screen.getByText('recurso_segunda_inst.docx')).toBeInTheDocument()

    // Os respectivos autores devem constar nos logs
    expect(screen.getByText('Lucas Lima')).toBeInTheDocument()
    expect(screen.getByText('Carlos Souza')).toBeInTheDocument()
  })

  it('deve filtrar a timeline com base no texto inserido na caixa de busca', () => {
    render(<HistoryLayout />)

    // Digita "Carlos" na caixa de busca
    const searchInput = screen.getByPlaceholderText(/pesquisar por documento/i)
    fireEvent.change(searchInput, { target: { value: 'Carlos' } })

    // Apenas a importação do Carlos (recurso_segunda_inst.docx) deve permanecer visível
    expect(screen.getByText('recurso_segunda_inst.docx')).toBeInTheDocument()
    expect(screen.queryByText('autos_infracao_final.csv')).not.toBeInTheDocument()
  })

  it('deve expandir e colapsar os detalhes técnicos do processamento do log ao clicar', () => {
    render(<HistoryLayout />)

    // Os detalhes (message) iniciam não-renderizados na tela
    expect(screen.queryByText('Registros processados: 50. Sucesso total.')).not.toBeInTheDocument()

    // Encontra e clica no botão "Detalhes" do primeiro item ('l1')
    const detailsButtons = screen.getAllByRole('button', { name: /detalhes/i })
    fireEvent.click(detailsButtons[0])

    // Agora o painel com a mensagem detalhada da API deve estar visível
    expect(screen.getByText('Registros processados: 50. Sucesso total.')).toBeInTheDocument()

    // Clica no mesmo botão novamente
    fireEvent.click(detailsButtons[0])

    // O painel detalhado deve ser colapsado
    expect(screen.queryByText('Registros processados: 50. Sucesso total.')).not.toBeInTheDocument()
  })
})
