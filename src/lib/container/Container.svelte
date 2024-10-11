<script lang="ts" context="module">
  import { TaskStore } from '$core/services/tasks/TaskStore'
  import { InMemoryTaskClient } from '$infrastructure/tasks/in-memory-client'
  import { container } from './store'
  ;(async () => {
    const client = new InMemoryTaskClient()
    const tasks = new TaskStore(client)

    container.set({ tasks })
  })()

  export { container }
</script>

<script lang="ts">
  import { derived } from 'svelte/store'

  const isLoading = derived(container, (container) => container === null)
</script>

{#if $isLoading}
  <p>Loading...</p>
{:else}
  <slot />
{/if}
