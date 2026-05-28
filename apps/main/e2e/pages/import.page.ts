// e2e/pages/import.page.ts
import { Page, Locator, expect } from '@playwright/test'

export class ImportPage {
  readonly page: Page
  readonly headerTitle: Locator

  constructor(page: Page) {
    this.page = page
    this.headerTitle = page.locator('h1', { hasText: 'Painel de Importação' })
  }

  async goto() {
    await this.page.goto('/import', { waitUntil: 'domcontentloaded' })
  }

  async assertPageHeaderVisible() {
    await expect(this.headerTitle).toBeVisible()
  }
}
