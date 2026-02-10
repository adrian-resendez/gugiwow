import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/gugiwow/', // 🔴 REQUIRED for GitHub Pages
})
