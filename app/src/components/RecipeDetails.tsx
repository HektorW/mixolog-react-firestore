import { recipeDetailOptions } from '@/data/queries'
import { useSuspenseQuery } from '@tanstack/react-query'

interface RecipeDetailsProps {
  drinkSlug: string
  recipeSlug: string
}

export function RecipeDetails({ drinkSlug, recipeSlug }: RecipeDetailsProps) {
  const { data: recipe } = useSuspenseQuery(
    recipeDetailOptions(drinkSlug, recipeSlug),
  )

  return (
    <article>
      <h2>{recipe.name}</h2>

      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.amount} {ingredient.unit} {ingredient.name}
          </li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <textarea
        readOnly
        value={recipe.instructions}
        style={{
          fieldSizing: 'content',
          minHeight: '4lh',
          width: '60ch',
          resize: 'none',
        }}
      />

      {recipe.inspirationUrl && (
        <p>
          Inspiration:{' '}
          <a href={recipe.inspirationUrl} target="_blank" rel="noreferrer">
            {recipe.inspirationUrl}
          </a>
        </p>
      )}
    </article>
  )
}

RecipeDetails.Skeleton = function RecipeDetailsSkeleton() {
  return (
    <article>
      <div
        style={{
          background: '#eee',
          height: 30,
          width: '50%',
          margin: '16px 0',
        }}
      />

      <h3>Ingredients</h3>
      <ul>
        {Array.from({ length: 3 }).map((_, index) => (
          <li
            key={index}
            style={{ background: '#eee', height: 20, margin: '8px 0' }}
          />
        ))}
      </ul>

      <h3>Instructions</h3>
      <div
        style={{
          background: '#eee',
          height: 100,
          width: '100%',
          margin: '16px 0',
        }}
      />

      <div
        style={{
          background: '#eee',
          height: 20,
          width: '80%',
          margin: '16px 0',
        }}
      />
    </article>
  )
}
