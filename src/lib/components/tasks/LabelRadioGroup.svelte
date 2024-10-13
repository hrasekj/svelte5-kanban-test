<script lang="ts">
  import * as Form from '$lib/shadcn/ui/form'
  import * as RadioGroup from '$lib/shadcn/ui/radio-group'
  import { TaskLabel } from '$core/enums/TaskLabel'
  import Badge from 'lucide-svelte/icons/badge'
  import Bug from 'lucide-svelte/icons/bug'
  import CircleHelp from 'lucide-svelte/icons/circle-help'
  import WandSparkles from 'lucide-svelte/icons/wand-sparkles'
  import type { SuperForm } from 'sveltekit-superforms'

  type Props = {
    value?: TaskLabel
  }

  let { value = $bindable(TaskLabel.Bug) }: Props = $props()

  const items = [
    { value: TaskLabel.Bug, icon: Bug, iconClass: 'text-danger', label: 'Bug' },
    { value: TaskLabel.Feature, icon: WandSparkles, iconClass: 'text-info', label: 'Feature' },
    { value: TaskLabel.Question, icon: CircleHelp, iconClass: 'text-success', label: 'Question' },
    { value: TaskLabel.Other, icon: Badge, iconClass: 'text-warning', label: 'Other' },
  ]
</script>

<fieldset class="space-y-3">
  <RadioGroup.Root bind:value={value as string} class="flex flex-row justify-between">
    {#each items as { value, icon: Icon, iconClass, label }}
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
