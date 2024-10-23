<script lang="ts">
  import { TaskStatus } from '$core/enums/TaskStatus'
  import { Footer } from '$lib/shadcn/ui/card'

  type Props = {
    class?: string
    name: TaskStatus
  }

  const { class: className, name }: Props = $props()
</script>

<Footer class={className}></Footer>
