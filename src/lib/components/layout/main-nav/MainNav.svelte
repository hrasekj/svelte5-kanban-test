<script lang="ts">
  import { cn } from '$lib/utils/ui.js'
  import { page } from '$app/stores'

  let className: string | undefined | null = undefined
  export { className as class }

  const items = [
    { label: 'Overview', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Settings', href: '/settings' },
  ]
</script>

<nav class={cn('flex items-center space-x-4 lg:space-x-6', className)}>
  {#each items as { label, href }}
    <a
      {href}
      class={cn(
        $page.url.pathname === href ? '' : 'text-muted-foreground',
        'hover:text-primary text-sm font-medium transition-colors',
      )}
    >
      {label}
    </a>
  {/each}
</nav>
