// e2e/pages/infractions.page.ts
import { Page, Locator, expect } from '@playwright/test'

export class InfractionsPage {
  readonly page: Page
  readonly headerTitle: Locator
  readonly badgeText: Locator
  readonly dateFilterInput: Locator
  readonly searchInput: Locator
  readonly mockRow: Locator

  constructor(page: Page) {
    this.page = page
    this.headerTitle = page.locator('h1', { hasText: 'Gestão de Infrações' })
    this.badgeText = page.locator('text=Sincronizado')
    this.dateFilterInput = page.locator('input[placeholder="Filtrar por Data"]')
    this.searchInput = page.locator('input[placeholder="N° Auto de Infração"]')
    this.mockRow = page.locator('text=AI-99992')
  }

  async goto() {
    await this.page.goto('/infractions', { waitUntil: 'domcontentloaded' })
  }

  async assertPageHeaderVisible() {
    await expect(this.headerTitle).toBeVisible()
    await expect(this.badgeText).toBeVisible()
  }

  async assertFiltersVisible() {
    await expect(this.dateFilterInput).toBeVisible()
    await expect(this.searchInput).toBeVisible()
  }

  async fillSearchInput(text: string) {
    await this.searchInput.fill(text)
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
}
