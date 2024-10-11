import type { ID, ITask, ITaskToUpdate, ITaskWithoutId } from '$core/entities/ITask.ts'
import type { ITaskClient } from '$core/services/tasks/ITaskClient.ts'

export class InMemoryTaskClient implements ITaskClient {
  private tasks: ITask[] = []
  private nextId = 1

  createTask(task: ITaskWithoutId): Promise<ITask> {
    const newTask: ITask = {
      id: this.nextId.toString(),
      ...task,
    }
    this.tasks.push(newTask)
    this.nextId++
    return Promise.resolve(newTask)
  }

  updateTask(task: ITaskToUpdate): Promise<ITask> {
    const index = this.tasks.findIndex((t) => t.id === task.id)
    if (index === -1) {
      throw new Error('Task not found')
    }
    this.tasks[index] = { ...this.tasks[index], ...task }
    return Promise.resolve(this.tasks[index])
  }

  deleteTask(taskId: ID): Promise<void> {
    const index = this.tasks.findIndex((t) => t.id === taskId)
    if (index === -1) {
      throw new Error('Task not found')
    }
    this.tasks.splice(index, 1)

    return Promise.resolve()
  }

  loadTasks(): Promise<ITask[]> {
    return Promise.resolve(this.tasks.slice())
  }
}
