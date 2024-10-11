import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    // temporary workaround
    // @see https://github.com/denoland/deno/issues/17757
    watch: {
      useFsEvents: false,
      usePolling: true,
    },
  },
})
