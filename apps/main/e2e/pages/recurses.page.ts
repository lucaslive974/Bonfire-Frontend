// e2e/pages/recurses.page.ts
import { Page, Locator, expect } from '@playwright/test'

export class RecursesPage {
  readonly page: Page
  readonly firstInstanceHeader: Locator
  readonly firstInstanceBadge: Locator
  readonly secondInstanceHeader: Locator
  readonly secondInstanceBadge: Locator
  readonly mockRow: Locator
  readonly ataFilterInput: Locator

  constructor(page: Page) {
    this.page = page
    this.firstInstanceHeader = page.locator('h1', { hasText: 'Recursos em 1ª Instância' })
    this.firstInstanceBadge = page.locator('text=JARI Ativa')
    this.secondInstanceHeader = page.locator('h1', { hasText: 'Recursos em 2ª Instância' })
    this.secondInstanceBadge = page.locator('text=SETRA / SUMOB Ativo')
    this.mockRow = page.locator('text=AI-99992')
    this.ataFilterInput = page.locator('input[placeholder="Filtrar por N° Ata"]')
  }

  async gotoFirstInstance() {
    await this.page.goto('/recurses/firstInstance', { waitUntil: 'domcontentloaded' })
  }

  async gotoSecondInstance() {
    await this.page.goto('/recurses/secondInstance', { waitUntil: 'domcontentloaded' })
  }

  async assertFirstInstanceVisible() {
    await expect(this.firstInstanceHeader).toBeVisible()
    await expect(this.firstInstanceBadge).toBeVisible()
  }

  async assertSecondInstanceVisible() {
    await expect(this.secondInstanceHeader).toBeVisible()
    await expect(this.secondInstanceBadge).toBeVisible()
  }

  async assertTableLoaded() {
    await expect(this.page.locator('tbody .animate-pulse')).toHaveCount(0)
  }

  async assertMockRowVisible() {
    await expect(this.mockRow).toBeVisible()
  }

  async assertMockRowHidden() {
    await expect(this.mockRow).toBeHidden()
  }

  async fillAtaFilter(ata: string) {
    await expect(this.ataFilterInput).toBeVisible()
    await this.ataFilterInput.fill(ata)
  }
}
