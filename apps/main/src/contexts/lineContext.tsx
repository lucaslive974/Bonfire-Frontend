'use client'

import { LinesFrameData } from '@/schemas/LinesFrameDataSchema'
import { GetLines } from '@/services/lines'
import { createContext, useMemo } from 'react'
import { KeyedMutator } from 'swr'

type LinesContextProps = {
  data: LinesFrameData[] | undefined
  mutate: KeyedMutator<LinesFrameData[]>
}

type LinesProviderProps = {
  children: React.ReactNode
}

export const linesContext = createContext({} as LinesContextProps)

export function LinesProvider({ children }: Readonly<LinesProviderProps>) {
  const { data, mutate } = GetLines()

  const valueMemo = useMemo(() => ({ data, mutate }), [data, mutate])

  return (
    <linesContext.Provider value={valueMemo}>{children}</linesContext.Provider>
  )
}
