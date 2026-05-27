export interface UserSession {
  name?: string | null
  email?: string | null
  image?: string | null
}

export interface AuthSession<TUser = UserSession> {
  user?: TUser
  accessToken?: string
}
