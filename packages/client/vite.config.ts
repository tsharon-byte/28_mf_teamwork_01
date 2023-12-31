import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001,
  },
  ssr: {
    target: 'node',
    format: 'cjs',
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        app: './index.html',
        serviceWorker: './service-worker.ts',
      },
      output: {
        entryFileNames: chunkInfo =>
          chunkInfo.name === 'serviceWorker'
            ? 'service-worker.js'
            : 'assets/js/[name].[hash].js',
      },
    },
  },
})
