import { Button } from '@bonfire/ui'
import { Checkbox } from '@/components/ui/checkbox'
import { DialogClose } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useLines } from '@/hooks/useLines'
import {
  LinesFrameData,
  LinesFrameDataSchema,
} from '@/schemas/LinesFrameDataSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { PenTool, Plus, Trash2 } from 'lucide-react'
import { ReusableDialog } from '@/components/ui/reusable-dialog'

interface DialogContentLineProp {
  line: LinesFrameData
}

export function DialogEditLine({
  line: { COD_LINH, COMPARTILHADA, ID_OPERADORA, LINH_ATIV_EMPR },
}: Readonly<DialogContentLineProp>) {
  const form = useForm<LinesFrameData>({
    resolver: zodResolver(LinesFrameDataSchema),
    defaultValues: {
      COD_LINH,
      ID_OPERADORA,
      COMPARTILHADA,
      LINH_ATIV_EMPR,
    },
  })
  const { handleUpdate } = useLines()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdate)}>
        <ReusableDialog
          icon={<PenTool className="h-5 w-5 animate-pulse-subtle" />}
          iconClassName="bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/50"
          title="Editar Linha"
          description="Faça alterações cadastrais na linha de transporte selecionada."
          footerActions={
            <>
              <DialogClose asChild>
                <Button type="button" variant="outline" className="rounded-xl font-bold py-5 text-xs">
                  Cancelar
                </Button>
              </DialogClose>
              <Button 
                type="submit" 
                onClick={form.handleSubmit(handleUpdate)}
                className="rounded-xl font-bold py-5 text-xs bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-850 dark:hover:bg-zinc-50"
              >
                Salvar Alterações
              </Button>
            </>
          }
        >
          <div className="grid gap-5">
            <FormField
              control={form.control}
              name="COD_LINH"
              render={({ field }) => (
                <FormItem className="space-y-1.5 text-left">
                  <FormLabel className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Código da Linha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: L102"
                      className="rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ID_OPERADORA"
              render={({ field }) => (
                <FormItem className="space-y-1.5 text-left">
                  <FormLabel className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Operadora (ID)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: OP-01"
                      className="rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 gap-3">
              <FormField
                control={form.control}
                name="COMPARTILHADA"
                render={({ field }) => (
                  <FormItem>
                    <div 
                      onClick={() => field.onChange(!field.value)}
                      className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 cursor-pointer transition-colors select-none"
                    >
                      <div className="space-y-0.5 text-left">
                        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-250 block">Linha Compartilhada</span>
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block">Indica se a rota é dividida entre consórcios</span>
                      </div>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="LINH_ATIV_EMPR"
                render={({ field }) => (
                  <FormItem>
                    <div 
                      onClick={() => field.onChange(!field.value)}
                      className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 cursor-pointer transition-colors select-none"
                    >
                      <div className="space-y-0.5 text-left">
                        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-250 block">Status da Linha (Ativa)</span>
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block">Indica se a rota está atualmente operando</span>
                      </div>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </ReusableDialog>
      </form>
    </Form>
  )
}

export function DialogInsertLine({
  line: { COD_LINH, COMPARTILHADA, ID_OPERADORA, LINH_ATIV_EMPR },
}: Readonly<DialogContentLineProp>) {
  const form = useForm<LinesFrameData>({
    resolver: zodResolver(LinesFrameDataSchema),
    defaultValues: {
      COD_LINH,
      ID_OPERADORA,
      COMPARTILHADA,
      LINH_ATIV_EMPR,
    },
  })
  const { handleInsert } = useLines()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleInsert)}>
        <ReusableDialog
          icon={<Plus className="h-5 w-5" />}
          iconClassName="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-100 dark:border-emerald-900/50"
          title="Cadastrar Linha"
          description="Adicione uma nova rota de transporte público ao cadastro municipal."
          footerActions={
            <>
              <DialogClose asChild>
                <Button type="button" variant="outline" className="rounded-xl font-bold py-5 text-xs">
                  Cancelar
                </Button>
              </DialogClose>
              <Button 
                type="submit" 
                onClick={form.handleSubmit(handleInsert)}
                className="rounded-xl font-bold py-5 text-xs bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-850 dark:hover:bg-zinc-50"
              >
                Criar Linha
              </Button>
            </>
          }
        >
          <div className="grid gap-5">
            <FormField
              control={form.control}
              name="COD_LINH"
              render={({ field }) => (
                <FormItem className="space-y-1.5 text-left">
                  <FormLabel className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Código da Linha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: L102"
                      className="rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ID_OPERADORA"
              render={({ field }) => (
                <FormItem className="space-y-1.5 text-left">
                  <FormLabel className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Operadora (ID)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: OP-01"
                      className="rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 gap-3">
              <FormField
                control={form.control}
                name="COMPARTILHADA"
                render={({ field }) => (
                  <FormItem>
                    <div 
                      onClick={() => field.onChange(!field.value)}
                      className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 cursor-pointer transition-colors select-none"
                    >
                      <div className="space-y-0.5 text-left">
                        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-250 block">Linha Compartilhada</span>
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block">Indica se a rota é dividida entre consórcios</span>
                      </div>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="LINH_ATIV_EMPR"
                render={({ field }) => (
                  <FormItem>
                    <div 
                      onClick={() => field.onChange(!field.value)}
                      className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 cursor-pointer transition-colors select-none"
                    >
                      <div className="space-y-0.5 text-left">
                        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-250 block">Status da Linha (Ativa)</span>
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block">Indica se a rota está atualmente operando</span>
                      </div>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </ReusableDialog>
      </form>
    </Form>
  )
}

export function DialogDeleteLine({
  line: { COD_LINH },
}: Readonly<DialogContentLineProp>) {
  const { handleDelete } = useLines()

  return (
    <ReusableDialog
      icon={<Trash2 className="h-5 w-5 animate-bounce-subtle" />}
      iconClassName="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-2xl border border-red-100 dark:border-red-900/50"
      title="Deletar Linha"
      description="Confirme a exclusão definitiva desta linha de transporte."
      maxWidthClassName="sm:max-w-[400px]"
      footerActions={
        <>
          <DialogClose asChild>
            <Button type="button" variant="outline" className="rounded-xl font-bold py-5 text-xs">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            type="submit"
            onClick={() => handleDelete(COD_LINH)}
            className="rounded-xl font-bold py-5 text-xs bg-red-650 hover:bg-red-700 text-white border-transparent"
          >
            Excluir Linha
          </Button>
        </>
      }
    >
      <div className="text-left">
        <p className="text-xs text-zinc-650 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-900/40 p-3 rounded-xl border border-zinc-200/50 dark:border-zinc-800/80">
          Atenção: Esta ação é definitiva e removerá todos os dados históricos de itinerários e programações vinculados à linha <strong className="text-zinc-900 dark:text-zinc-100">{COD_LINH}</strong>.
        </p>
      </div>
    </ReusableDialog>
  )
}
