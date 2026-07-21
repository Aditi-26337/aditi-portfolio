import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // Use a relative base so the site works when served from a subpath (GitHub Pages)
  base: './',
})
