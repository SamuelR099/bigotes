import { defineConfig } from 'astro/config';

export default defineConfig({
  vite: {
    ssr: {
      noExternal: ['@fontsource-variable/rubik']
    }
  }
});
