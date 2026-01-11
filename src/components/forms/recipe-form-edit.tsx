import { updateRecipe } from '@/data/mutations'
import { recipeDetailOptions } from '@/data/queries'
import { formLayout } from '@/design/recipes/form'
import { EditRecipeSchema, type EditRecipe } from '@/schemas/recipe'
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Glimmer } from '../common/Glimmer'
import { useAppForm } from './app-form'
import { IngredientsFieldGroup } from './field-groups/ingredients-field-group'
import { OthersFieldGroup } from './field-groups/others-field-group'
import { RecipeDetailsFieldGroup } from './field-groups/recipe-details-field-group'
import { Fieldset } from './layout-components/fieldset-layout'

interface RecipeFormEditProps {
  drinkSlug: string
  recipeSlug: string
}

export function RecipeFormEdit(props: RecipeFormEditProps) {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { data: recipe } = useSuspenseQuery(
    recipeDetailOptions(props.drinkSlug, props.recipeSlug),
  )

  const defaultValues: EditRecipe = {
    drinkSlug: recipe.drinkSlug,
    name: recipe.name,
    slug: recipe.slug,
    instructions: recipe.instructions,
    notes: recipe.notes,
    inspirationUrl: recipe.inspirationUrl,
    ingredients: recipe.ingredients,
  }

  const form = useAppForm({
    defaultValues,

    validators: { onChange: EditRecipeSchema },

    onSubmit: async ({ value }) => {
      await updateRecipe(value)
      await queryClient.invalidateQueries(
        recipeDetailOptions(props.drinkSlug, props.recipeSlug),
      )

      navigate({
        to: '/drinks/$drinkSlug',
        params: { drinkSlug: props.drinkSlug },
        search: { recipeSlug: props.recipeSlug },
      })
    },
  })

  function formAction() {
    form.handleSubmit()
  }

  return (
    <form action={formAction} className={formLayout()}>
      <form.Field
        name="drinkSlug"
        children={(field) => (
          <input type="hidden" name={field.name} value={field.state.value} />
        )}
      />

      <Fieldset legend="Allmän information">
        <form.AppField
          name="name"
          children={(field) => <field.TextField label="Namn" />}
        />

        <form.AppField
          name="slug"
          children={(field) => <field.TextField label="Slug" readOnly />}
        />
      </Fieldset>

      <IngredientsFieldGroup
        form={form}
        fields={{ ingredients: 'ingredients' }}
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
        fields={{ inspirationUrl: 'inspirationUrl' }}
      />

      <form.AppForm>
        <form.Submit label="Spara" />
      </form.AppForm>
    </form>
  )
}

RecipeFormEdit.Skeleton = function RecipeFormEditSkeleton() {
  return <Glimmer css={{ height: 'md' }} />
}
