<script lang="ts">
    import type { ITask } from "$core/entities/ITask";
    import { TaskLabel } from "$core/enums/TaskLabel";
    import { TaskStatus } from "$core/enums/TaskStatus";
    import { Content } from "$lib/shadcn/ui/card";
    import ColumnItem from "./ColumnItem.svelte";

    type Props = {
        class?: string;
        name: TaskStatus;
    };

    const { class: className, name }: Props = $props();

    const items: ITask[] = [
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
    ].filter((item) => item.status === name);
</script>

<Content class={className}>
    <div class="grid gap-2">
        {#each items as item}
            <ColumnItem {item} />
        {/each}
    </div>
</Content>
