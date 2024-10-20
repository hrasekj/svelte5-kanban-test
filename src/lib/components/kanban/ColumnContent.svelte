<script lang="ts">
    import type { TaskStatus } from "$core/enums/TaskStatus";
    import type { ITask } from "$core/entities/ITask";
    import { Content } from "$lib/shadcn/ui/card";
    import ColumnItem from "./ColumnItem.svelte";

    type Props = {
        class?: string;
        name: TaskStatus;
        items: ITask[];
    };

    const { class: className, name, items }: Props = $props();
</script>

<Content class={className}>
    <div class="grid gap-2">
        {#each items as item}
            <ColumnItem {item} />
        {/each}
    </div>
</Content>
