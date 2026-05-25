import '@testing-library/jest-dom'
import { vi } from 'vitest'
import React from 'react'

// Mock framer-motion to render static synchronous elements in jsdom tests.
// This prevents exit-animation lag where elements persist in the DOM when closed.
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion') as any
  return {
    ...actual,
    motion: {
      div: React.forwardRef<HTMLDivElement, any>(({ children, ...props }, ref) => {
        // Strip out framer-motion specific layout props to avoid console warnings
        const { initial, animate, exit, transition, ...rest } = props
        return React.createElement('div', { ref, ...rest }, children)
      }),
      span: React.forwardRef<HTMLSpanElement, any>(({ children, ...props }, ref) => {
        const { initial, animate, exit, transition, ...rest } = props
        return React.createElement('span', { ref, ...rest }, children)
      }),
    },
    AnimatePresence: ({ children }: any) => React.createElement(React.Fragment, null, children),
  }
})
