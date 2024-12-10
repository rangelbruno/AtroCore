import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind({
    minify: true,
    config: {
      darkMode: 'class',
    }
  })],
  output: 'server',
  experimental: {
    clientPrerender: true
  }
});
