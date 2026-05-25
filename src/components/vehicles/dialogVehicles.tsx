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
import { useVehicles } from '@/hooks/useVehicles'
import { VehicleSchema, VehiclesData } from '@/schemas/VechicleSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { PenTool, Plus, Trash2 } from 'lucide-react'

type DialogContentVehicleProp = {
  vehicle: VehiclesData
}

export function DialogEditVehicle({
  vehicle: { IDN_PLAC_VEIC, NUM_VEIC, VEIC_ATIV_EMPR },
}: DialogContentVehicleProp) {
  const form = useForm<VehiclesData>({
    resolver: zodResolver(VehicleSchema),
    defaultValues: {
      IDN_PLAC_VEIC,
      NUM_VEIC,
      VEIC_ATIV_EMPR,
    },
  })

  const { handleUpdate } = useVehicles()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdate)}>
        <DialogContent className="sm:max-w-[425px] rounded-3xl p-6 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-xl animate-in zoom-in-95 duration-200">
          
          <DialogHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-zinc-100 dark:border-zinc-900 pb-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 rounded-2xl border border-amber-100 dark:border-amber-900/50">
              <PenTool className="h-5 w-5 animate-pulse-subtle" />
            </div>
            <div className="space-y-1 text-left">
              <DialogTitle className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Editar Veículo</DialogTitle>
              <DialogDescription className="text-xs text-zinc-500 dark:text-zinc-400">
                Faça alterações cadastrais no veículo selecionado.
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="grid gap-5 py-4">
            <FormField
              control={form.control}
              name="NUM_VEIC"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Número do Veículo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: 12040"
                      className="rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="IDN_PLAC_VEIC"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Placa do Veículo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: ABC-1234"
                      className="rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            {/* Interactive Toggle Card */}
            <FormField
              control={form.control}
              name="VEIC_ATIV_EMPR"
              render={({ field }) => (
                <FormItem>
                  <div 
                    onClick={() => field.onChange(!field.value)}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 cursor-pointer transition-colors select-none"
                  >
                    <div className="space-y-0.5 text-left">
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-250 block">Status do Veículo (Ativo)</span>
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block">Indica se o automóvel está apto a operar nas rotas</span>
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

export function DialogDeleteVehicle({
  vehicle: { NUM_VEIC },
}: DialogContentVehicleProp) {
  const { handleDelete } = useVehicles()

  return (
    <DialogContent className="sm:max-w-[400px] rounded-3xl p-6 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-xl animate-in zoom-in-95 duration-200">
      <DialogHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-zinc-100 dark:border-zinc-900 pb-4">
        <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-2xl border border-red-100 dark:border-red-900/50">
          <Trash2 className="h-5 w-5 animate-bounce-subtle" />
        </div>
        <div className="space-y-1 text-left">
          <DialogTitle className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Deletar Veículo</DialogTitle>
          <DialogDescription className="text-xs text-zinc-500 dark:text-zinc-400">
            Confirme a exclusão definitiva deste veículo.
          </DialogDescription>
        </div>
      </DialogHeader>
      
      <div className="py-4 text-left">
        <p className="text-xs text-zinc-650 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-900/40 p-3 rounded-xl border border-zinc-200/50 dark:border-zinc-800/80">
          Atenção: Esta ação é definitiva e removerá todos os dados e cadastros vinculados ao veículo de código <strong className="text-zinc-900 dark:text-zinc-100">{NUM_VEIC}</strong>.
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
          onClick={() => handleDelete(NUM_VEIC)}
          className="rounded-xl font-bold py-5 text-xs bg-red-600 hover:bg-red-700 text-white"
        >
          Excluir Veículo
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

export function DialogIncludeVehicle({
  vehicle: { IDN_PLAC_VEIC, NUM_VEIC, VEIC_ATIV_EMPR },
}: DialogContentVehicleProp) {
  const { handleInsert } = useVehicles()
  const form = useForm<VehiclesData>({
    resolver: zodResolver(VehicleSchema),
    defaultValues: {
      IDN_PLAC_VEIC,
      NUM_VEIC,
      VEIC_ATIV_EMPR,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleInsert)}>
        <DialogContent className="sm:max-w-[425px] rounded-3xl p-6 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-xl animate-in zoom-in-95 duration-200">
          
          <DialogHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-zinc-100 dark:border-zinc-900 pb-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
              <Plus className="h-5 w-5" />
            </div>
            <div className="space-y-1 text-left">
              <DialogTitle className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Cadastrar Veículo</DialogTitle>
              <DialogDescription className="text-xs text-zinc-500 dark:text-zinc-400">
                Adicione um novo veículo ao cadastro da frota municipal.
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="grid gap-5 py-4">
            <FormField
              control={form.control}
              name="NUM_VEIC"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Número do Veículo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: 12040"
                      className="rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="IDN_PLAC_VEIC"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Placa do Veículo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: ABC-1234"
                      className="rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            {/* Interactive Toggle Card */}
            <FormField
              control={form.control}
              name="VEIC_ATIV_EMPR"
              render={({ field }) => (
                <FormItem>
                  <div 
                    onClick={() => field.onChange(!field.value)}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 cursor-pointer transition-colors select-none"
                  >
                    <div className="space-y-0.5 text-left">
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-250 block">Status do Veículo (Ativo)</span>
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block">Indica se o automóvel está apto a operar nas rotas</span>
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
              Criar Veículo
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Form>
  )
}

