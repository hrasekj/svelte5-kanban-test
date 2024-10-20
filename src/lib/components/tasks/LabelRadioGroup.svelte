<script lang="ts">
  import * as RadioGroup from '$lib/shadcn/ui/radio-group'
  import { TaskLabel } from '$core/enums/TaskLabel'
    import { labels } from '$lib/stores/tasks/labels';

  type Props = {
    value?: TaskLabel
  }

  let { value = $bindable(TaskLabel.Bug) }: Props = $props()

</script>

<fieldset class="space-y-3">
  <RadioGroup.Root bind:value={value as string} class="flex flex-row justify-between">
    {#each $labels as { value, icon: Icon, iconClass, label }}
      <label
        class="cursor-pointer hover:bg-card has-[[aria-checked=true]]:bg-card p-4 flex flex-col gap-2 items-center flex-1"
      >
        <RadioGroup.Item {value} class="hidden" />
        <Icon class={iconClass} />
        {label}
      </label>
    {/each}
  </RadioGroup.Root>
</fieldset>
