import { ReactNode } from 'react'

interface PageHeaderProps {
  icon?: ReactNode
  iconClassName?: string
  title: string
  description: string
  badgeText?: string
  badgeColor?: string
  rightContent?: ReactNode
}

export function PageHeader({
  icon,
  iconClassName = '',
  title,
  description,
  badgeText,
  badgeColor,
  rightContent,
}: PageHeaderProps) {
  const renderRightContent = () => {
    if (rightContent !== undefined) {
      return rightContent
    }
    
    const text = badgeText || "Disponível"
    const color = badgeColor || "bg-emerald-500"
    
    return (
      <div className="flex items-center gap-2 self-start sm:self-center px-4 py-2 bg-zinc-50/50 dark:bg-zinc-900/40 rounded-xl border border-zinc-100 dark:border-zinc-800">
        <span className={`flex h-2 w-2 rounded-full animate-pulse ${color}`} />
        <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
          {text}
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="flex items-start gap-4">
        {icon && (
          <div className={`p-3 rounded-2xl border ${iconClassName}`}>
            {icon}
          </div>
        )}
        <div className="space-y-0.5 text-left">
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {title}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {description}
          </p>
        </div>
      </div>
      {renderRightContent()}
    </div>
  )
}
