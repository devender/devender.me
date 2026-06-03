import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://devender.me',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: false,
    },
  },
  // Match WordPress trailing-slash URLs (/2019/11/19/aws-kinesis-demo/)
  trailingSlash: 'ignore',
});
