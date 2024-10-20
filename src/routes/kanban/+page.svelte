<script lang="ts">
    import { TaskStatus } from "$core/enums/TaskStatus";
    import type { ITask } from "$core/entities/ITask";
    import { TaskLabel } from "$core/enums/TaskLabel";
    import ColumnRoot from "$lib/components/kanban/ColumnRoot.svelte";
    import ColumnContent from "$lib/components/kanban/ColumnContent.svelte";
    import ColumnFooter from "$lib/components/kanban/ColumnFooter.svelte";
    import ColumnHeader from "$lib/components/kanban/ColumnHeader.svelte";

    const kanbanColumns = [
        { name: TaskStatus.Backlog, label: "Backlog" },
        { name: TaskStatus.Ready, label: "Ready" },
        { name: TaskStatus.InProgress, label: "In progress" },
        { name: TaskStatus.InReview, label: "In review" },
        { name: TaskStatus.Done, label: "Done" },
    ];

    const items = $state<ITask[]>([
        {
            id: "1",
            label: TaskLabel.Bug,
            title: "Task 1",
            description: "Task 1 description",
            status: TaskStatus.Ready,
        },
        {
            id: "2",
            label: TaskLabel.Feature,
            title: "Task 2",
            description: "Task 2 description",
            status: TaskStatus.Ready,
        },
        {
            id: "3",
            label: TaskLabel.Feature,
            title: "Task 3",
            description: "Task 3 description",
            status: TaskStatus.Ready,
        },
        {
            id: "4",
            label: TaskLabel.Question,
            title: "Task 4",
            description: "Task 4 description",
            status: TaskStatus.Ready,
        },
        {
            id: "5",
            label: TaskLabel.Other,
            title: "Task 5",
            description: "Task 5 description",
            status: TaskStatus.Backlog,
        },
    ]);
</script>

<main class="flex-1 flex space-y-4 p-8 pt-6">
    <div class="flex-1 flex gap-3 relative overflow-y-hidden">
        {#each kanbanColumns as { name, label }}
            <ColumnRoot class="w-72 min-w-72">
                <ColumnHeader class="p-4" {name} {label} />
                <ColumnContent class="p-4" {name} items={items.filter((item) => item.status === name)} />
                <ColumnFooter class="p-4" {name} />
            </ColumnRoot>
        {/each}
    </div>
</main>
