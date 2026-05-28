// e2e/pages/vehicles.page.ts
import { Page, Locator, expect } from '@playwright/test'

export class VehiclesPage {
  readonly page: Page
  readonly headerTitle: Locator
  readonly badgeText: Locator
  readonly mockRow: Locator
  readonly includeBtn: Locator
  readonly closeBtn: Locator
  readonly dialogTitle: Locator
  readonly numInput: Locator
  readonly placInput: Locator
  readonly createBtn: Locator
  readonly newMockRow: Locator

  constructor(page: Page) {
    this.page = page
    this.headerTitle = page.locator('h1', { hasText: 'Cadastro de Veículos' })
    this.badgeText = page.locator('text=Frota Ativa')
    this.mockRow = page.locator('text=ABC-1234')
    this.includeBtn = page.locator('button', { hasText: 'Incluir Veículo' })
    this.closeBtn = page.getByRole('button', { name: 'Close' })
    this.dialogTitle = page.locator('h2', { hasText: 'Cadastrar Veículo' })
    
    // Dialog inputs
    this.numInput = page.locator('input[placeholder="Ex: 12040"]')
    this.placInput = page.locator('input[placeholder="Ex: ABC-1234"]')
    this.createBtn = page.locator('button', { hasText: 'Criar Veículo' })
    this.newMockRow = page.locator('text=XYZ-9876')
  }

  async goto() {
    await this.page.goto('/registers/vehicles', { waitUntil: 'domcontentloaded' })
  }

  async assertPageHeaderVisible() {
    await expect(this.headerTitle).toBeVisible()
    await expect(this.badgeText).toBeVisible()
  }

  async assertMockRowVisible() {
    await expect(this.mockRow).toBeVisible()
  }

  async clickIncludeVehicle() {
    await expect(this.includeBtn).toBeVisible()
    await this.includeBtn.click()
  }

  async clickCloseIncludeVehicle() {
    await expect(this.closeBtn).toBeVisible()
    await this.closeBtn.click()
  }

  async assertDialogOpened() {
    await expect(this.dialogTitle).toBeVisible()
  }

  async fillVehicleForm(num: string, plac: string) {
    await this.numInput.pressSequentially(num, { delay: 100 })
    await this.placInput.pressSequentially(plac, { delay: 100 })
  }

  async submitVehicleForm() {
    await expect(this.createBtn).toBeVisible()
    await this.createBtn.click()
  }

  async assertNewVehicleVisible() {
    await expect(this.newMockRow).toBeVisible()
  }
}
