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
    // Dedicated port — http://localhost:5173 is the Vite default; another app
    // (often another project) often owns that URL. Avoid opening the wrong site.
    port: 5739,
    strictPort: true,
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
