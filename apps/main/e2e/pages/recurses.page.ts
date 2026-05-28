// e2e/pages/recurses.page.ts
import { Page, Locator, expect } from '@playwright/test'

export class RecursesPage {
  readonly page: Page
  readonly firstInstanceHeader: Locator
  readonly firstInstanceBadge: Locator
  readonly secondInstanceHeader: Locator
  readonly secondInstanceBadge: Locator

  constructor(page: Page) {
    this.page = page
    this.firstInstanceHeader = page.locator('h1', { hasText: 'Recursos em 1ª Instância' })
    this.firstInstanceBadge = page.locator('text=JARI Ativa')
    this.secondInstanceHeader = page.locator('h1', { hasText: 'Recursos em 2ª Instância' })
    this.secondInstanceBadge = page.locator('text=SETRA / SUMOB Ativo')
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
}
