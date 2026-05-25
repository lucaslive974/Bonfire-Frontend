import { Button } from '@/components/UI/button'
import { Checkbox } from '@/components/UI/checkbox'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/UI/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/UI/form'
import { Input } from '@/components/UI/input'
import { useLines } from '@/hooks/useLines'
import {
  LinesFrameData,
  LinesFrameDataSchema,
} from '@/schemas/LinesFrameDataSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { PenTool, Plus, Trash2 } from 'lucide-react'

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
        <DialogContent className="sm:max-w-[425px] rounded-3xl p-6 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-xl animate-in zoom-in-95 duration-200">
          
          <DialogHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-zinc-100 dark:border-zinc-900 pb-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 rounded-2xl border border-amber-100 dark:border-amber-900/50">
              <PenTool className="h-5 w-5 animate-pulse-subtle" />
            </div>
            <div className="space-y-1 text-left">
              <DialogTitle className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Editar Linha</DialogTitle>
              <DialogDescription className="text-xs text-zinc-500 dark:text-zinc-400">
                Faça alterações cadastrais na linha de transporte selecionada.
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="grid gap-5 py-4">
            <FormField
              control={form.control}
              name="COD_LINH"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
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
                <FormItem className="space-y-1.5">
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
            
            {/* Interactive Toggle Cards */}
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

          <DialogFooter className="border-t border-zinc-100 dark:border-zinc-900 pt-4 flex gap-2">
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
          </DialogFooter>
        </DialogContent>
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
        <DialogContent className="sm:max-w-[425px] rounded-3xl p-6 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-xl animate-in zoom-in-95 duration-200">
          
          <DialogHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-zinc-100 dark:border-zinc-900 pb-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
              <Plus className="h-5 w-5" />
            </div>
            <div className="space-y-1 text-left">
              <DialogTitle className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Cadastrar Linha</DialogTitle>
              <DialogDescription className="text-xs text-zinc-500 dark:text-zinc-400">
                Adicione uma nova rota de transporte público ao cadastro municipal.
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="grid gap-5 py-4">
            <FormField
              control={form.control}
              name="COD_LINH"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
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
                <FormItem className="space-y-1.5">
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
            
            {/* Interactive Toggle Cards */}
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

          <DialogFooter className="border-t border-zinc-100 dark:border-zinc-900 pt-4 flex gap-2">
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
          </DialogFooter>
        </DialogContent>
      </form>
    </Form>
  )
}

export function DialogDeleteLine({
  line: { COD_LINH },
}: Readonly<DialogContentLineProp>) {
  const { handleDelete } = useLines()

  return (
    <DialogContent className="sm:max-w-[400px] rounded-3xl p-6 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-xl animate-in zoom-in-95 duration-200">
      <DialogHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-zinc-100 dark:border-zinc-900 pb-4">
        <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-2xl border border-red-100 dark:border-red-900/50">
          <Trash2 className="h-5 w-5 animate-bounce-subtle" />
        </div>
        <div className="space-y-1 text-left">
          <DialogTitle className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Deletar Linha</DialogTitle>
          <DialogDescription className="text-xs text-zinc-500 dark:text-zinc-400">
            Confirme a exclusão definitiva desta linha de transporte.
          </DialogDescription>
        </div>
      </DialogHeader>
      
      <div className="py-4 text-left">
        <p className="text-xs text-zinc-650 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-900/40 p-3 rounded-xl border border-zinc-200/50 dark:border-zinc-800/80">
          Atenção: Esta ação é definitiva e removerá todos os dados históricos de itinerários e programações vinculados à linha <strong className="text-zinc-900 dark:text-zinc-100">{COD_LINH}</strong>.
        </p>
      </div>

      <DialogFooter className="border-t border-zinc-100 dark:border-zinc-900 pt-4 flex gap-2">
        <DialogClose asChild>
          <Button type="button" variant="outline" className="rounded-xl font-bold py-5 text-xs">
            Cancelar
          </Button>
        </DialogClose>
        <Button
          variant="destructive"
          type="submit"
          onClick={() => handleDelete(COD_LINH)}
          className="rounded-xl font-bold py-5 text-xs bg-red-600 hover:bg-red-700 text-white"
        >
          Excluir Linha
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
