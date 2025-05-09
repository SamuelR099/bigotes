import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://localhost:4321",

  vite: {
    ssr: {
      noExternal: ["@fontsource-variable/rubik"],
    },
  },

  integrations: [react(), tailwind()],
});
