import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react({})],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.ts'],
    include: [
      'src/**/*.{test,spec}.{ts,tsx}',
      '../../packages/ui/src/tests/**/*.{test,spec}.{ts,tsx}',
      '../../packages/core/src/tests/**/*.{test,spec}.{ts,tsx}'
    ],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
