// e2e/pages/login.page.ts
import { Page, Locator, expect } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly userInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly errorCard: Locator
  readonly profileName: Locator
  readonly profileEmail: Locator
  readonly dashboardButton: Locator

  constructor(page: Page) {
    this.page = page
    this.userInput = page.locator('input[placeholder="Seu usuário ou e-mail"]')
    this.passwordInput = page.locator('input[placeholder="Sua senha de acesso"]')
    this.submitButton = page.locator('button[type="submit"]')
    this.errorCard = page.locator('text=Usuário ou senha inválidos.')
    this.profileName = page.locator('text=Usuário Teste')
    this.profileEmail = page.locator('text=teste@bonfire.gov.br')
    this.dashboardButton = page.locator('text=Acessar Painel Principal')
  }

  async goto() {
    await this.page.goto('/login', { waitUntil: 'domcontentloaded' })
  }

  async login(user: string, pass: string) {
    await this.userInput.pressSequentially(user, { delay: 200 })
    await this.passwordInput.pressSequentially(pass, { delay: 100 })
    await this.submitButton.click()
  }

  async assertErrorVisible() {
    await expect(this.errorCard).toBeVisible()
  }

  async assertProfileCardVisible() {
    await expect(this.profileName).toBeVisible({ timeout: 15000 })
    await expect(this.profileEmail).toBeVisible()
    await expect(this.dashboardButton).toBeVisible()
  }
}
