<script lang="ts">
  import { pageTitle } from '$lib/stores/pageTitle'

  import '../app.css'

  let { children } = $props()
</script>

<svelte:head>
  <title>{$pageTitle}</title>
</svelte:head>

{@render children()}
