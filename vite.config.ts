import { defineConfig } from 'vite';

export default defineConfig({
  base: '/El_Horno_Cafe/',
  server: {
    port: 5173,
    open: true,
  },
  build: {
    target: 'es2020',
    minify: 'esbuild',
  },
});
