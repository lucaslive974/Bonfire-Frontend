export interface UserSession {
  name?: string | null
  email?: string | null
  image?: string | null
  accessToken?: string
}

export interface AuthSession {
  user?: UserSession
  accessToken?: string
}
