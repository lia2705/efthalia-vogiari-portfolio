import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base: the build works at user.github.io/ and user.github.io/<repo>/ alike.
export default defineConfig({
  plugins: [react()],
  base: './',
})
