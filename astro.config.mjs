import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'static',
  site: 'https://perkd.com.au',
  build: {
    format: 'directory',
  },
});
