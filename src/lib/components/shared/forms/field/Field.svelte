<script lang="ts">
  import * as Form from '$lib/shadcn/ui/form'
  import type { FieldProps } from './index'

  let { form, name, label, control, description }: FieldProps = $props()
</script>

<Form.Field {form} {name}>
  <Form.Control let:attrs>
    {#if label}<Form.Label>{label}</Form.Label>{/if}
    {@render control(attrs)}
  </Form.Control>
  {#if description}
    <Form.Description let:descriptionAttrs>
      {@render description(descriptionAttrs)}
    </Form.Description>
  {/if}
  <Form.FieldErrors />
</Form.Field>
