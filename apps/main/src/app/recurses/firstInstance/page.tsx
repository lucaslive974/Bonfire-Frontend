import { PrimaryLayout } from '@/components/ui/primaryLayout'
import { RecursesLayout } from '@/components/recurses/recursesLayout'

export const metadata = {
  title: 'Bonfire - Recursos - Primeira Instância',
}

export default function Home() {
  return (
    <PrimaryLayout>
      <RecursesLayout instance={1}></RecursesLayout>
    </PrimaryLayout>
  )
}
