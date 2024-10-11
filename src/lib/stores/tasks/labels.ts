import { TaskLabel } from '$core/enums/TaskLabel.ts'
import { readable } from 'svelte/store'

export const labels = readable([
  {
    value: TaskLabel.Bug,
    label: 'Bug',
  },
  {
    value: TaskLabel.Feature,
    label: 'Feature',
  },
  {
    value: TaskLabel.Question,
    label: 'Question',
  },
  {
    value: TaskLabel.Other,
    label: 'Other',
  },
])
