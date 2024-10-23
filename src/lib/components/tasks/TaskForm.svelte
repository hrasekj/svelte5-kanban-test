<script lang="ts">
  import { Button } from '$lib/shadcn/ui/button'
  import { Input } from '$lib/shadcn/ui/input'
  import { Textarea } from '$lib/shadcn/ui/textarea'
  import * as Dialog from '$lib/shadcn/ui/dialog'
  import { superForm, defaultValues } from 'sveltekit-superforms'
  import { zod, zodClient } from 'sveltekit-superforms/adapters'

  import { Field } from '../shared/forms/field'
  import LabelRadioGroup from './LabelRadioGroup.svelte'
  import { TaskFormSchema, type TaskFormSchemaType } from './TaskForm.schema'

  type Props = {
    data?: TaskFormSchemaType & { id?: string }
    open: boolean
  }

  let { data, open = $bindable() }: Props = $props()

  const initialFormId = 'new-task'
  const defaults = defaultValues(zod(TaskFormSchema))
  const form = superForm(defaults, {
    id: initialFormId,
    validators: zodClient(TaskFormSchema),
  })

  const { form: formData, enhance, reset, isTainted, formId } = form

  const title = $derived(data?.id ? `#${data.id}` : 'Create a Task')

  $effect(() => {
    const taskId = data?.id && `#${data?.id}`

    // do not reset form state, when there are changes
    if (!isTainted() || $formId !== taskId) {
      reset({ id: taskId ?? initialFormId, data })
    }
  })
</script>

<form method="POST" use:enhance>
  <Dialog.Root {open} onOpenChange={(isOpen) => (open = isOpen)}>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>{title}</Dialog.Title>
      </Dialog.Header>

      <div>
        <LabelRadioGroup bind:value={$formData.label} />
        <Field {form} name="title" label="Subject">
          {#snippet control(attrs)}
            <Input {...attrs} bind:value={$formData.title} placeholder="I need to finish..." />
          {/snippet}
        </Field>

        <Field {form} name="description" label="Description">
          {#snippet control(attrs)}
            <Textarea {...attrs} bind:value={$formData.description} placeholder="Please include all information relevant to your issue." />
          {/snippet}
        </Field>
      </div>

      <Dialog.Footer>
        <Button variant="ghost">Cancel</Button>
        <Button type="submit">Submit</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
</form>
