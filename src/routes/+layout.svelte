<script lang="ts">
  import PageHeader from '$lib/components/layout/page-header/PageHeader.svelte'
  import DependenciesProvider from '$lib/container/DependenciesProvider.svelte'
  import { pageTitle } from '$lib/stores/pageTitle'
  import { ModeWatcher } from 'mode-watcher'

  import '../app.css'

  let { children } = $props()
</script>

<svelte:head>
  <title>{$pageTitle}</title>
</svelte:head>

<ModeWatcher />

<DependenciesProvider>
  <div class="flex flex-col h-screen">
    <PageHeader />

    {@render children()}
  </div>
</DependenciesProvider>
