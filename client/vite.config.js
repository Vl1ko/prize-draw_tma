import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import { loadEnv } from 'vite';
import fs from 'fs';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 443,
    host: '0.0.0.0',
    hmr: {
      host: 'tg-mini-app.local',
      port: 443,
    },
    // https: {
    //   key: fs.readFileSync('./.cert/key.pem'),
    //   cert: fs.readFileSync('./.cert/cert.pem'),
    // },
  },
});
