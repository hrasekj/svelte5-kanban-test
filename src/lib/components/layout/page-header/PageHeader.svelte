<script lang="ts">
  import MainNav from '../main-nav/MainNav.svelte'
  import Search from '../search/Search.svelte'
  import ThemeSwitcherDropdown from '../theme-switcher/ThemeSwitcherDropdown.svelte'
</script>

<header class="border-b">
  <div class="flex h-16 items-center px-8">
    <MainNav class="mr-4" />
    <div class="ml-auto flex items-center space-x-4">
      <Search />
      <ThemeSwitcherDropdown />
    </div>
  </div>
</header>
