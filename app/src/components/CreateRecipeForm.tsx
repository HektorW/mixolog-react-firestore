// T039 CreateRecipeForm component
// T039 CreateRecipeForm component (refactored to match CreateDrinkForm pattern)
import { createRecipe } from '@/data/mutations'
import { recipesForDrinkOptions } from '@/data/queries'
import type { Ingredient } from '@/schemas/ingredient'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'

interface Props {
  drinkSlug: string
}

export function CreateRecipeForm({ drinkSlug }: Props) {
  return (
    <ErrorBoundary FallbackComponent={CreateRecipeErrorFallback}>
      <CreateRecipeFormInner drinkSlug={drinkSlug} />
    </ErrorBoundary>
  )
}

function CreateRecipeFormInner({ drinkSlug }: Props) {
  const queryClient = useQueryClient()

  async function action(formData: FormData) {
    function parseFormEntry(key: string): string | undefined {
      const value = formData.get(key)
      if (value === null || value === undefined || value === '') {
        return undefined
      }

      return String(value).trim()
    }

    const name = parseFormEntry('name')
    if (!name) {
      throw new Error('Name is required')
    }

    const instructions = parseFormEntry('instructions')
    if (!instructions) {
      throw new Error('Instructions are required')
    }

    const recipeSlug = parseFormEntry('slug')
    const inspirationUrl = parseFormEntry('inspirationUrl')

    const ingredientNames = formData
      .getAll('ingredientName')
      .map(($) => String($).trim())

    const ingredientAmounts = formData
      .getAll('ingredientAmount')
      .map(($) => String($).trim())

    const ingredientUnits = formData
      .getAll('ingredientUnit')
      .map(($) => String($).trim())

    const ingredients: Ingredient[] = ingredientNames.map((name, index) => ({
      name,
      amount: ingredientAmounts[index] || '',
      unit: ingredientUnits[index] || undefined,
    }))

    const filtered = ingredients.filter(($) => $.name)

    await createRecipe({
      drinkSlug,

      name,
      slug: recipeSlug,
      inspirationUrl: inspirationUrl || undefined,
      instructions,
      ingredients: filtered,
    })

    await queryClient.invalidateQueries(recipesForDrinkOptions(drinkSlug))
  }

  return (
    <form action={action}>
      <FormContent />
    </form>
  )
}

function FormContent() {
  const { pending } = useFormStatus()
  const [ingredientIdList, setIngredientIdList] = useState<number[]>([0])

  function addRow() {
    setIngredientIdList((_ingredientIdList) => [
      ..._ingredientIdList,
      Date.now(),
    ])
  }

  function removeRow(id: number) {
    setIngredientIdList((_ingredientIdList) =>
      _ingredientIdList.filter(($) => $ !== id),
    )
  }

  return (
    <fieldset disabled={pending} style={{ opacity: pending ? 0.5 : 1 }}>
      <legend>Add Recipe</legend>

      <div>
        <label htmlFor="recipe-name">Name</label>
        <input
          id="recipe-name"
          name="name"
          required
          maxLength={255}
          autoFocus
        />
      </div>

      <div>
        <label htmlFor="recipe-slug">Slug</label>
        <input
          id="recipe-slug"
          name="slug"
          maxLength={255}
          pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
        />
      </div>

      <div>
        <label htmlFor="recipe-inspiration-url">Inspiration URL</label>
        <input
          id="recipe-inspiration-url"
          name="inspirationUrl"
          type="url"
          placeholder="https://example.com"
        />
      </div>

      <div>
        <label htmlFor="recipe-instructions">Instructions</label>
        <textarea
          id="recipe-instructions"
          name="instructions"
          required
          style={{
            fieldSizing: 'content',
            minHeight: '4lh',
            width: '60ch',
            resize: 'vertical',
          }}
        />
      </div>

      <fieldset>
        <legend>Ingredients</legend>

        {ingredientIdList.map((id, idx) => (
          <div key={id} style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              aria-label={`Ingredient name ${idx + 1}`}
              placeholder="Name"
              name="ingredientName"
              required={idx === 0}
              autoFocus
            />
            <input
              aria-label={`Ingredient amount ${idx + 1}`}
              placeholder="Amount"
              name="ingredientAmount"
              required={idx === 0}
            />
            <input
              aria-label={`Ingredient unit ${idx + 1}`}
              placeholder="Unit"
              name="ingredientUnit"
            />
            {ingredientIdList.length > 1 && (
              <button
                type="button"
                onClick={() => removeRow(id)}
                aria-label={`Remove ingredient ${idx + 1}`}
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addRow}>
          Add Ingredient
        </button>
      </fieldset>

      <button type="submit" disabled={pending}>
        {pending ? 'Creating…' : 'Create Recipe'}
      </button>
    </fieldset>
  )
}

function CreateRecipeErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div role="alert">
      <p>Failed to create recipe:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}
