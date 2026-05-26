import { PrimaryLayout } from '@/components/ui/primaryLayout'
import { ImportForm } from '@/components/import/importForm'
import { PageHeader } from '@/components/ui/page-header'
import { UploadCloud } from 'lucide-react'

export const metadata = {
  title: 'Bonfire - Importação',
}

export default function Home() {
  return (
    <PrimaryLayout>
      <div className="space-y-6 w-full">
        <PageHeader
          icon={<UploadCloud className="h-6 w-6" />}
          iconClassName="bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-900/50"
          title="Painel de Importação"
          description="Realize a importação em lote de autos de infração e defesas prévias para o sistema."
        />
        <ImportForm />
      </div>
    </PrimaryLayout>
  )
}
