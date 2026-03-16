import { ReactNode } from "react";

export function TableWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col w-full p-2 caret-sky-500 select-text">
      {children}
    </div>
  )

}

export function TableWrapperFilters({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4 p-4 py-4">
      {children}
    </div>
  )
}

export function TableWrapperBody({ children }: { children: ReactNode }) {
  return (
    <div className='flex-1 overflow-auto select-text'>
      {children}
    </div>
  )
}


export function TableWrapperFooter({ children }: { children: ReactNode }) {
  return (
    <div className='flex justify-between p-2'>
      {children}
    </div>
  )
}

