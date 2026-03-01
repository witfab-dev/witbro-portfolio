import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  optimizeDeps: {
    exclude: [
      'three',
      '@react-three/fiber', 
      '@react-three/drei'
    ],
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'framer-motion',
      'socket.io-client',
      'lucide-react'
    ]
  },
  
  server: {
    port: 5173,
    open: true,
    hmr: {
      overlay: false
    }
  },
  
  build: {
    rollupOptions: {
      external: [
        'three',
        '@react-three/fiber',
        '@react-three/drei'
      ]
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false
  },
  
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@contexts': '/src/contexts',
      '@hooks': '/src/hooks',
      '@utils': '/src/utils',
      '@assets': '/src/assets',
      '@styles': '/src/styles'
    }
  }
});