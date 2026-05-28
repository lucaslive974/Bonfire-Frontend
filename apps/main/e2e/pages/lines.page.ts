// e2e/pages/lines.page.ts
import { Page, Locator, expect } from '@playwright/test'

export class LinesPage {
  readonly page: Page
  readonly headerTitle: Locator
  readonly badgeText: Locator
  readonly mockRow: Locator
  readonly includeBtn: Locator
  readonly dialogTitle: Locator

  constructor(page: Page) {
    this.page = page
    this.headerTitle = page.locator('h1', { hasText: 'Cadastro de Linhas' })
    this.badgeText = page.locator('text=Rotas Ativas')
    this.mockRow = page.locator('text=5502C')
    this.includeBtn = page.locator('button', { hasText: 'Incluir Linha' })
    this.dialogTitle = page.locator('h2', { hasText: 'Cadastrar Linha' })
  }

  async goto() {
    await this.page.goto('/registers/lines', { waitUntil: 'domcontentloaded' })
  }

  async assertPageHeaderVisible() {
    await expect(this.headerTitle).toBeVisible()
    await expect(this.badgeText).toBeVisible()
  }

  async assertMockRowVisible() {
    await expect(this.mockRow).toBeVisible()
  }

  async clickIncludeLine() {
    await expect(this.includeBtn).toBeVisible()
    await this.includeBtn.click()
  }

  async assertDialogOpened() {
    await expect(this.dialogTitle).toBeVisible()
  }
}
