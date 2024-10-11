import type { TaskLabel } from '$core/enums/TaskLabel.ts'

export type ID = string

export interface ITask {
  readonly id: ID
  projectId?: string
  label: TaskLabel
  title: string
  description?: string
  completed: boolean
}

export type ITaskWithoutId = Omit<ITask, 'id'>
export type ITaskToUpdate = { readonly id: ID } & Partial<ITaskWithoutId>
