import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(
        path.join(__dirname, '../', 'server'),
        'ssr/entry.server.tsx'
      ),
      name: 'entry.server',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        dir: 'dist-ssr',
      },
    },
    ssr: true,
  },
  ssr: {
    format: 'cjs',
  },
})
