import type { ID, ITask, ITaskToUpdate, ITaskWithoutId } from '$core/entities/ITask.ts'

export interface ITaskClient {
  createTask(task: ITaskWithoutId): Promise<ITask>
  updateTask(task: ITaskToUpdate): Promise<ITask>
  deleteTask(taskId: ID): Promise<void>
  loadTasks(): Promise<ITask[]>
}
