// e2e/pages/consortium.page.ts
import { Page, Locator, expect } from '@playwright/test'

export class ConsortiumPage {
  readonly page: Page
  readonly headerTitle: Locator
  readonly badgeText: Locator
  readonly tableHeaderCode: Locator
  readonly tableHeaderName: Locator
  readonly mockRow: Locator
  readonly filterInput: Locator

  constructor(page: Page) {
    this.page = page
    this.headerTitle = page.locator('h1', { hasText: 'Consórcios Cadastrados' })
    this.badgeText = page.locator('text=Operação Unificada')
    this.tableHeaderCode = page.locator('text=Código').first()
    this.tableHeaderName = page.locator('text=Nome').first()
    this.mockRow = page.locator('text=Consórcio Leste-Oeste')
    this.filterInput = page.locator('input[placeholder="Filtrar por Nome"]')
  }

  async goto() {
    await this.page.goto('/registers/consortium', { waitUntil: 'domcontentloaded' })
  }

  async assertPageHeaderVisible() {
    await expect(this.headerTitle).toBeVisible()
    await expect(this.badgeText).toBeVisible()
  }

  async assertTableHeadersVisible() {
    await expect(this.tableHeaderCode).toBeVisible()
    await expect(this.tableHeaderName).toBeVisible()
  }

  async assertMockRowVisible() {
    await expect(this.mockRow).toBeVisible()
  }

  async assertMockRowHidden() {
    await expect(this.mockRow).toBeHidden()
  }

  async filterByName(name: string) {
    await expect(this.filterInput).toBeVisible()
    await this.filterInput.fill(name)
  }
}
