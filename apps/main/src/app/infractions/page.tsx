import { InfractionLayout } from '@/components/infractions/infractionLayout'
import { PrimaryLayout } from '@/components/ui/primaryLayout'

export const metadata = {
  title: 'Bonfire - Infrações',
}

export default function Home() {
  return (
    <PrimaryLayout>
      <InfractionLayout></InfractionLayout>
    </PrimaryLayout>
  )
}
