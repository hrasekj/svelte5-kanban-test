import { type Writable, writable } from 'svelte/store'
import type { IContainer } from './IContainer.ts'

export const container = writable(null) as unknown as Writable<IContainer>
