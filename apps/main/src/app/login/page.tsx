import { SecondaryLayout } from '@/components/ui/secondaryLayout'
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
