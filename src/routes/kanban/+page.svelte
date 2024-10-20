<script lang="ts">
    import { TaskStatus } from "$core/enums/TaskStatus";
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
</script>

<main class="flex-1 flex space-y-4 p-8 pt-6">
    <div class="flex-1 flex gap-3 relative overflow-y-hidden">
        {#each kanbanColumns as { name, label }}
            <ColumnRoot class="w-72 min-w-72">
                <ColumnHeader class="p-4" {name} {label} />
                <ColumnContent class="p-4" {name} />
                <ColumnFooter class="p-4" {name} />
            </ColumnRoot>
        {/each}
    </div>
</main>
