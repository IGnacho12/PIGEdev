import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
@astrojs/vercel"
import path from "path";

export default defineConfig({
  adapter: vercel(),
  integrations: [react()],

  vite: {
    resolve: {
      alias: {
        "@": path.resolve("./src"), // <-- necesario
      },
    },
  },
});
