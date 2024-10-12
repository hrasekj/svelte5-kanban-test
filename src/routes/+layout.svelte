<script lang="ts">
  import DependenciesProvider  from '$lib/container/DependenciesProvider.svelte'
  import { pageTitle } from '$lib/stores/pageTitle'
  import { ModeWatcher } from 'mode-watcher'

  import '../app.css'

  let { children } =  $props()
</script>

<svelte:head>
  <title>{$pageTitle}</title>
</svelte:head>

<ModeWatcher />

<DependenciesProvider>
  <main>
    {@render children()}
  </main>
</DependenciesProvider>
