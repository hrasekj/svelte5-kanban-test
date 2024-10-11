import type { ITaskStore } from '$core/services/tasks/ITaskStore.ts'

export interface IContainer {
  tasks: ITaskStore
}
