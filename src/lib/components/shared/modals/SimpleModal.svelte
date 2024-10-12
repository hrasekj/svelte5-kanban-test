<script lang="ts">
  import * as Dialog from '$lib/shadcn/ui/dialog'
  import type { ModalProps } from './types'

  let { title, open = $bindable(), children, footer }: ModalProps = $props()
</script>

<Dialog.Root {open} onOpenChange={(state) => (open = state)}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>{title}</Dialog.Title>
    </Dialog.Header>

    {@render children()}

    {#if footer}
      <Dialog.Footer>
        {@render footer()}
      </Dialog.Footer>
    {/if}
  </Dialog.Content>
</Dialog.Root>
