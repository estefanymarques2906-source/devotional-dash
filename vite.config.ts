import { defineConfig } from 'vite'
// ... outros imports

export default defineConfig({
  // Adicione isso:
  optimizeDeps: {
    esbuildOptions: {
      external: ['esbuild']
    }
  },
  // ... resto da config
})

