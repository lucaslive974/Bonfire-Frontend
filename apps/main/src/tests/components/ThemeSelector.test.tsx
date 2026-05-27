/**
 * UNIT TESTS — THEME SELECTOR COMPONENT
 * 
 * Verified Scenarios:
 * 1. Active Theme Rendering: Ensures that the corresponding button is styled as active under different initial themes ('light', 'dark', 'system').
 * 2. Theme Switching Actions: Verifies that clicking on each theme option correctly triggers the next-themes `setTheme` callback.
 */

import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeSelector } from '@bonfire/ui'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { useTheme } from 'next-themes'

// Mock next-themes useTheme hook
vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}))

describe('ThemeSelector UI Component (Unit Tests)', () => {
  const mockSetTheme = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve renderizar e destacar o botão do Light Mode quando o tema ativo for "light"', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      themes: ['light', 'dark', 'system'],
      systemTheme: 'dark',
    })

    render(<ThemeSelector />)

    const lightBtn = screen.getByTitle('Light Mode')
    const darkBtn = screen.getByTitle('Dark Mode')
    const systemBtn = screen.getByTitle('System Default')

    // Verifica se o botão light tem a classe de ativo (bg-white ou bg-zinc-800 e cor âmbar)
    expect(lightBtn.className).toContain('text-amber-500')
    expect(lightBtn.className).toContain('bg-white')

    // Os outros botões devem possuir a cor inativa (text-zinc-400)
    expect(darkBtn.className).toContain('text-zinc-400')
    expect(systemBtn.className).toContain('text-zinc-400')
  })

  it('deve renderizar e destacar o botão do Dark Mode quando o tema ativo for "dark"', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      themes: ['light', 'dark', 'system'],
      systemTheme: 'light',
    })

    render(<ThemeSelector />)

    const lightBtn = screen.getByTitle('Light Mode')
    const darkBtn = screen.getByTitle('Dark Mode')
    const systemBtn = screen.getByTitle('System Default')

    // Dark deve estar destacado
    expect(darkBtn.className).toContain('text-amber-500')
    expect(darkBtn.className).toContain('bg-white')

    // Outros inativos
    expect(lightBtn.className).toContain('text-zinc-400')
    expect(systemBtn.className).toContain('text-zinc-400')
  })

  it('deve renderizar e destacar o botão do System Default quando o tema ativo for "system"', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'system',
      setTheme: mockSetTheme,
      themes: ['light', 'dark', 'system'],
      systemTheme: 'dark',
    })

    render(<ThemeSelector />)

    const lightBtn = screen.getByTitle('Light Mode')
    const darkBtn = screen.getByTitle('Dark Mode')
    const systemBtn = screen.getByTitle('System Default')

    // System deve estar destacado
    expect(systemBtn.className).toContain('text-amber-500')
    expect(systemBtn.className).toContain('bg-white')

    // Outros inativos
    expect(lightBtn.className).toContain('text-zinc-400')
    expect(darkBtn.className).toContain('text-zinc-400')
  })

  it('deve chamar a callback setTheme("light") ao clicar no botão de Light Mode', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      themes: ['light', 'dark', 'system'],
    })

    render(<ThemeSelector />)

    const lightBtn = screen.getByTitle('Light Mode')
    fireEvent.click(lightBtn)

    expect(mockSetTheme).toHaveBeenCalledWith('light')
  })

  it('deve chamar a callback setTheme("dark") ao clicar no botão de Dark Mode', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      themes: ['light', 'dark', 'system'],
    })

    render(<ThemeSelector />)

    const darkBtn = screen.getByTitle('Dark Mode')
    fireEvent.click(darkBtn)

    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })

  it('deve chamar a callback setTheme("system") ao clicar no botão de System Default', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      themes: ['light', 'dark', 'system'],
    })

    render(<ThemeSelector />)

    const systemBtn = screen.getByTitle('System Default')
    fireEvent.click(systemBtn)

    expect(mockSetTheme).toHaveBeenCalledWith('system')
  })
})
