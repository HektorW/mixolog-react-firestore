import { createRecipe } from '@/data/mutations'
import { recipesForDrinkOptions } from '@/data/queries'
import { formLayout } from '@/design/recipes/form'
import { CreateRecipeSchema, type CreateRecipe } from '@/schemas/recipe'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useAppForm } from './app-form'
import { IngredientsFieldGroup } from './field-groups/ingredients-field-group'
import { OthersFieldGroup } from './field-groups/others-field-group'
import { RecipeDetailsFieldGroup } from './field-groups/recipe-details-field-group'
import { Fieldset } from './layout-components/fieldset-layout'

interface RecipeFormCreateProps {
  drinkSlug: string
}

export function RecipeFormCreate(props: RecipeFormCreateProps) {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const defaultValues: CreateRecipe = {
    drinkSlug: props.drinkSlug,
    name: '',
    slug: '',
    instructions: '',
    notes: '',
    inspirationUrl: '',
    ingredients: [{ name: '', amount: '', unit: '' }],
  }

  const form = useAppForm({
    defaultValues,

    validators: { onSubmit: CreateRecipeSchema },

    onSubmit: async ({ value }) => {
      await createRecipe(value)
      await queryClient.invalidateQueries(
        recipesForDrinkOptions(props.drinkSlug),
      )

      navigate({
        to: '/drinks/$drinkSlug',
        params: { drinkSlug: props.drinkSlug },
        search: { recipeSlug: value.slug },
      })
    },
  })

  function formAction() {
    form.handleSubmit()
  }

  return (
    <form action={formAction} className={formLayout()}>
      <Fieldset legend="Allmän information">
        <form.AppField
          name="name"
          children={(field) => (
            <field.TextField label="Namn" placeholder='T ex "Favoriten"' />
          )}
        />

        <form.AppField
          name="slug"
          children={(field) => <field.TextField label="Slug" />}
        />
      </Fieldset>

      <IngredientsFieldGroup
        form={form}
        fields={{
          ingredients: 'ingredients',
        }}
      />

      <RecipeDetailsFieldGroup
        form={form}
        fields={{
          instructions: 'instructions',
          notes: 'notes',
        }}
      />

      <OthersFieldGroup
        form={form}
        fields={{
          inspirationUrl: 'inspirationUrl',
        }}
      />

      <form.AppForm>
        <form.Submit label="Skapa recept" />
      </form.AppForm>
    </form>
  )
}
