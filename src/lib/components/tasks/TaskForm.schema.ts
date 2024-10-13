import { TaskLabel } from '$core/enums/TaskLabel.ts'
import { TaskStatus } from '$core/enums/TaskStatus.ts'
import { z } from 'zod'

export const TaskFormSchema = z.object({
  label: z.nativeEnum(TaskLabel).default(TaskLabel.Bug),
  title: z.string().min(2).max(128),
  description: z.string().optional(),
  status: z.nativeEnum(TaskStatus).default(TaskStatus.Open),
})

export type TaskFormSchemaType = z.infer<typeof TaskFormSchema>
