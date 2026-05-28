import { test, expect } from './fixtures/test-base'
import {
  mockConsortiums,
  mockVehicles,
  mockLines,
  mockInfractions,
  mockRecurses,
  resetMockData
} from './mocks/data.mock'
import {
  mockSession,
  injectAuthCookie
} from './helpers/auth.helper'

test.describe('Bonfire Frontend E2E Test Suite', () => {

  test('Anonymous Flow: should validate invalid login attempt', async ({ page, loginPage }) => {
    // Intercept session check to return null (anonymous state)
    await page.route('**/api/auth/session', async (route) => {
      await route.fulfill({ json: {} })
    })

    // Navigate to Login Page
    await loginPage.goto()

    // Mock callback credentials fail response
    await page.route('**/api/auth/signin/credentials', async (route) => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'CredentialsSignin' })
      })
    })

    // Fill in credentials and submit
    await loginPage.login('wronguser', 'wrongpassword')

    // Wait for the shaking error message card and verify its content
    await loginPage.assertErrorVisible()
  })

  test('Authenticated Flow: should render the user profile card when session cookie is injected', async ({ page, context, loginPage }) => {
    // Intercept session check to return authenticated state
    await page.route('**/api/auth/session', async (route) => {
      await route.fulfill({ json: mockSession })
    })

    // Inject real signed next-auth session cookie into the browser context
    await injectAuthCookie(context)

    // Navigate to Login
    await loginPage.goto()

    // Re-verify we render the User Card showing Name and Email directly
    await loginPage.assertProfileCardVisible()
  })

  test.describe('Dashboard Registered Modules (Authenticated State)', () => {
    // Inject auth cookie and mock standard API endpoints before each test in this block
    test.beforeEach(async ({ page, context }) => {
      // Reset mock data to avoid cross-test pollution
      resetMockData()

      await page.route('**/api/auth/session', async (route) => {
        await route.fulfill({ json: mockSession })
      })

      await injectAuthCookie(context)

      await page.route('**/consorcio', async (route) => {
        await route.fulfill({ status: 200, json: mockConsortiums })
      })

      await page.route('**/veiculos', async (route) => {
        const method = route.request().method()
        if (method === 'POST') {
          const body = route.request().postDataJSON()
          const newVehicles = Array.isArray(body) ? body : [body]
          for (const newV of newVehicles) {
            mockVehicles.veiculos.push({
              NUM_VEIC: newV.NUM_VEIC,
              IDN_PLAC_VEIC: newV.IDN_PLAC_VEIC,
              VEIC_ATIV_EMPR: newV.VEIC_ATIV_EMPR ?? true,
            })
          }
          await route.fulfill({
            status: 201,
            contentType: 'application/json',
            body: JSON.stringify({ message: 'Veículo inserido com sucesso!' })
          })
        } else {
          await route.fulfill({ status: 200, json: mockVehicles })
        }
      })

      await page.route('**/linha', async (route) => {
        await route.fulfill({ status: 200, json: mockLines })
      })
      await page.route('**/infracao', async (route) => {
        await route.fulfill({ status: 200, json: mockInfractions })
      })
      await page.route('**/recurso/**', async (route) => {
        await route.fulfill({ status: 200, json: mockRecurses })
      })
    })

    test('Consortium: should load page header, table headers, and rows', async ({ consortiumPage }) => {
      await consortiumPage.goto()

      // Check unified shared PageHeader
      await consortiumPage.assertPageHeaderVisible()
      
      // Confirm data table loads code and name columns
      await consortiumPage.assertTableHeadersVisible()

      // Verify that the mocked consortium row is visible
      await consortiumPage.assertMockRowVisible()

      // Test filtering inputs exist and type into them
      await consortiumPage.filterByName('Leste')

      // Verify that the mocked consortium row is visible
      await consortiumPage.assertMockRowVisible()
    })

    test('Vehicles: should load header, table, and dialog overlays', async ({ vehiclesPage }) => {
      await vehiclesPage.goto()

      // Check PageHeader
      await vehiclesPage.assertPageHeaderVisible()

      // Verify the mocked vehicle row is visible
      await vehiclesPage.assertMockRowVisible()

      // Click button and verify the Dialog overlay modal opens (title matches 'Cadastrar Veículo')
      await vehiclesPage.clickIncludeVehicle()
      await vehiclesPage.assertDialogOpened()

      // Fill in insertion form fields
      await vehiclesPage.fillVehicleForm('50060', 'XYZ-9876')

      // Click "Criar Veículo" and submit
      await vehiclesPage.submitVehicleForm()

      // Verify that the screen is reactive and the newly created vehicle row appears in the table
      await vehiclesPage.assertNewVehicleVisible()
    })

    test('Lines: should load header, table, and include-dialog modal', async ({ linesPage }) => {
      await linesPage.goto()

      // Check PageHeader
      await linesPage.assertPageHeaderVisible()

      // Verify the mocked line row is visible
      await linesPage.assertMockRowVisible()

      // Verify "Incluir Linha" exists and triggers modal (title matches 'Cadastrar Linha')
      await linesPage.clickIncludeLine()
      await linesPage.assertDialogOpened()
    })

    test('Infractions: should render active filters and list', async ({ infractionsPage }) => {
      await infractionsPage.goto()

      // Check PageHeader
      await infractionsPage.assertPageHeaderVisible()

      // Verify filters are present
      await infractionsPage.assertFiltersVisible()
      await infractionsPage.fillSearchInput('AI-99992')
    })

    test('Recurses: should render instances, titles, and descriptions', async ({ recursesPage }) => {
      // 1ª Instância route
      await recursesPage.gotoFirstInstance()
      await recursesPage.assertFirstInstanceVisible()

      // 2ª Instância route
      await recursesPage.gotoSecondInstance()
      await recursesPage.assertSecondInstanceVisible()
    })

    test('History: should render logs list and show purging buttons', async ({ historyPage }) => {
      await historyPage.goto()

      // Check PageHeader
      await historyPage.assertPageHeaderVisible()

      // Check search inputs with correct exact placeholder from historyLayout.tsx
      await historyPage.assertSearchInputVisible()
    })

    test('Import Panel: should display file uploads and layout', async ({ importPage }) => {
      await importPage.goto()

      // Check PageHeader
      await importPage.assertPageHeaderVisible()
    })

  })
})
