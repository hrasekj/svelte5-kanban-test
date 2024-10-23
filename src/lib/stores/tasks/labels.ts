import { TaskLabel } from '$core/enums/TaskLabel.ts'
import { readable } from 'svelte/store'
import Badge from 'lucide-svelte/icons/badge'
import Bug from 'lucide-svelte/icons/bug'
import CircleHelp from 'lucide-svelte/icons/circle-help'
import WandSparkles from 'lucide-svelte/icons/wand-sparkles'

export const labels = readable([
  { value: TaskLabel.Bug, icon: Bug, iconClass: 'text-danger', label: 'Bug' },
  { value: TaskLabel.Feature, icon: WandSparkles, iconClass: 'text-info', label: 'Feature' },
  { value: TaskLabel.Question, icon: CircleHelp, iconClass: 'text-success', label: 'Question' },
  { value: TaskLabel.Other, icon: Badge, iconClass: 'text-warning', label: 'Other' },
])
