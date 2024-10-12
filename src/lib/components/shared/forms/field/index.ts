import type { ControlSlotProps, DescriptionSlotProps } from 'formsnap'
import type { Snippet } from 'svelte'
import type { SuperForm } from 'sveltekit-superforms'

import Root from './Field.svelte'

type ControlProps = ControlSlotProps['attrs']
type DescriptionProps = DescriptionSlotProps['descriptionAttrs']

type FieldProps = {
  // deno-lint-ignore no-explicit-any
  form: SuperForm<any>
  name: string
  label?: string
  control: Snippet<[ControlProps]>
  description?: Snippet<[DescriptionProps]>
}

export { type FieldProps, Root as Field }
