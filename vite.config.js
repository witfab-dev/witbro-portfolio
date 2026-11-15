import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime', 'framer-motion', 'lucide-react'],
  },

  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    open: false,
  },

  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    chunkSizeWarningLimit: 900,
    sourcemap: false,
  },

  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@utils': '/src/utils',
      '@assets': '/src/assets',
      '@styles': '/src/styles',
    },
  },
});
