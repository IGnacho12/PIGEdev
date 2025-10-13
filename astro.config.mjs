import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';
import path from 'path';

export default defineConfig({
  adapter: vercel(),
    integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('./src'), // <-- necesario
      },
    },
  },
});
