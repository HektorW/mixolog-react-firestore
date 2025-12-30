// T039 CreateRecipeForm component
// T039 CreateRecipeForm component (refactored to match CreateDrinkForm pattern)
import { createRecipe } from '@/data/mutations'
import { recipesForDrinkOptions } from '@/data/queries'
import { IconCross } from '@/design/icons/cross'
import { IconPlus } from '@/design/icons/plus'
import { button } from '@/design/recipes/buttons'
import { formLayout, input, submit } from '@/design/recipes/form'
import type { Ingredient } from '@/schemas/ingredient'
import { css, cx } from '@styled/css'
import { hstack } from '@styled/patterns'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
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
  const navigate = useNavigate()

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

    const recipe = await createRecipe({
      drinkSlug,

      name,
      slug: recipeSlug,
      inspirationUrl: inspirationUrl || undefined,
      instructions,
      ingredients: filtered,
    })

    await queryClient.invalidateQueries(recipesForDrinkOptions(drinkSlug))

    navigate({
      to: '/drinks/$drinkSlug/recipes/$recipeSlug',
      params: { drinkSlug, recipeSlug: recipe.slug },
    })
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
    <div className={formLayout()}>
      <div>
        <label htmlFor="recipe-name">Namn</label>
        <input
          id="recipe-name"
          name="name"
          required
          maxLength={255}
          autoFocus
          className={input()}
        />
      </div>

      <div>
        <label htmlFor="recipe-slug">Slug</label>
        <input
          id="recipe-slug"
          name="slug"
          maxLength={255}
          pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
          className={input()}
        />
      </div>

      <div>
        <label htmlFor="recipe-inspiration-url">Inspirations URL</label>
        <input
          id="recipe-inspiration-url"
          name="inspirationUrl"
          type="url"
          placeholder="https://example.com"
          className={input()}
        />
      </div>

      <div>
        <label htmlFor="recipe-instructions">Instruktioner</label>
        <textarea
          id="recipe-instructions"
          name="instructions"
          required
          className={cx(
            input(),
            css({
              minHeight: '6lh',
              width: '60ch',
              resize: 'vertical',
              fieldSizing: 'content',
            }),
          )}
        />
      </div>

      <fieldset>
        <legend>Ingredienser</legend>

        {ingredientIdList.map((id, idx) => (
          <div key={id} className={hstack({ gap: '4' })}>
            <input
              aria-label={`Ingredient name ${idx + 1}`}
              placeholder="Namn"
              name="ingredientName"
              required={idx === 0}
              autoFocus
              className={input()}
            />
            <input
              aria-label={`Ingredient amount ${idx + 1}`}
              placeholder="Mängd"
              name="ingredientAmount"
              required={idx === 0}
              className={input()}
            />
            <input
              aria-label={`Ingredient unit ${idx + 1}`}
              placeholder="Enhet"
              name="ingredientUnit"
              className={input()}
            />
            {ingredientIdList.length > 1 && (
              <button
                type="button"
                aria-label={`Remove ingredient ${idx + 1}`}
                className={button({ size: 'sm' }).button}
                onClick={() => removeRow(id)}
              >
                <IconCross className={button({ size: 'sm' }).icon} />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className={button({ size: 'sm' }).button}
          onClick={addRow}
        >
          <span className={button({ size: 'sm' }).text}>
            Lägg till ingrediens
          </span>
          <IconPlus className={button({ size: 'sm' }).icon} />
        </button>
      </fieldset>

      <button type="submit" disabled={pending} className={submit({ pending })}>
        {pending ? 'Skapar…' : 'Spara recept'}
      </button>
    </div>
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
      <button className={button().button} onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  )
}
