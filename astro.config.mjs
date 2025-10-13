import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import path from 'path';

export default defineConfig({
  adapter: vercel(),
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'), // <-- necesario
      },
    },
  },
});
