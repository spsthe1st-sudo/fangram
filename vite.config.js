import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Project site on GitHub Pages serves at /fangram/
export default defineConfig({
  base: '/fangram/',
  plugins: [react()],
})
