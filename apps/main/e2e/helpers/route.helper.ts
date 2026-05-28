// e2e/helpers/route.helper.ts
import { Page } from '@playwright/test'

interface MockRouteOptions<TStore> {
  urlPattern: string
  getStore: () => TStore
  onPost?: (body: any, store: TStore) => void
  postSuccessMessage?: string
}

/**
 * Helper abstrato e genérico para mockar rotas de API com suporte a requisições GET e inclusão reativa via POST.
 */
export async function mockApiRoute<TStore>(page: Page, options: MockRouteOptions<TStore>) {
  await page.route(options.urlPattern, async (route) => {
    const method = route.request().method()
    if (method === 'POST' && options.onPost) {
      const body = route.request().postDataJSON()
      const store = options.getStore()
      options.onPost(body, store)
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ message: options.postSuccessMessage || 'Registro inserido com sucesso!' })
      })
    } else {
      await route.fulfill({
        status: 200,
        json: options.getStore()
      })
    }
  })
}
