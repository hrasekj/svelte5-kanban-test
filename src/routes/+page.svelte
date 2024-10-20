<script lang="ts">
  import { pageTitle } from '$lib/stores/pageTitle'
  import TaskForm from '$lib/components/tasks/TaskForm.svelte'

  pageTitle.set('Overview')

  let modalOpen = $state(false)
  let data = $state<any>()
</script>

<main class="flex-1 space-y-4 p-8 pt-6">
  <button
    onclick={() => {
      modalOpen = true
      data = undefined
    }}
  >
    Open Modal - new
  </button>

  <button
    onclick={() => {
      modalOpen = true
      data = {
        id: 123,
        title: 'Foobar',
        label: 'question',
        status: 'open',
      }
    }}
  >
    Open Modal - existing
  </button>

  <TaskForm bind:open={modalOpen} {data} />

  <div class="flex">
    <section class="flex-1">
      <h1>Welcome to SvelteKit</h1>
      <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
    </section>
  </div>
</main>
