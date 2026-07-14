import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import jobberDevApi from './vite-plugins/jobber-dev-api.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), jobberDevApi()],
  server: {
    host: true,
    open: true,
    // Honor a harness-assigned PORT (auto-port preview) when present; otherwise
    // fall back to a dedicated port (5173 is Vite's default and another app
    // often owns it, so we avoid opening the wrong site).
    port: process.env.PORT ? Number(process.env.PORT) : 5739,
    strictPort: false,
    /* Don't auto-restart on .env.local writes. Our Jobber middleware rotates
     * JOBBER_REFRESH_TOKEN and persists it back to .env.local on every API
     * call, and Vite's default behavior was killing the in-flight response
     * before it could be sent back to the client. Our middleware already re-
     * reads .env.local on every request, so we don't need the restart. */
    watch: {
      ignored: ["**/.env.local", "**/.env.local.tmp"],
    },
  },
})
