import { encode } from 'next-auth/jwt'

export interface ITokenEncoder {
  encode(params: {
    token: any
    secret: string
    maxAge?: number
  }): Promise<string>
}

export class NextAuthTokenEncoder implements ITokenEncoder {
  async encode(params: {
    token: any
    secret: string
    maxAge?: number
  }): Promise<string> {
    return encode(params)
  }
}

export const tokenEncoder: ITokenEncoder = new NextAuthTokenEncoder()
