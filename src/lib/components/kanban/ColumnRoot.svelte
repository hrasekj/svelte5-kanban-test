<script lang="ts">
    import { Root } from "$lib/shadcn/ui/card";
    import type { Snippet } from "svelte";

    type Props = {
        class?: string;
        children: Snippet
    };

    const { class: className, children }: Props = $props();
</script>

<Root class={className}>
    {@render children()}
</Root>
