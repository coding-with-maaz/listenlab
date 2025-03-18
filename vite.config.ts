import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import crypto from 'crypto-browserify'; // Import crypto-browserify

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Polyfill for Node.js' `crypto` module for browser environments
    'process.env': {},
    global: {},
  },
  optimizeDeps: {
    include: ['crypto-browserify'],  // Include the crypto-browserify for optimization
  },
  build: {
    rollupOptions: {
      external: ['crypto-browserify'],
    },
  },
}));
