// e2e/pages/lines.page.ts
import { Page, Locator, expect } from '@playwright/test'

export class LinesPage {
  readonly page: Page
  readonly headerTitle: Locator
  readonly badgeText: Locator
  readonly mockRow: Locator
  readonly includeBtn: Locator
  readonly dialogTitle: Locator
  readonly cancelBtn: Locator
  readonly codeInput: Locator
  readonly operatorInput: Locator
  readonly createBtn: Locator
  readonly newMockRow: Locator
  readonly filterInput: Locator

  readonly closeBtn: Locator

  constructor(page: Page) {
    this.page = page
    this.headerTitle = page.locator('h1', { hasText: 'Cadastro de Linhas' })
    this.badgeText = page.locator('text=Rotas Ativas')
    this.mockRow = page.locator('text=5502C')
    this.includeBtn = page.locator('button', { hasText: 'Incluir Linha' })
    this.dialogTitle = page.locator('h2', { hasText: 'Cadastrar Linha' })
    this.cancelBtn = page.locator('button', { hasText: 'Cancelar' })
    this.closeBtn = page.getByRole('button', { name: 'Close' })
    
    // Dialog inputs
    this.codeInput = page.locator('input[placeholder="Ex: L102"]')
    this.operatorInput = page.locator('input[placeholder="Ex: OP-01"]')
    this.createBtn = page.locator('button', { hasText: 'Criar Linha' })
    this.newMockRow = page.locator('text=L999A')
    this.filterInput = page.locator('input[placeholder="Filtrar por Linha"]')
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

  async assertMockRowHidden() {
    await expect(this.mockRow).toBeHidden()
  }

  async clickIncludeLine() {
    await expect(this.includeBtn).toBeVisible()
    await this.includeBtn.click()
  }

  async clickCancel() {
    await expect(this.cancelBtn).toBeVisible()
    await this.cancelBtn.click()
  }

  async clickClose() {
    await expect(this.closeBtn).toBeVisible()
    await this.closeBtn.click()
  }

  async assertDialogOpened() {
    await expect(this.dialogTitle).toBeVisible()
  }

  async assertDialogClosed() {
    await expect(this.dialogTitle).toBeHidden()
  }

  async fillLineForm(code: string, operator: string) {
    await this.codeInput.fill(code)
    await this.operatorInput.fill(operator)
  }

  async submitLineForm() {
    await expect(this.createBtn).toBeVisible()
    await this.createBtn.click()
  }

  async assertNewLineVisible() {
    await expect(this.newMockRow).toBeVisible()
  }

  async filterByLinha(linha: string) {
    await expect(this.filterInput).toBeVisible()
    await this.filterInput.fill(linha)
  }
}
