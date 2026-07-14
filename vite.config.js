// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // 'command' → 'build' or 'serve'
  // 'mode' → 'production' or 'development'
  
  const isProduction = mode === 'production';
  
  return {
    plugins: [react()],
    // for Production (GitHub Pages) -  project name, for Development '/'
    base: isProduction ? '/ravi-portfolio-react-router-dom/' : '/',
  }
}) ;