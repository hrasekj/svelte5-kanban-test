// import adapter from "svelte-adapter-deno";
import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import denoConfig from './deno.json' with { type: 'json' }

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // See https://kit.svelte.dev/docs/adapter-static#usage
    adapter: adapter(),
    alias: processAlias(denoConfig.imports),
  },
}

/**
 * Processes the alias configuration from deno.json imports.
 * @param {Object<string, string>} imports - The imports object from deno.json.
 * @returns {Object<string, string>} - The processed alias configuration.
 */
function processAlias(imports) {
  return Object.entries(denoConfig.imports).reduce((acc, [key, value]) => {
    if (key.endsWith('/')) {
      acc[`${key}*`] = `${value}*`
    } else {
      acc[key] = value
    }
    return acc
  }, {})
}

export default config
