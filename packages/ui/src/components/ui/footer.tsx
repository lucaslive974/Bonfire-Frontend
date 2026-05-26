export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full mt-12 pl-4 pr-4 pt-6 pb-4 border-t border-zinc-200/80 dark:border-zinc-800/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 dark:text-zinc-500">
      <div className="flex items-center gap-1">
        <span className="font-semibold text-zinc-600 dark:text-zinc-400">© {currentYear} Bonfire.</span>
        <span>Todos os direitos reservados.</span>
      </div>
      <div className="flex items-center gap-1 flex-wrap justify-center">
        <span>Desenvolvido por</span>
        <span className="font-medium text-zinc-500 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
          Guilherme Nogueira
        </span>
        <span>e</span>
        <span className="font-medium text-zinc-500 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
          Lucas Ribeiro
        </span>
      </div>
    </footer>
  )
}
