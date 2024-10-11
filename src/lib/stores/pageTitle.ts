import { type Writable, writable } from 'svelte/store'

const pageTitleStoreFactory = (): Writable<string> => {
  const appName = 'Project board'
  const { subscribe, set, update } = writable(appName)

  return {
    subscribe,
    set: (value) => {
      const title = [value, appName].filter(Boolean).join(' - ')
      set(title)
    },
    update,
  }
}

export const pageTitle = pageTitleStoreFactory()
