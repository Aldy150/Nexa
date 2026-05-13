// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
  },
  ssr: {
    noExternal: ['@tanstack/react-start', '@tanstack/react-router'],
    external: [
      '@prisma/client',
      'resend', 
      '@neondatabase/serverless',
      '@prisma/adapter-neon'
    ],
  },
  optimizeDeps: {
    exclude: [
      '@prisma/client',
      'resend',
      '@neondatabase/serverless',
      '@prisma/adapter-neon'
    ],
  },
  // ✅ Force ces modules à être ignorés
  build: {
    rollupOptions: {
      external: ['@prisma/client', 'resend'],
    },
  },
})