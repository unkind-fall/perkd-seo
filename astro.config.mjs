import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://perkd.com.au',
  build: {
    format: 'directory',
  },
});
