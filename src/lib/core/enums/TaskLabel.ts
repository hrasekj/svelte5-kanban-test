export const TaskLabel = {
  Bug: 'bug',
  Feature: 'feature',
  Question: 'question',
  Other: 'other',
} as const

export type TaskLabel = (typeof TaskLabel)[keyof typeof TaskLabel]
