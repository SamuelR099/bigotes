import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://localhost:4321",
  vite: {
    ssr: {
      noExternal: ["@fontsource-variable/rubik"],
    },
  },
});
