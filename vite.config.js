import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/weather': {
        target: 'https://api.openweathermap.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/weather/, ''),
      },
      '/pixabay': {
        target: 'https://pixabay.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pixabay/, ''),
      }
    }
  }
})