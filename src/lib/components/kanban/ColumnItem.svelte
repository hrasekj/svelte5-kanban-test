<script lang="ts">
    import type { ITask } from "$core/entities/ITask";
    import * as Card from "$lib/shadcn/ui/card";
    import { labels } from "$lib/stores/tasks/labels";
    import { cn } from "$lib/utils/ui";

    type Props = {
        draggable?: boolean;
        item: ITask;
        index: number;
        // ondragenter?: (event: DragEvent) => void;
        ondragstart?: (event: DragEvent) => void;
        ondragend?: (event: DragEvent) => void;
    };

    let { item, index, draggable, ondragstart, ondragend }: Props = $props();

    const label = $derived.by(() => {
        return $labels.find((label) => label.value === item.label);
    });

    let dragging = $state(false);

    const handleDragStart = (event: DragEvent) => {
        setTimeout(() => {
            dragging = true;
        }, 0);
        ondragstart?.(event);
    };

    const handleDragEnd = (event: DragEvent) => {
        setTimeout(() => {
            dragging = false;
        }, 0);
        ondragend?.(event);
    };

    $inspect("ColumnItem.index", index);
</script>

<Card.Root
    {draggable}
    ondragstart={handleDragStart}
    ondragend={handleDragEnd}
    class={cn(dragging ? "opacity-15" : "opacity-100", "duration-100 transition-opacity")}
>
    <Card.Header>
        <Card.Title class="flex flex-row gap-2 items-center text-sm">
            {#if label}
                <label.icon class={cn("w-[1em] h-[1em]", label.iconClass)} />
            {/if}
            <span>{item.title}</span>
        </Card.Title>
    </Card.Header>
    <Card.Content>
        <p>Card Content</p>
    </Card.Content>
    <!-- <Card.Footer>
        <p>Card Footer</p>
    </Card.Footer> -->
</Card.Root>
