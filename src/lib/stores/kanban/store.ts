import { SvelteMap } from 'svelte/reactivity'
import type { KanbanItem } from './types.ts'
import type { ITask } from '$core/entities/ITask.ts'

export class KanbanStore extends SvelteMap<string, KanbanItem[]> {
  #placeholders = new Set<string>()

  constructor(items: ITask[]) {
    super()

    for (const task of items) {
      const columnId = task.status
      const columnItems = this.get(columnId) ?? []
      columnItems.push({
        type: 'task',
        columnId,
        item: task,
      })
      this.set(columnId, columnItems)
    }
  }

  moveItem({ fromColumn, toColumn, itemId }) {
    const fromColumnItems = this.get(fromColumn) ?? []
    const toColumnItems = this.get(toColumn) ?? []

    const [item] = fromColumnItems.splice(itemId, 1)
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
