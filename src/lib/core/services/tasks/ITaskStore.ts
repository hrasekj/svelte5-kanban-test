import type { ID, ITask, ITaskToUpdate, ITaskWithoutId } from '$core/entities/ITask.ts'
import type { Readable } from 'svelte/store'

export interface ITaskStore extends Readable<ITask[]> {
  isLoading: Readable<boolean>
  loadTasks(): Promise<void>
  addTask(task: ITaskWithoutId): Promise<ITask>
  updateTask(task: ITaskToUpdate): Promise<ITask>
  deleteTask(taskId: ID): Promise<void>
}
