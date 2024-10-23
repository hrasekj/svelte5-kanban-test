export const TaskStatus = {
  Backlog: 'backlog',
  Ready: 'ready',
  InProgress: 'in-progress',
  InReview: 'in-review',
  Done: 'done',
} as const

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus]
