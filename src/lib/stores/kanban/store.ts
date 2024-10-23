import { SvelteMap } from 'svelte/reactivity'
import type { KanbanItem } from './types.ts'
import type { ITask } from '$core/entities/ITask.ts'

import { get, type Writable, writable } from 'svelte/store'

export class KanbanStore extends SvelteMap<string, KanbanItem[]> {
  #placeholders = new Set<string>()

  constructor(items: ITask[]) {
    super()
    this.load(items)
  }

  load(items: ITask[]) {
    for (const [columnId, columnItems] of groupBy(items, (item) => item.status)) {
      this.set(
        columnId,
        columnItems.map((item) => ({
          type: 'task',
          columnId,
          item,
        })),
      )
    }
  }

  getItem(columnId: string, index?: number) {
    const items = this.get(columnId)
    return items && typeof index === 'number' ? items[index] : undefined
  }

  changePosition({ columnId, fromIndex, toIndex }) {
    const columnItems = this.get(columnId) ?? []
    const [item] = columnItems.splice(fromIndex, 1)
    columnItems.splice(toIndex, 0, item)

    setTimeout(() => {
      this.set(columnId, columnItems.slice())
    }, 1000)
  }

  moveItem({ fromColumn, toColumn, itemId }) {
    const fromColumnItems = this.get(fromColumn) ?? []
    const toColumnItems = this.get(toColumn) ?? []

    const [item] = fromColumnItems.splice(itemId, 1)
    console.log('moveItem', fromColumn, toColumn, item)
    toColumnItems.push({
      ...item,
      columnId: toColumn,
    })

    this.set(fromColumn, fromColumnItems.slice())
    this.set(toColumn, toColumnItems.slice())
  }

  setPlaceholder(columnId: string, index: number) {
    if (this.#placeholders.has(columnId)) return

    const columnItems = this.get(columnId) ?? []

    // const index = columnItems.length
    columnItems.splice(index, 0, {
      type: 'placeholder',
      columnId,
    })

    this.set(columnId, columnItems.slice())
    this.#placeholders.add(columnId)
  }

  removePlaceholder(columnId: string) {
    const columnItems = this.get(columnId) ?? []

    const index = columnItems.findIndex((item) => item.type === 'placeholder')
    if (index === -1) return

    columnItems.splice(index, 1)

    this.set(columnId, columnItems.slice())
    this.#placeholders.delete(columnId)
  }
}

export function createKanbanStore(items: ITask[]) {
  const store = new Map<string, Writable<KanbanItem[]>>()

  for (const [columnId, columnItems] of groupBy(items, (item) => item.status)) {
    store.set(
      columnId,
      writable<KanbanItem[]>(
        columnItems.map((item) => ({
          type: 'task',
          columnId,
          item,
        })),
      ),
    )
  }

  return {
    get: (columnId: string) => {
      // const columnItems = getStoreItems(store, columnId)
      // return derived(columnItems, (items) => items.slice())
      return getStoreItems(store, columnId)
    },

    getItem(columnId: string, index?: number) {
      const columnItems = getStoreItems(store, columnId)
      return typeof index === 'number' ? get(columnItems)[index] : undefined
    },

    changePosition({ columnId, fromIndex, toIndex }: { columnId: string; fromIndex: number; toIndex: number }) {
      const columnItems = getStoreItems(store, columnId)

      columnItems.update((items) => {
        const [item] = items.splice(fromIndex, 1)
        items.splice(toIndex, 0, item)
        return items.slice()
      })
    },

    moveItem({ fromColumn, toColumn, itemId }: { fromColumn: string; toColumn: string; itemId: number }) {
      const fromColumnItems = getStoreItems(store, fromColumn)
      const toColumnItems = getStoreItems(store, toColumn)

      let item: KanbanItem | undefined = undefined
      fromColumnItems.update((items) => {
        ;[item] = items.splice(itemId, 1)
        return items.slice()
      })

      console.log('moveItem', fromColumn, toColumn, item)

      toColumnItems.update((items) => {
        if (!item) {
          console.error('Item not found', fromColumn, toColumn, itemId)
          return items
        }

        items.push({
          ...item,
          columnId: toColumn,
        })

        return items.slice()
      })
    },
  }
}

function getStoreItems(store: Map<string, Writable<KanbanItem[]>>, columnId: string): Writable<KanbanItem[]> {
  return store.get(columnId) ?? writable<KanbanItem[]>([])
}

function groupBy<TItem>(arr: TItem[], key: (k: TItem) => string) {
  const store = new Map<string, TItem[]>()
  for (const item of arr) {
    const k = key(item)
    const items = store.get(k) ?? []
    items.push(item)
    store.set(k, items)
  }
  return store
}
