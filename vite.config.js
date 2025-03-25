import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/techmart/',
  server: {
    port: 5173,
    host: true,
    strictPort: false,
    open: true
  },
  publicDir: 'public'
}) 