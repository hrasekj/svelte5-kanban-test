<script lang="ts">
  import Container from '$lib/container/Container.svelte'
  import { pageTitle } from '$lib/stores/pageTitle'
  import { ModeWatcher } from 'mode-watcher'

  import '../app.css'

  let { children } = $props()
</script>

<svelte:head>
  <title>{$pageTitle}</title>
</svelte:head>

<ModeWatcher />

<Container>
  <main>
    {@render children()}
  </main>
</Container>
