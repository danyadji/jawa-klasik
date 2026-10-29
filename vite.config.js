import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '../../../shared/wp-api': path.resolve(__dirname, './wp-api.js'),
    },
  },
  assetsInclude: ['**/*.MP4', '**/*.mp4'],
  server: {
    port: 5173,
    open: false,
    host: true,
  },
});
