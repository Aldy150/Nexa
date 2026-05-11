import { defineConfig } from '@tanstack/start/config';
import vercelAdapter from '@tanstack/vercel-adapter';

export default defineConfig({
  server: {
    adapter: vercelAdapter()
  }
});