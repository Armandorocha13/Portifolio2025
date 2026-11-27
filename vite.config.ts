import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Pré-renderização: um arquivo .html por rota (servicos.html, servicos/sites.html...)
  ssgOptions: {
    dirStyle: 'flat',
    entry: 'src/principal.tsx',
  },
})
