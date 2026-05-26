import { InfractionLayout } from '@/components/infractions/infractionLayout'
import { PrimaryLayout } from '@/components/ui/primaryLayout'
import { Footer } from '@bonfire/ui'

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
