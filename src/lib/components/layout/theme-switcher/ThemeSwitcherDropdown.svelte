<script lang="ts">
  import { Button } from '$lib/shadcn/ui/button'
  import * as DropdownMenu from '$lib/shadcn/ui/dropdown-menu'
  import Moon from 'lucide-svelte/icons/moon'
  import Sun from 'lucide-svelte/icons/sun'
  import { resetMode, setMode } from 'mode-watcher'
  import { get } from 'svelte/store'
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button builders={[builder]} variant="outline" size="icon">
      <Sun class="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon class="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span class="sr-only">Toggle theme</span>
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end">
    <DropdownMenu.Item on:click={() => setMode('light')}>Light</DropdownMenu.Item>
    <DropdownMenu.Item on:click={() => setMode('dark')}>Dark</DropdownMenu.Item>
    <DropdownMenu.Item on:click={() => resetMode()}>System</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
