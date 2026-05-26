import { PrimaryLayout } from '@/components/ui/primaryLayout'
import { RecursesLayout } from '@/components/recurses/recursesLayout'

export const metadata = {
  title: 'Bonfire - Recursos - Segunda Instância',
}

export default function Home() {
  return (
    <PrimaryLayout>
      <RecursesLayout instance={2}></RecursesLayout>
    </PrimaryLayout>
  )
}
