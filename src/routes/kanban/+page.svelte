<script lang="ts">
  import { TaskStatus } from '$core/enums/TaskStatus'
  import type { ITask } from '$core/entities/ITask'
  import { TaskLabel } from '$core/enums/TaskLabel'
  import ColumnRoot from '$lib/components/kanban/ColumnRoot.svelte'
  import ColumnContent, { type SortableEvent } from '$lib/components/kanban/ColumnContent.svelte'
  import ColumnFooter from '$lib/components/kanban/ColumnFooter.svelte'
  import ColumnHeader from '$lib/components/kanban/ColumnHeader.svelte'
  import { createKanbanStore, KanbanStore } from '$lib/stores/kanban/store'
  import type { KanbanItem } from '$lib/stores/kanban/types'
  import Button from '$lib/shadcn/ui/button/button.svelte'

  const kanbanColumns = [
    { name: TaskStatus.Backlog, label: 'Backlog' },
    { name: TaskStatus.Ready, label: 'Ready' },
    { name: TaskStatus.InProgress, label: 'In progress' },
    { name: TaskStatus.InReview, label: 'In review' },
    { name: TaskStatus.Done, label: 'Done' },
  ]

  const items = [
    {
      id: '1',
      label: TaskLabel.Bug,
      title: 'Task 1',
      description: 'Task 1 description',
      status: TaskStatus.Ready,
    },
    {
      id: '2',
      label: TaskLabel.Feature,
      title: 'Task 2',
      description: 'Task 2 description',
      status: TaskStatus.Ready,
    },
    {
      id: '3',
      label: TaskLabel.Feature,
      title: 'Task 3',
      description: 'Task 3 description',
      status: TaskStatus.Ready,
    },
    {
      id: '4',
      label: TaskLabel.Question,
      title: 'Task 4',
      description: 'Task 4 description',
      status: TaskStatus.Ready,
    },
    {
      id: '5',
      label: TaskLabel.Other,
      title: 'Task 5',
      description: 'Task 5 description',
      // status: TaskStatus.Backlog,
      status: TaskStatus.Ready,
    },
    {
      id: '6',
      label: TaskLabel.Bug,
      title: 'Task 6',
      description: 'Task 6 description',
      // status: TaskStatus.Backlog,
      status: TaskStatus.Ready,
    },
    {
      id: '7',
      label: TaskLabel.Feature,
      title: 'Task 7',
      description: 'Task 7 description',
      // status: TaskStatus.Backlog,
      status: TaskStatus.Ready,
    },
    {
      id: '8',
      label: TaskLabel.Question,
      title: 'Task 8',
      description: 'Task 8 description',
      // status: TaskStatus.InProgress,
      status: TaskStatus.Ready,
    },
    {
      id: '9',
      label: TaskLabel.Other,
      title: 'Task 9',
      description: 'Task 9 description',
      // status: TaskStatus.InProgress,
      status: TaskStatus.Ready,
    },
    {
      id: '10',
      label: TaskLabel.Bug,
      title: 'Task 10',
      description: 'Task 10 description',
      // status: TaskStatus.InProgress,
      status: TaskStatus.Ready,
    },
  ]

  const kanbanStore = new KanbanStore(items)
  // const kanbanStore = createKanbanStore(items);

  let chosenItem: KanbanItem | undefined

  const events = {
    onChoose: (event: SortableEvent) => {
      chosenItem = kanbanStore.getItem(event.fromColumn, event.oldIndex)
      console.log('onChoose', event, chosenItem)
    },
    onChange: (event: SortableEvent) => {
      // console.log("onChange", event);
    },
    onAdd: (event: SortableEvent) => {
      console.log('onAdd', event, chosenItem)
      if (!chosenItem) return

      kanbanStore.moveItem({
        fromColumn: chosenItem.columnId,
        toColumn: event.fromColumn,
        itemId: event.oldIndex,
      })
      chosenItem = undefined
    },
    onEnd: (event: SortableEvent) => {
      console.log('onEnd', event, chosenItem)
      if (!chosenItem) return

      if (chosenItem.columnId === event.fromColumn && event.oldIndex !== event.newIndex) {
        console.log('changePosition')
        kanbanStore.changePosition({
          columnId: event.fromColumn,
          fromIndex: event.oldIndex,
          toIndex: event.newIndex,
        })
      }
      chosenItem = undefined
    },
  }

  $inspect('kanbanStore', kanbanStore)
  $inspect('kanbanColumns', kanbanColumns)
</script>

<button
  class="bg-blue-500 text-white px-4 py-2 rounded-md"
  onclick={() => {
    const clone = items.map((item) => ({ ...item }))
    console.log('Le click', clone)
    kanbanStore.load(clone)
  }}>Reload store</button
>

<main class="flex-1 flex space-y-4 p-8 pt-6">
  <div class="flex-1 flex gap-3 relative overflow-y-hidden">
    {#each kanbanColumns as { name, label }}
      <ColumnRoot class="flex flex-col w-72 min-w-72">
        <ColumnHeader class="p-4" {name} {label} />
        <ColumnContent class="p-4" {name} items={kanbanStore.get(name)} {events} />
        <!-- <ColumnFooter class="p-4" {name} /> -->
      </ColumnRoot>
    {/each}
  </div>
</main>
