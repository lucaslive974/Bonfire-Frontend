import {
  Button,
  Checkbox,
  DialogClose,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
} from '@bonfire/ui'
import { useVehicles } from '@/hooks/useVehicles'
import { VehicleSchema, VehiclesData } from '@/schemas/VechicleSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { PenTool, Plus, Trash2 } from 'lucide-react'
import { ReusableDialog } from '@bonfire/ui'

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
        <ReusableDialog
          icon={<PenTool className="h-5 w-5 animate-pulse-subtle" />}
          iconClassName="bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/50"
          title="Editar Veículo"
          description="Faça alterações cadastrais no veículo selecionado."
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
              name="NUM_VEIC"
              render={({ field }) => (
                <FormItem className="space-y-1.5 text-left">
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
                <FormItem className="space-y-1.5 text-left">
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
        </ReusableDialog>
      </form>
    </Form>
  )
}

export function DialogDeleteVehicle({
  vehicle: { NUM_VEIC },
}: DialogContentVehicleProp) {
  const { handleDelete } = useVehicles()

  return (
    <ReusableDialog
      icon={<Trash2 className="h-5 w-5 animate-bounce-subtle" />}
      iconClassName="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-2xl border border-red-100 dark:border-red-900/50"
      title="Deletar Veículo"
      description="Confirme a exclusão definitiva deste veículo."
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
            onClick={() => handleDelete(NUM_VEIC)}
            className="rounded-xl font-bold py-5 text-xs bg-red-600 hover:bg-red-700 text-white border-transparent"
          >
            Excluir Veículo
          </Button>
        </>
      }
    >
      <div className="text-left">
        <p className="text-xs text-zinc-650 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-900/40 p-3 rounded-xl border border-zinc-200/50 dark:border-zinc-800/80">
          Atenção: Esta ação é definitiva e removerá todos os dados e cadastros vinculados ao veículo de código <strong className="text-zinc-900 dark:text-zinc-100">{NUM_VEIC}</strong>.
        </p>
      </div>
    </ReusableDialog>
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
        <ReusableDialog
          icon={<Plus className="h-5 w-5" />}
          iconClassName="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-100 dark:border-emerald-900/50"
          title="Cadastrar Veículo"
          description="Adicione um novo veículo ao cadastro da frota municipal."
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
                Criar Veículo
              </Button>
            </>
          }
        >
          <div className="grid gap-5">
            <FormField
              control={form.control}
              name="NUM_VEIC"
              render={({ field }) => (
                <FormItem className="space-y-1.5 text-left">
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
                <FormItem className="space-y-1.5 text-left">
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
        </ReusableDialog>
      </form>
    </Form>
  )
}
