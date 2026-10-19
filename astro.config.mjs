import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://lucasgallardo.dev',
  trailingSlash: 'ignore',
  prefetch: true,
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
