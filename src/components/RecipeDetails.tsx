import { recipeDetailOptions } from '@/data/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Glimmer } from './common/Glimmer'

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
      <Glimmer as="h2" />

      <h3>Ingredients</h3>
      <ul>
        {Array.from({ length: 3 }).map((_, index) => (
          <Glimmer key={index} as="li" />
        ))}
      </ul>

      <h3>Instructions</h3>
      <Glimmer
        css={{
          height: '4lh',
          width: '60ch',
        }}
      />

      <Glimmer />
    </article>
  )
}
