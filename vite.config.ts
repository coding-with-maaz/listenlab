import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import * as crypto from 'crypto-browserify'; // Import crypto-browserify explicitly

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
      crypto: "crypto-browserify", // Explicitly alias crypto to crypto-browserify
    },
  },
  define: {
    'process.env': {},
    global: {},  // This may help resolve global references
  },
  optimizeDeps: {
    include: ['crypto-browserify'], // Ensure it's included for optimization
  },
  build: {
    rollupOptions: {
      external: ['crypto-browserify'], // Make sure it's externalized properly
    },
  },
}));
