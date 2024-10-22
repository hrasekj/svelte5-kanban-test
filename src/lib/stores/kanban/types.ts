import type { ITask } from '$core/entities/ITask.ts'

export type KanbanItem = {
  type: 'task'
  columnId: string
  item: ITask
} | {
  type: 'placeholder'
  columnId: string
}
