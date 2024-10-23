<script module lang="ts">
  // import { type SortableEvent as Event } from "sortablejs";

  export type SortableEvent = {
    fromColumn: string;
    newIndex: number|undefined;
    oldIndex: number|undefined;
    // item: KanbanItem;
  }

  type Props = {
        class?: string;
        name: TaskStatus;
        items?: KanbanItem[];
        events: {
            onChoose: (event: SortableEvent) => void;
            onChange: (event: SortableEvent) => void;
            onAdd: (event: SortableEvent) => void;
            onEnd: (event: SortableEvent) => void;
        };
    }
</script>

<script lang="ts">
    import type { TaskStatus } from "$core/enums/TaskStatus";
    import { Content } from "$lib/shadcn/ui/card";
    import ColumnItem from "./ColumnItem.svelte";
    import { cn } from "$lib/utils/ui";
    import type { KanbanItem } from "$lib/stores/kanban/types";
    import Sortable from "sortablejs";

    const { class: className, name, items = [], events }: Props = $props();

    let list: HTMLDivElement;

    $effect(() => {
        const sortable = Sortable.create(list, {
            group: {
              name:"kanban",
              pull: true
            },
            onChoose: (event) => {
                // mouse down event
                // console.log("onChoose", event);
                events.onChoose({
                  fromColumn: name,
                  newIndex: event.newIndex,
                  oldIndex: event.oldIndex,
                  // item:
                });
            },
            onChange: (event) => {
                // when item changes position in column or moved over another column
                // console.log("onChange", event);
                events.onChange({
                  fromColumn: name,
                  newIndex: event.newIndex,
                  oldIndex: event.oldIndex,
                  // item:
                });
            },
            onAdd: (event) => {
                // when item is dropped in column
                // console.log("onAdd", event);
                events.onAdd({
                  fromColumn: name,
                  newIndex: event.newIndex,
                  oldIndex: event.oldIndex,
                  // item:
                });
            },
            onEnd: (event) => {
                // mouse up event
                // console.log("onEnd", event);
                events.onEnd({
                  fromColumn: name,
                  newIndex: event.newIndex,
                  oldIndex: event.oldIndex,
                  // item:
                });
            },
        });

        return () => {
            sortable.destroy();
        };
    });

    $inspect("kanban.ITEMS", name, items);
</script>

<Content class={cn("flex-1", className)}>
    <div bind:this={list} class="h-full flex flex-col gap-2">
        {#each items as item, index}
            {@debug item, index}
            {#if item.type === "task"}
                <ColumnItem {index} item={item.item} draggable={true} />
            {/if}
            <!-- TODO remove placeholder type -->
            {#if item.type === "placeholder"}
                <div class="h-1 bg-info"></div>
            {/if}
        {/each}
    </div>
</Content>
