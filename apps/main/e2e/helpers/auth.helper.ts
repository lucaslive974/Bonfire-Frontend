// e2e/helpers/auth.helper.ts
import { tokenEncoder } from '@bonfire/core'

export function generateFakeAccessToken(payloadObj: object): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')
  const payload = Buffer.from(JSON.stringify(payloadObj)).toString('base64url')
  const signature = 'signature'
  return `${header}.${payload}.${signature}`
}

export const mockAccessToken = generateFakeAccessToken({ role_cn_name: 'Operador' })

export const mockSession = {
  user: {
    name: 'Usuário Teste',
    email: 'teste@bonfire.gov.br',
    image: null,
    roleCnName: 'Operador'
  },
  expires: '2036-05-28T00:00:00.000Z',
  accessToken: mockAccessToken
}

export const NEXTAUTH_TEST_SECRET = 'testsecret123456789012345678901234567895'

export async function injectAuthCookie(context: any) {
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
