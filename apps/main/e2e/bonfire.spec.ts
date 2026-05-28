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
import { mockApiRoute } from './helpers/route.helper'

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

      // Abstracted dynamic GET/POST mock for Vehicles using the mockApiRoute helper
      await mockApiRoute(page, {
        urlPattern: '**/veiculos',
        getStore: () => mockVehicles,
        onPost: (body, store) => {
          const newVehicles = Array.isArray(body) ? body : [body]
          for (const newV of newVehicles) {
            store.veiculos.push({
              NUM_VEIC: newV.NUM_VEIC,
              IDN_PLAC_VEIC: newV.IDN_PLAC_VEIC,
              VEIC_ATIV_EMPR: newV.VEIC_ATIV_EMPR ?? true,
            })
          }
        },
        postSuccessMessage: 'Veículo inserido com sucesso!'
      })

      // Abstracted dynamic GET/POST mock for Lines using the mockApiRoute helper
      await mockApiRoute(page, {
        urlPattern: '**/linha',
        getStore: () => mockLines,
        onPost: (body, store) => {
          const newLines = Array.isArray(body) ? body : [body]
          for (const newL of newLines) {
            store.linha.push({
              COD_LINH: newL.COD_LINH,
              ID_OPERADORA: Number(newL.ID_OPERADORA) || newL.ID_OPERADORA,
              COMPARTILHADA: newL.COMPARTILHADA ?? false,
              LINH_ATIV_EMPR: newL.LINH_ATIV_EMPR ?? true,
            })
          }
        },
        postSuccessMessage: 'Linha criada com sucesso!'
      })

      // Dynamic GET route mock for Infractions supporting search filters
      await page.route('**/infracao*', async (route) => {
        const url = new URL(route.request().url())
        const aiParam = url.searchParams.get('ai')
        const dateParam = url.searchParams.get('date')

        let filteredAutos = [...mockInfractions.autos]
        if (aiParam) {
          filteredAutos = filteredAutos.filter(auto => auto.NUM_AI.includes(aiParam))
        }
        if (dateParam) {
          filteredAutos = filteredAutos.filter(auto => auto.DAT_OCOR_INFR_STR === dateParam)
        }

        await route.fulfill({
          status: 200,
          json: { autos: filteredAutos }
        })
      })

      // Dynamic GET route mock for JARI Recourses supporting search filters
      await page.route('**/recurso/**', async (route) => {
        const url = new URL(route.request().url())
        const ataParam = url.searchParams.get('ata')
        const dateParam = url.searchParams.get('date')

        let filteredRecurses = [...mockRecurses.recurses]
        if (ataParam) {
          filteredRecurses = filteredRecurses.filter(rec => String(rec.NUM_ATA).includes(ataParam))
        }
        if (dateParam) {
          filteredRecurses = filteredRecurses.filter(rec => rec.DAT_PUBL === dateParam)
        }

        await route.fulfill({
          status: 200,
          json: { recurses: filteredRecurses }
        })
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

      // Verify correct reactive filtering in grid
      await consortiumPage.filterByName('Leste')
      await consortiumPage.assertMockRowVisible()

      await consortiumPage.filterByName('Inexistente')
      await consortiumPage.assertMockRowHidden()

      await consortiumPage.filterByName('')
      await consortiumPage.assertMockRowVisible()
    })

    test('Vehicles: should load header, table, and dialog overlays', async ({ vehiclesPage }) => {
      await vehiclesPage.goto()

      // Check PageHeader
      await vehiclesPage.assertPageHeaderVisible()

      // Verify the mocked vehicle row is visible
      await vehiclesPage.assertMockRowVisible()

      // Verify grid filters work correctly
      await vehiclesPage.filterByPlaca('ABC-1234')
      await vehiclesPage.assertMockRowVisible()

      await vehiclesPage.filterByPlaca('XYZ-0000')
      await vehiclesPage.assertMockRowHidden()

      await vehiclesPage.filterByPlaca('')
      await vehiclesPage.assertMockRowVisible()

      // Test "Incluir Veículo" Dialog Open and Cancel / Close flow
      await vehiclesPage.clickIncludeVehicle()
      await vehiclesPage.assertDialogOpened()
      await vehiclesPage.clickCancel()
      await vehiclesPage.assertDialogClosed()

      // Test close icon (X) button closes the "Incluir Veículo" Dialog
      await vehiclesPage.clickIncludeVehicle()
      await vehiclesPage.assertDialogOpened()
      await vehiclesPage.clickClose()
      await vehiclesPage.assertDialogClosed()

      // Test Modal Close after successful creation
      await vehiclesPage.clickIncludeVehicle()
      await vehiclesPage.assertDialogOpened()

      // Fill in insertion form fields
      await vehiclesPage.fillVehicleForm('50060', 'XYZ-9876')

      // Click "Criar Veículo" and submit
      await vehiclesPage.submitVehicleForm()

      // Verify the modal closes automatically on success
      await vehiclesPage.assertDialogClosed()

      // Verify that the screen is reactive and the newly created vehicle row appears in the table
      await vehiclesPage.assertNewVehicleVisible()
    })

    test('Lines: should load header, table, and include-dialog modal', async ({ linesPage }) => {
      await linesPage.goto()

      // Check PageHeader
      await linesPage.assertPageHeaderVisible()

      // Verify the mocked line row is visible
      await linesPage.assertMockRowVisible()

      // Verify grid filters work correctly
      await linesPage.filterByLinha('5502C')
      await linesPage.assertMockRowVisible()

      await linesPage.filterByLinha('L999A')
      await linesPage.assertMockRowHidden()

      await linesPage.filterByLinha('')
      await linesPage.assertMockRowVisible()

      // Test "Incluir Linha" Dialog Open and Cancel / Close flow
      await linesPage.clickIncludeLine()
      await linesPage.assertDialogOpened()
      await linesPage.clickCancel()
      await linesPage.assertDialogClosed()

      // Test close icon (X) button closes the "Incluir Linha" Dialog
      await linesPage.clickIncludeLine()
      await linesPage.assertDialogOpened()
      await linesPage.clickClose()
      await linesPage.assertDialogClosed()

      // Test Modal Close after successful creation
      await linesPage.clickIncludeLine()
      await linesPage.assertDialogOpened()

      // Fill in insertion form fields
      await linesPage.fillLineForm('L999A', '3')

      // Click "Criar Linha" and submit
      await linesPage.submitLineForm()

      // Verify the modal closes automatically on success
      await linesPage.assertDialogClosed()

      // Verify that the screen is reactive and the newly created line row appears in the table
      await linesPage.assertNewLineVisible()
    })

    test('Infractions: should render active filters and list', async ({ infractionsPage }) => {
      await infractionsPage.goto()

      // Check PageHeader
      await infractionsPage.assertPageHeaderVisible()

      // Verify filters are present
      await infractionsPage.assertFiltersVisible()

      // Verify that table loaded successfully
      await infractionsPage.assertTableLoaded()

      // Verify presence of mocked infraction row in grid
      await infractionsPage.assertMockRowVisible()

      // Verify filtering is reactive
      await infractionsPage.fillSearchInput('AI-99992')
      await infractionsPage.assertTableLoaded()
      await infractionsPage.assertMockRowVisible()

      await infractionsPage.fillSearchInput('AI-00000')
      await infractionsPage.assertTableLoaded()
      await infractionsPage.assertMockRowHidden()

      await infractionsPage.fillSearchInput('')
      await infractionsPage.assertTableLoaded()
      await infractionsPage.assertMockRowVisible()
    })

    test('Recurses: should render instances, titles, and descriptions', async ({ recursesPage }) => {
      // 1ª Instância route
      await recursesPage.gotoFirstInstance()
      await recursesPage.assertFirstInstanceVisible()
      
      // Verify that 1st Instance table loaded successfully
      await recursesPage.assertTableLoaded()

      // Verify presence of mocked recourse row in 1st Instance
      await recursesPage.assertMockRowVisible()

      // Verify filtering in 1ª Instância is reactive
      await recursesPage.fillAtaFilter('105')
      await recursesPage.assertTableLoaded()
      await recursesPage.assertMockRowVisible()

      await recursesPage.fillAtaFilter('999')
      await recursesPage.assertTableLoaded()
      await recursesPage.assertMockRowHidden()

      await recursesPage.fillAtaFilter('')
      await recursesPage.assertTableLoaded()
      await recursesPage.assertMockRowVisible()

      // 2ª Instância route
      await recursesPage.gotoSecondInstance()
      await recursesPage.assertSecondInstanceVisible()

      // Verify that 2nd Instance table loaded successfully
      await recursesPage.assertTableLoaded()

      // Verify presence of mocked recourse row in 2nd Instance
      await recursesPage.assertMockRowVisible()

      // Verify filtering in 2ª Instância is reactive
      await recursesPage.fillAtaFilter('105')
      await recursesPage.assertTableLoaded()
      await recursesPage.assertMockRowVisible()

      await recursesPage.fillAtaFilter('999')
      await recursesPage.assertTableLoaded()
      await recursesPage.assertMockRowHidden()

      await recursesPage.fillAtaFilter('')
      await recursesPage.assertTableLoaded()
      await recursesPage.assertMockRowVisible()
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
