import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  // Temporary build-time diagnostic to check Vercel build environment variables
  console.log('\n========================================');
  console.log('[VERCEL BUILD-TIME FIREBASE ENV CHECK]');
  const firebaseVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID',
  ];

  firebaseVars.forEach((varName) => {
    const isPresent = Boolean(process.env[varName] && process.env[varName]?.trim() !== '');
    console.log(`${varName}: ${isPresent ? 'PRESENT' : 'MISSING'}`);
  });
  console.log('========================================\n');

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
