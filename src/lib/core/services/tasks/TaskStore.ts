import type { ID, ITask, ITaskToUpdate, ITaskWithoutId } from '$core/entities/ITask.ts'
import { derived, type Readable, writable } from 'svelte/store'
import type { ITaskClient } from './ITaskClient.ts'
import type { ITaskStore } from './ITaskStore.ts'

export class TaskStore implements ITaskStore {
  private store = writable(new Map<string, ITask>())
  private isLoadingWritable = writable(false)

  public subscribe: Readable<ITask[]>['subscribe']
  public isLoading: Readable<boolean>

  constructor(private client: ITaskClient) {
    this.subscribe = derived(this.store, (tasks) => Array.from(tasks.values())).subscribe
    this.isLoading = derived(this.isLoadingWritable, ($isLoading) => $isLoading)
  }

  async loadTasks() {
    this.isLoadingWritable.set(true)

    const tasks = await this.client.loadTasks()
    this.store.set(new Map(tasks.map((task) => [task.id, task])))

    this.isLoadingWritable.set(false)
  }

  async addTask(task: ITaskWithoutId) {
    const newTask = await this.client.createTask(task)

    this.store.update((tasks) => {
      tasks.set(newTask.id, newTask)
      return tasks
    })

    return newTask
  }

  async updateTask(task: ITaskToUpdate) {
    const updatedTask = await this.client.updateTask(task)

    this.store.update((tasks) => {
      tasks.set(updatedTask.id, updatedTask)
      return tasks
    })

    return updatedTask
  }

  async deleteTask(taskId: ID) {
    await this.client.deleteTask(taskId)

    this.store.update((tasks) => {
      tasks.delete(taskId)
      return tasks
    })
  }
}
