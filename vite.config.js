import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // dev server port
    open: true  // auto open browser
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
