export const TaskStatus = {
  Open: 'open',
  Blocked: 'blocked',
  InProgress: 'in-progress',
  Complete: 'complete',
} as const

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus]
