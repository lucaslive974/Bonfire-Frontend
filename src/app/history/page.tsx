import { PrimaryLayout } from '@/components/UI/primaryLayout'
import { HistoryLayout } from '@/components/history/historyLayout'

export const metadata = {
  title: 'Bonfire - Histórico',
}

export default function HistoryPage() {
  return (
    <PrimaryLayout>
      <HistoryLayout />
    </PrimaryLayout>
  )
}
