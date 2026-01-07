import type { Recipe } from '@/schemas/recipe'
import { withFieldGroup } from '../app-form'
import { Fieldset } from '../layout-components/fieldset-layout'

const defaultValues: Pick<Recipe, 'inspirationUrl'> = {
  inspirationUrl: '',
}

export const OthersFieldGroup = withFieldGroup({
  defaultValues,

  render: function Render({ group }) {
    return (
      <Fieldset legend="Annat">
        <group.AppField
          name="inspirationUrl"
          children={(field) => (
            <field.TextField label="Inspiration URL" type="url" />
          )}
        />
      </Fieldset>
    )
  },
})
