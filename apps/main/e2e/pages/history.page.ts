// e2e/pages/history.page.ts
import { Page, Locator, expect } from '@playwright/test'

export class HistoryPage {
  readonly page: Page
  readonly headerTitle: Locator
  readonly searchLogsInput: Locator

  constructor(page: Page) {
    this.page = page
    this.headerTitle = page.locator('h1', { hasText: 'Histórico de Operações' })
    this.searchLogsInput = page.locator('input[placeholder="Pesquisar por documento, e-mail do autor ou conteúdo..."]')
  }

  async goto() {
    await this.page.goto('/history', { waitUntil: 'domcontentloaded' })
  }

  async assertPageHeaderVisible() {
    await expect(this.headerTitle).toBeVisible()
  }

  async assertSearchInputVisible() {
    await expect(this.searchLogsInput).toBeVisible()
  }
}
