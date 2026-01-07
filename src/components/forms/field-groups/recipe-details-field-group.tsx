import type { Recipe } from '@/schemas/recipe'
import { withFieldGroup } from '../app-form'
import { Fieldset } from '../layout-components/fieldset-layout'

const defaultValues: Pick<Recipe, 'instructions' | 'notes'> = {
  instructions: '',
  notes: '',
}

export const RecipeDetailsFieldGroup = withFieldGroup({
  defaultValues,

  render: function Render({ group }) {
    return (
      <Fieldset legend="Receptdetaljer">
        <group.AppField
          name="instructions"
          children={(field) => <field.TextareaField label="Instruktioner" />}
        />

        <group.AppField
          name="notes"
          children={(field) => <field.TextareaField label="Anteckningar" />}
        />
      </Fieldset>
    )
  },
})
