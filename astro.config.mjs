import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://galla1980.github.io',
  trailingSlash: 'ignore',
  prefetch: true,
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
