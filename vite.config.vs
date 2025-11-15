import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // or 'client' if your src is in client/
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
