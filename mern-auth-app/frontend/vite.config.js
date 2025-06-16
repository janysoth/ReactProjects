import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5050', // change this if your backend runs on another port
        changeOrigin: true,
        secure: false,
      }
    }
  }
});