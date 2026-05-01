import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'

// Inject git commit hash + build time so the deployed UI can show its version
let commitHash = 'dev'
try {
  commitHash = execSync('git rev-parse --short HEAD').toString().trim()
} catch { /* ignore - not in a git checkout */ }
const buildTime = new Date().toISOString()

// https://vite.dev/config/
export default defineConfig({
  base: '/outfit-coordinator/',
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(commitHash),
    __BUILD_TIME__: JSON.stringify(buildTime),
  },
})
