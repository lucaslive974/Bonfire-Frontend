/**
 * TESTES DE INTEGRAÇÃO — PÁGINA PRIVADA (PROFILE SERVER COMPONENT)
 * 
 * Melhores Práticas Demonstradas:
 * 1. Testando Server Components: Mockamos o driver de servidor `authServerService` para simular estados de sessão de forma síncrona nos testes de renderização.
 * 2. Validação de Acesso Restrito (Fallback): Asseguramos que o componente se comporta corretamente sob acessos unauthenticated.
 * 3. Mock do Layout: Isolamos o componente sob teste substituindo componentes de layout por stubs de renderização simples para focar nas asserções do perfil.
 */

import { render, screen } from '@testing-library/react'
import ProfilePage from '@/app/profile/page'
import { authServerService } from '@bonfire/core'
import { vi, describe, it, expect } from 'vitest'

// Mock do driver de autenticação do servidor
vi.mock('@bonfire/core', async (importOriginal) => {
  const original = await importOriginal<typeof import('@bonfire/core')>()
  return {
    ...original,
    authServerService: {
      getSession: vi.fn(),
      getUser: vi.fn(),
    }
  }
})

// Mock do PrimaryLayout para simplificar a montagem da árvore do DOM
vi.mock('@/components/ui/primaryLayout', () => ({
  PrimaryLayout: ({ children }: any) => <div>{children}</div>
}))

describe('ProfilePage Server Component (Integration Tests)', () => {
  it('deve renderizar o card de perfil com os dados do usuário quando autenticado', async () => {
    const mockSession = {
      user: { name: 'Lucas Lima', email: 'lucas@example.com' },
      accessToken: 'server-token-555'
    }
    
    // Configura o mock da sessão ativa
    vi.mocked(authServerService.getSession).mockResolvedValue(mockSession)

    // Renderiza a página (Server Component)
    render(await ProfilePage())

    // Garante que o nome do usuário e e-mail estão visíveis no card
    expect(screen.getByText('Lucas Lima')).toBeInTheDocument()
    expect(screen.getByText('lucas@example.com')).toBeInTheDocument()

    // Garante que o nível de acesso e tokens correspondentes constam
    expect(screen.getByText('Administrador ERP')).toBeInTheDocument()
    expect(screen.getByText('Bearer server-token-555')).toBeInTheDocument()
  })

  it('deve exibir a mensagem de "Sem sessão ativa" e restringir acesso quando NÃO autenticado', async () => {
    // Configura o mock para simular ausência de sessão (usuário unauthenticated)
    vi.mocked(authServerService.getSession).mockResolvedValue(null)

    render(await ProfilePage())

    // Garante que o card de erro de sessão é renderizado impedindo a leitura do perfil
    expect(screen.getByText('Sem sessão ativa')).toBeInTheDocument()
    expect(screen.getByText(/Você precisa estar autenticado para visualizar os dados de perfil/i)).toBeInTheDocument()

    // O nome do usuário não deve estar no DOM
    expect(screen.queryByText('Lucas Lima')).not.toBeInTheDocument()
  })
})
