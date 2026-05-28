import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/login.page'
import { ConsortiumPage } from '../pages/consortium.page'
import { VehiclesPage } from '../pages/vehicles.page'
import { LinesPage } from '../pages/lines.page'
import { InfractionsPage } from '../pages/infractions.page'
import { RecursesPage } from '../pages/recurses.page'
import { HistoryPage } from '../pages/history.page'
import { ImportPage } from '../pages/import.page'

type MyFixtures = {
  loginPage: LoginPage
  consortiumPage: ConsortiumPage
  vehiclesPage: VehiclesPage
  linesPage: LinesPage
  infractionsPage: InfractionsPage
  recursesPage: RecursesPage
  historyPage: HistoryPage
  importPage: ImportPage
}

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },
  consortiumPage: async ({ page }, use) => {
    await use(new ConsortiumPage(page))
  },
  vehiclesPage: async ({ page }, use) => {
    await use(new VehiclesPage(page))
  },
  linesPage: async ({ page }, use) => {
    await use(new LinesPage(page))
  },
  infractionsPage: async ({ page }, use) => {
    await use(new InfractionsPage(page))
  },
  recursesPage: async ({ page }, use) => {
    await use(new RecursesPage(page))
  },
  historyPage: async ({ page }, use) => {
    await use(new HistoryPage(page))
  },
  importPage: async ({ page }, use) => {
    await use(new ImportPage(page))
  },
})

export { expect } from '@playwright/test'
