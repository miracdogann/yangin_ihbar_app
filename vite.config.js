import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // .env dosyasını manuel yükle
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    server: {
      headers: {
        'Referrer-Policy': 'no-referrer',
        'X-Content-Type-Options': 'nosniff',
        'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
      },
      cors: true,
      proxy: {
        '/api': {
          target: 'https://miracdogan.pythonanywhere.com',
          changeOrigin: true,
          secure: true,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        }
      }
    },
    define: {
      // Environment variables'ı manuel tanımla
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL),
      'import.meta.env.VITE_API_STATIONS_URL': JSON.stringify(env.VITE_API_STATIONS_URL),
      'import.meta.env.VITE_TOMTOM_KEY': JSON.stringify(env.VITE_TOMTOM_KEY)
    }
  }
})
