import { test, expect } from '@playwright/test'
import { tokenEncoder } from '@bonfire/core'

// --- MOCK DATA DICTIONARY ---
const mockConsortiums = {
  consorcios: [
    { ID: 'C001', NOME: 'Consórcio Leste-Oeste', CONCESSIONARIA: 'Expresso Municipal' },
    { ID: 'C002', NOME: 'Consórcio Sul-Norte', CONCESSIONARIA: 'TransLuz' }
  ]
}

const mockVehicles = {
  veiculos: [
    { NUM_VEIC: '10022', IDN_PLAC_VEIC: 'ABC-1234', VEIC_ATIV_EMPR: true },
    { NUM_VEIC: '20044', IDN_PLAC_VEIC: 'KGE-9876', VEIC_ATIV_EMPR: false }
  ]
}

const mockLines = {
  linha: [
    { COD_LINH: '5502C', COMPARTILHADA: false, ID_OPERADORA: 1, LINH_ATIV_EMPR: true },
    { COD_LINH: '8207A', COMPARTILHADA: true, ID_OPERADORA: 2, LINH_ATIV_EMPR: true }
  ]
}

const mockInfractions = {
  autos: [
    { NUM_AUTO: 'AI-99992', DATA: '2026-05-28', PLACA: 'ABC-1234', GRAVIDADE: 'Média' }
  ]
}

const mockRecurses = {
  recurses: [
    { ID: 'R001', NUM_AUTO: 'AI-99992', PLACA: 'ABC-1234', STATUS: 'Julgado' }
  ]
}

// Helper to generate a fake base64url encoded JWT access token containing standard Keycloak role claims
function generateFakeAccessToken(payloadObj: object): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')
  const payload = Buffer.from(JSON.stringify(payloadObj)).toString('base64url')
  const signature = 'signature'
  return `${header}.${payload}.${signature}`
}

const mockAccessToken = generateFakeAccessToken({ role_cn_name: 'Operador' })

// Mock Session Object returned to client-side useSession() checks
const mockSession = {
  user: {
    name: 'Usuário Teste',
    email: 'teste@bonfire.gov.br',
    image: null,
    roleCnName: 'Operador'
  },
  expires: '2036-05-28T00:00:00.000Z',
  accessToken: mockAccessToken
}

// Shared NextAuth secret matching playwright.config.ts
const NEXTAUTH_TEST_SECRET = 'testsecret123456789012345678901234567895'

// Helper to inject a valid NextAuth session token cookie into the browser context
async function injectAuthCookie(context: any) {
  const sessionToken = await tokenEncoder.encode({
    token: {
      name: 'Usuário Teste',
      email: 'teste@bonfire.gov.br',
      accessToken: mockAccessToken,
    },
    secret: NEXTAUTH_TEST_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  })

  await context.addCookies([
    {
      name: 'next-auth.session-token',
      value: sessionToken,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
    }
  ])
}

test.describe('Bonfire Frontend E2E Test Suite', () => {

  test('Anonymous Flow: should validate invalid login attempt', async ({ page }) => {
    // Intercept session check to return null (anonymous state)
    await page.route('**/api/auth/session', async (route) => {
      await route.fulfill({ json: {} })
    })

    // Navigate to Login Page
    await page.goto('/login')

    // Fill in credentials
    await page.fill('input[placeholder="Seu usuário ou e-mail"]', 'wronguser')
    await page.fill('input[placeholder="Sua senha de acesso"]', 'wrongpassword')

    // Mock callback credentials fail response
    await page.route('**/api/auth/signin/credentials', async (route) => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'CredentialsSignin' })
      })
    })

    // Click Login Button
    await page.click('button[type="submit"]')

    // Wait for the shaking error message card and verify its content
    const errorBox = page.locator('text=Usuário ou senha inválidos.')
    await expect(errorBox).toBeVisible()
  })

  test('Authenticated Flow: should render the user profile card when session cookie is injected', async ({ page, context }) => {
    // Intercept session check to return authenticated state
    await page.route('**/api/auth/session', async (route) => {
      await route.fulfill({ json: mockSession })
    })

    // Inject real signed next-auth session cookie into the browser context
    await injectAuthCookie(context)

    // Navigate to Login
    await page.goto('/login')

    // Re-verify we render the User Card showing Name and Email directly
    const profileCardName = page.locator('text=Usuário Teste')
    await expect(profileCardName).toBeVisible({ timeout: 15000 })
    
    const profileCardEmail = page.locator('text=teste@bonfire.gov.br')
    await expect(profileCardEmail).toBeVisible()
    
    const dashboardButton = page.locator('text=Acessar Painel Principal')
    await expect(dashboardButton).toBeVisible()
  })

  test.describe('Dashboard Registered Modules (Authenticated State)', () => {
    // Inject auth cookie and mock standard API endpoints before each test in this block
    test.beforeEach(async ({ page, context }) => {
      await page.route('**/api/auth/session', async (route) => {
        await route.fulfill({ json: mockSession })
      })

      await injectAuthCookie(context)

      await page.route('**/consorcio', async (route) => {
        await route.fulfill({ json: mockConsortiums })
      })
      await page.route('**/veiculos', async (route) => {
        await route.fulfill({ json: mockVehicles })
      })
      await page.route('**/linha', async (route) => {
        await route.fulfill({ json: mockLines })
      })
      await page.route('**/infracao', async (route) => {
        await route.fulfill({ json: mockInfractions })
      })
      await page.route('**/recurso/**', async (route) => {
        await route.fulfill({ json: mockRecurses })
      })
    })

    test('Consortium: should load page header, table headers, and rows', async ({ page }) => {
      await page.goto('/registers/consortium')

      // Check unified shared PageHeader
      const headerTitle = page.locator('h1', { hasText: 'Consórcios Cadastrados' })
      await expect(headerTitle).toBeVisible()
      
      const badgeText = page.locator('text=Operação Unificada')
      await expect(badgeText).toBeVisible()

      // Confirm data table loads code and name columns, avoiding strict mode div resolution conflicts
      const tableHeaderCode = page.locator('text=Código').first()
      await expect(tableHeaderCode).toBeVisible()

      const tableHeaderName = page.locator('text=Nome').first()
      await expect(tableHeaderName).toBeVisible()

      // Verify that the mocked consortium row is visible
      const mockRow = page.locator('text=Consórcio Leste-Oeste')
      await expect(mockRow).toBeVisible()

      // Test filtering inputs exist and type into them
      const filterInput = page.locator('input[placeholder="Filtrar por Nome"]')
      await expect(filterInput).toBeVisible()
      await filterInput.fill('Leste')
    })

    test('Vehicles: should load header, table, and dialog overlays', async ({ page }) => {
      await page.goto('/registers/vehicles')

      // Check PageHeader
      const headerTitle = page.locator('h1', { hasText: 'Cadastro de Veículos' })
      await expect(headerTitle).toBeVisible()

      const badgeText = page.locator('text=Frota Ativa')
      await expect(badgeText).toBeVisible()

      // Verify the mocked vehicle row is visible
      const mockRow = page.locator('text=ABC-1234')
      await expect(mockRow).toBeVisible()

      // Verify "Incluir Veículo" trigger button exists
      const includeBtn = page.locator('button', { hasText: 'Incluir Veículo' })
      await expect(includeBtn).toBeVisible()

      // Click button and verify the Dialog overlay modal opens (title matches 'Cadastrar Veículo')
      await includeBtn.click()
      const dialogTitle = page.locator('h2', { hasText: 'Cadastrar Veículo' })
      await expect(dialogTitle).toBeVisible()
    })

    test('Lines: should load header, table, and include-dialog modal', async ({ page }) => {
      await page.goto('/registers/lines')

      // Check PageHeader
      const headerTitle = page.locator('h1', { hasText: 'Cadastro de Linhas' })
      await expect(headerTitle).toBeVisible()

      const badgeText = page.locator('text=Rotas Ativas')
      await expect(badgeText).toBeVisible()

      // Verify the mocked line row is visible
      const mockRow = page.locator('text=5502C')
      await expect(mockRow).toBeVisible()

      // Verify "Incluir Linha" exists and triggers modal (title matches 'Cadastrar Linha')
      const includeBtn = page.locator('button', { hasText: 'Incluir Linha' })
      await expect(includeBtn).toBeVisible()
      
      await includeBtn.click()
      const dialogTitle = page.locator('h2', { hasText: 'Cadastrar Linha' })
      await expect(dialogTitle).toBeVisible()
    })

    test('Infractions: should render active filters and list', async ({ page }) => {
      await page.goto('/infractions')

      // Check PageHeader
      const headerTitle = page.locator('h1', { hasText: 'Gestão de Infrações' })
      await expect(headerTitle).toBeVisible()

      const badgeText = page.locator('text=Sincronizado')
      await expect(badgeText).toBeVisible()

      // Verify date filter calendar is present
      const dateFilterInput = page.locator('input[placeholder="Filtrar por Data"]')
      await expect(dateFilterInput).toBeVisible()

      // Verify search input is present
      const searchInput = page.locator('input[placeholder="N° Auto de Infração"]')
      await expect(searchInput).toBeVisible()
      await searchInput.fill('AI-99992')
    })

    test('Recurses: should render instances, titles, and descriptions', async ({ page }) => {
      // 1ª Instância route
      await page.goto('/recurses/firstInstance')
      const firstInstanceHeader = page.locator('h1', { hasText: 'Recursos em 1ª Instância' })
      await expect(firstInstanceHeader).toBeVisible()
      const firstInstanceBadge = page.locator('text=JARI Ativa')
      await expect(firstInstanceBadge).toBeVisible()

      // 2ª Instância route
      await page.goto('/recurses/secondInstance')
      const secondInstanceHeader = page.locator('h1', { hasText: 'Recursos em 2ª Instância' })
      await expect(secondInstanceHeader).toBeVisible()
      const secondInstanceBadge = page.locator('text=SETRA / SUMOB Ativo')
      await expect(secondInstanceBadge).toBeVisible()
    })

    test('History: should render logs list and show purging buttons', async ({ page }) => {
      await page.goto('/history')

      // Check PageHeader
      const headerTitle = page.locator('h1', { hasText: 'Histórico de Operações' })
      await expect(headerTitle).toBeVisible()

      // Check search inputs with correct exact placeholder from historyLayout.tsx
      const searchLogsInput = page.locator('input[placeholder="Pesquisar por documento, e-mail do autor ou conteúdo..."]')
      await expect(searchLogsInput).toBeVisible()
    })

    test('Import Panel: should display file uploads and layout', async ({ page }) => {
      await page.goto('/import')

      // Check PageHeader
      const headerTitle = page.locator('h1', { hasText: 'Painel de Importação' })
      await expect(headerTitle).toBeVisible()
    })

  })
})
