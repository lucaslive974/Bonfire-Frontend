import { PrimaryLayout } from '@/components/ui/primaryLayout'
import { LinesLayout } from '@/components/lines/linesLayout'
import { LinesProvider } from '@/contexts/lineContext'

export const metadata = {
  title: 'Bonfire - linhas',
}

export default function Lines() {
  return (
    <PrimaryLayout>
      <LinesProvider>
        <LinesLayout></LinesLayout>
      </LinesProvider>
    </PrimaryLayout>
  )
}
