'use client'

import { useAuth } from '@/hooks/useAuth'
import { Button } from '../UI/button'

export function SignInBtn() {
  const { login } = useAuth()
  return (
    <Button
      variant="secondary"
      onClick={() => login('keycloak')}
    >
      Entrar
    </Button>
  )
}

export function SignOutBtn() {
  const { logout } = useAuth()
  return (
    <Button variant="secondary" onClick={() => logout({ redirect: false })}>
      Sair
    </Button>
  )
}

export default function LoginBtn() {
  const { session } = useAuth()
  if (session) {
    return (
      <div className="flex flex-col items-center justify-center gap-8">
        Signed in as {session.user?.email} <br />
        <SignOutBtn></SignOutBtn>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      Not signed in <br />
      <SignInBtn></SignInBtn>
    </div>
  )
}
