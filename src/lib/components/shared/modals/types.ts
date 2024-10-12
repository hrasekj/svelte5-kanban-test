import type { Snippet } from 'svelte'

export type ModalProps = {
  title: string
  open: boolean
  children: Snippet
  footer?: Snippet
}
