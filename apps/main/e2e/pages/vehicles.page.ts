// e2e/pages/vehicles.page.ts
import { Page, Locator, expect } from '@playwright/test'

export class VehiclesPage {
  readonly page: Page
  readonly headerTitle: Locator
  readonly badgeText: Locator
  readonly mockRow: Locator
  readonly includeBtn: Locator
  readonly dialogTitle: Locator
  readonly cancelBtn: Locator
  readonly numInput: Locator
  readonly placInput: Locator
  readonly createBtn: Locator
  readonly newMockRow: Locator
  readonly filterInput: Locator

  readonly closeBtn: Locator

  constructor(page: Page) {
    this.page = page
    this.headerTitle = page.locator('h1', { hasText: 'Cadastro de Veículos' })
    this.badgeText = page.locator('text=Frota Ativa')
    this.mockRow = page.locator('text=ABC-1234')
    this.includeBtn = page.locator('button', { hasText: 'Incluir Veículo' })
    this.dialogTitle = page.locator('h2', { hasText: 'Cadastrar Veículo' })
    this.cancelBtn = page.locator('button', { hasText: 'Cancelar' })
    this.closeBtn = page.getByRole('button', { name: 'Close' })
    
    // Dialog inputs
    this.numInput = page.locator('input[placeholder="Ex: 12040"]')
    this.placInput = page.locator('input[placeholder="Ex: ABC-1234"]')
    this.createBtn = page.locator('button', { hasText: 'Criar Veículo' })
    this.newMockRow = page.locator('text=XYZ-9876')
    this.filterInput = page.locator('input[placeholder="Filtrar por Placa"]')
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

  async assertMockRowHidden() {
    await expect(this.mockRow).toBeHidden()
  }

  async clickIncludeVehicle() {
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

  async fillVehicleForm(num: string, plac: string) {
    await this.numInput.fill(num)
    await this.placInput.fill(plac)
  }

  async submitVehicleForm() {
    await expect(this.createBtn).toBeVisible()
    await this.createBtn.click()
  }

  async assertNewVehicleVisible() {
    await expect(this.newMockRow).toBeVisible()
  }

  async filterByPlaca(placa: string) {
    await expect(this.filterInput).toBeVisible()
    await this.filterInput.fill(placa)
  }
}
