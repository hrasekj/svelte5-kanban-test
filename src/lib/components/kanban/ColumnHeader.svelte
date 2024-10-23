<script lang="ts">
  import { TaskStatus } from '$core/enums/TaskStatus'
  import { Header } from '$lib/shadcn/ui/card'

  type Props = {
    class?: string
    name: TaskStatus
    label: string
  }

  const { class: className, name, label }: Props = $props()
</script>

<Header class={className}>
  <div class="flex gap-2 items-center">
    <!-- <Circle class="text-danger text-1em" /> -->
    <h2 class="text-lg font-semibold">{label}</h2>
  </div>
</Header>
