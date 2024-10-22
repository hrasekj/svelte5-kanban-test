<script lang="ts">
    import { TaskStatus } from "$core/enums/TaskStatus";
    import type { ITask } from "$core/entities/ITask";
    import { TaskLabel } from "$core/enums/TaskLabel";
    import ColumnRoot from "$lib/components/kanban/ColumnRoot.svelte";
    import ColumnContent from "$lib/components/kanban/ColumnContent.svelte";
    import ColumnFooter from "$lib/components/kanban/ColumnFooter.svelte";
    import ColumnHeader from "$lib/components/kanban/ColumnHeader.svelte";
    import { KanbanStore } from "$lib/stores/kanban/store";
    import type { KanbanItem } from "$lib/stores/kanban/types";

    const kanbanColumns = [
        { name: TaskStatus.Backlog, label: "Backlog" },
        { name: TaskStatus.Ready, label: "Ready" },
        { name: TaskStatus.InProgress, label: "In progress" },
        { name: TaskStatus.InReview, label: "In review" },
        { name: TaskStatus.Done, label: "Done" },
    ];

    const items = [
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
        {
            id: "6",
            label: TaskLabel.Bug,
            title: "Task 6",
            description: "Task 6 description",
            status: TaskStatus.Backlog,
        },
        {
            id: "7",
            label: TaskLabel.Feature,
            title: "Task 7",
            description: "Task 7 description",
            status: TaskStatus.Backlog,
        },
        {
            id: "8",
            label: TaskLabel.Question,
            title: "Task 8",
            description: "Task 8 description",
            status: TaskStatus.InProgress,
        },
        {
            id: "9",
            label: TaskLabel.Other,
            title: "Task 9",
            description: "Task 9 description",
            status: TaskStatus.InProgress,
        },
        {
            id: "10",
            label: TaskLabel.Bug,
            title: "Task 10",
            description: "Task 10 description",
            status: TaskStatus.InProgress,
        },
    ];

    const kanbanStore = new KanbanStore(items);

    const getData = (dataTransfer: DataTransfer | null) => {
        const [fromColumn, itemId] = dataTransfer ? dataTransfer.getData("text/plain").split("/") : [undefined, undefined];
        return { fromColumn, itemId };
    };

    type DragState = {
        currentColumn: string | undefined;
        fromColumn: string | undefined;
        itemId: string | undefined;
    };
    const dragState = $state<DragState>({ currentColumn: undefined, fromColumn: undefined, itemId: undefined });

    const events = {
        ondragover: (event: DragEvent, columnId: string) => {
            event.preventDefault();
            // console.log("Drag over", columnId, event);
        },
        ondragenter: (event: DragEvent, columnId: string) => {
            // event.preventDefault();
            // const item: KanbanItem | undefined = JSON.parse(event.dataTransfer?.getData("text/plain") || "undefined");
            // if (!item) return;

            const { currentColumn, fromColumn, itemId } = dragState;
            // const { fromColumn, itemId } = getData(event.dataTransfer);

            if (!currentColumn || currentColumn === columnId) return;
            console.log("Drag enter", currentColumn, fromColumn, columnId);

            dragState.currentColumn = columnId;

            const index = Number.parseInt(itemId ?? "0");

            kanbanStore.setPlaceholder(columnId, index);
        },

        //
        // TODO check how condition for currentColumn works in ondragenter and ondragleave
        //

        ondragleave: (event: DragEvent, columnId: string) => {
            // event.preventDefault();
            // const item: KanbanItem | undefined = JSON.parse(event.dataTransfer?.getData("text/plain") || "undefined");
            // if (!item) return;

            const { currentColumn, fromColumn } = dragState;
            // const { fromColumn } = getData(event.dataTransfer);

            if (!currentColumn || currentColumn === columnId) return;
            console.log("Drag leave", currentColumn, fromColumn, columnId);

            kanbanStore.removePlaceholder(columnId);
        },
        ondrop: (event: DragEvent, columnId: string) => {
            // event.preventDefault();
            // console.log("Drop", columnId);
            // console.log("Drop", event);

            const { fromColumn, itemId } = dragState;

            // const fromColumn = event.dataTransfer?.getData("fromColumn");
            if (!fromColumn || fromColumn === columnId) return;

            kanbanStore.removePlaceholder(columnId);

            // const itemId = event.dataTransfer?.getData("itemId") || "undefined";
            if (!itemId) return;

            kanbanStore.moveItem({
                fromColumn,
                toColumn: columnId,
                itemId: Number.parseInt(itemId),
            });
        },
        ondragstart: (event: DragEvent, item: KanbanItem, index: number) => {
            // console.log("Drag start", item, index);
            // event.dataTransfer?.setData("text/plain", `${item.columnId}/${item.columnId}/${index}`);
            dragState.currentColumn = item.columnId;
            dragState.fromColumn = item.columnId;
            dragState.itemId = `${index}`;
        },
        // ondragend: (event: DragEvent, item: KanbanItem, index: number) => {
        //     console.log("Drag end", event);
        // },
    };

    // $inspect("foo", kanbanStore);
</script>

<main class="flex-1 flex space-y-4 p-8 pt-6">
    <div class="flex-1 flex gap-3 relative overflow-y-hidden">
        {#each kanbanColumns as { name, label }}
            <ColumnRoot class="flex flex-col w-72 min-w-72">
                <ColumnHeader class="p-4" {name} {label} />
                <ColumnContent class="p-4" {name} items={kanbanStore.get(name)} {...events} />
                <!-- <ColumnFooter class="p-4" {name} /> -->
            </ColumnRoot>
        {/each}
    </div>
</main>
