/**
 * TESTES DE INTEGRAÇÃO — COMPONENTES DE INTERFACE (UI INTEGRATION TESTS)
 * 
 * Melhores Práticas Demonstradas:
 * 1. Simulação de Eventos do Usuário (Event Simulation): Usamos `fireEvent` para clicar nos gatilhos da tela e abrir componentes flutuantes (Popovers).
 * 2. Mock de Custom Hooks: Mockamos o hook customizado `useNotifications` para controlar diretamente a lista e o estado das notificações nos testes da UI.
 * 3. Consultas semânticas (Accessible Queries): Usamos seletores baseados em papéis de acessibilidade como `screen.getByRole` ou `screen.getByText` para emular o uso real.
 * 4. Validação Integrada de Fluxo: Testamos transições visuais de abas (Filtros de Todas vs Não Lidas) e o disparo de eventos de marcação de leitura.
 */

import { render, screen, fireEvent } from '@testing-library/react'
import { NotificationBar } from '@bonfire/ui'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { useNotifications } from '@/hooks/useNotifications'

function TestNotificationBar() {
  const props = useNotifications()
  return <NotificationBar {...props} />
}


// Mock do next-auth/react
vi.mock('next-auth/react', () => ({
  useSession: () => ({
    data: { user: { name: 'Lucas Lima', email: 'lucas@example.com' } }
  })
}))

// Mock do custom hook useNotifications para isolar o estado visual do componente
vi.mock('@/hooks/useNotifications', () => ({
  useNotifications: vi.fn()
}))

describe('NotificationBar (Integration Tests)', () => {
  const mockHandleClear = vi.fn()
  const mockHandleMarkAsRead = vi.fn()
  const mockHandleMarkAllAsRead = vi.fn()

  const mockNotifications = [
    { 
      id: 'n1', 
      date: '25/05/2026 12:00:00', 
      document: 'multas_maio.csv', 
      message: 'Importado com sucesso! Qtd: 23', 
      read: false,
      user: 'Lucas Lima'
    },
    { 
      id: 'n2', 
      date: '25/05/2026 12:10:00', 
      document: 'recurso_instancia1.docx', 
      message: 'Processamento concluído.', 
      read: true,
      user: 'Admin'
    }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Configura o retorno padrão do mock de notificações
    vi.mocked(useNotifications).mockReturnValue({
      notifications: mockNotifications,
      qtdNotifications: 1, // Apenas 1 não lida ('n1')
      handleInsert: vi.fn(),
      handleClear: mockHandleClear,
      handleMarkAsRead: mockHandleMarkAsRead,
      handleMarkAllAsRead: mockHandleMarkAllAsRead
    })
  })

  it('deve renderizar o ícone do sino com a contagem correta de notificações não lidas', () => {
    render(<TestNotificationBar />)

    // Garante que o botão do sino com rótulo semântico está na tela
    const bellButton = screen.getByRole('button', { name: /notificações/i })
    expect(bellButton).toBeInTheDocument()

    // O badge de contagem de notificações não lidas deve mostrar '1'
    const badge = screen.getByText('1')
    expect(badge).toBeInTheDocument()
  })

  it('deve abrir o popover e exibir a lista filtrável de notificações quando clicado', () => {
    render(<TestNotificationBar />)

    // Clica no sino para abrir o popover
    const bellButton = screen.getByRole('button', { name: /notificações/i })
    fireEvent.click(bellButton)

    // Valida o cabeçalho do popover
    expect(screen.getByText('Notificações')).toBeInTheDocument()
    expect(screen.getByText('1 não lida')).toBeInTheDocument()

    // Valida que os dois documentos importados constam na lista
    expect(screen.getByText('multas_maio.csv')).toBeInTheDocument()
    expect(screen.getByText('recurso_instancia1.docx')).toBeInTheDocument()

    // Valida os autores dos logs exibidos nos cards correspondentes
    expect(screen.getByText('Lucas Lima')).toBeInTheDocument()
    expect(screen.getByText('Admin')).toBeInTheDocument()
  })

  it('deve alternar a filtragem de abas entre Todas e Não Lidas', () => {
    render(<TestNotificationBar />)

    // Abre o popover
    const bellButton = screen.getByRole('button', { name: /notificações/i })
    fireEvent.click(bellButton)

    // Ambas aparecem por padrão sob a aba "Todas"
    expect(screen.getByText('multas_maio.csv')).toBeInTheDocument()
    expect(screen.getByText('recurso_instancia1.docx')).toBeInTheDocument()

    // Seleciona a aba de filtro "Não lidas"
    const unreadTabButton = screen.getByRole('button', { name: /não lidas/i })
    fireEvent.click(unreadTabButton)

    // Apenas a notificação não lida ('n1' - multas_maio.csv) deve permanecer renderizada
    expect(screen.getByText('multas_maio.csv')).toBeInTheDocument()
    expect(screen.queryByText('recurso_instancia1.docx')).not.toBeInTheDocument()
  })

  it('deve chamar a ação de marcar como lida ao clicar em uma notificação pendente', () => {
    render(<TestNotificationBar />)

    // Abre o popover
    const bellButton = screen.getByRole('button', { name: /notificações/i })
    fireEvent.click(bellButton)

    // Localiza e clica no card da notificação não lida ('multas_maio.csv')
    const unreadItem = screen.getByText('multas_maio.csv')
    fireEvent.click(unreadItem)

    // Verifica se a ação de marcar como lida correspondente foi devidamente despachada
    expect(mockHandleMarkAsRead).toHaveBeenCalledWith('n1')
  })
})
