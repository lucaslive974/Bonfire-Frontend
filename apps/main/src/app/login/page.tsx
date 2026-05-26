import { SecondaryLayout } from '@bonfire/ui'
import { LoginMenu } from '@/components/login/loginMenu'

export const metadata = {
  title: 'Bonfire - Login',
}

export default async function login() {
  return (
    <SecondaryLayout>
      <LoginMenu></LoginMenu>
    </SecondaryLayout>
  )
}
