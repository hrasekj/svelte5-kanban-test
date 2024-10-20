<script lang="ts">
    import type { ITask } from "$core/entities/ITask";
    import * as Card from "$lib/shadcn/ui/card";
    import { labels } from "$lib/stores/tasks/labels";
    import { cn } from "$lib/utils/ui";

    type Props = {
        item: ITask;
    };

    let { item }: Props = $props();

    const label = $derived.by(() => {
        return $labels.find((label) => label.value === item.label);
    });
</script>

<Card.Root>
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
