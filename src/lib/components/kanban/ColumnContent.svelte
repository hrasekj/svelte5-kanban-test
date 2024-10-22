<script lang="ts">
    import type { TaskStatus } from "$core/enums/TaskStatus";
    import { Content } from "$lib/shadcn/ui/card";
    import ColumnItem from "./ColumnItem.svelte";
    import { cn } from "$lib/utils/ui";
    import type { KanbanItem } from "$lib/stores/kanban/types";

    type Props = {
        class?: string;
        name: TaskStatus;
        items?: KanbanItem[];
        // TODO refactor, move it to the parent component
        ondragover?: (event: DragEvent, columnId: string) => void;
        ondragenter?: (event: DragEvent, columnId: string) => void;
        ondragleave?: (event: DragEvent, columnId: string) => void;
        ondrop?: (event: DragEvent, columnId: string) => void;
        ondragstart?: (event: DragEvent, item: KanbanItem, index: number) => void;
        ondragend?: (event: DragEvent, item: KanbanItem, index: number) => void;
    };

    const { class: className, name, items = [], ondragover, ondragenter, ondragleave, ondrop, ondragstart, ondragend }: Props = $props();

    // $inspect("kanban.ITEMS", items);
</script>

<Content
    class={cn("flex-1", className)}
    ondragover={ondragover ? (event) => ondragover(event, name) : undefined}
    ondragenter={ondragenter ? (event) => ondragenter(event, name) : undefined}
    ondragleave={ondragleave ? (event) => ondragleave(event, name) : undefined}
    ondrop={ondrop ? (event) => ondrop(event, name) : undefined}
>
    <div class="flex flex-col gap-2">
        {#each items as item, index}
            {#if item.type === "task"}
                <ColumnItem
                    item={item.item}
                    draggable={true}
                    ondragstart={ondragstart ? (event) => ondragstart(event, item, index) : undefined}
                    ondragend={ondragend ? (event) => ondragend(event, item, index) : undefined}
                />
            {/if}
            {#if item.type === "placeholder"}
                <div class="h-1 bg-info"></div>
            {/if}
        {/each}
    </div>
</Content>
