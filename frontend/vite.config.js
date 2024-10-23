import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 8080
  },
  build: {
    // Añade esta línea para deshabilitar el uso de binarios nativos en Rollup durante la compilación
    rollupOptions: {
      preferConst: true
    }
  }
})