import { recipeDetailOptions } from '@/data/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense, ViewTransition } from 'react'
import { Glimmer } from './common/Glimmer'

interface RecipeNameProps {
  drinkSlug: string
  recipeSlug: string
}

export function RecipeName({ drinkSlug, recipeSlug }: RecipeNameProps) {
  return (
    <Suspense fallback={<Glimmer as="span" />}>
      <ViewTransition>
        <RecipeNameInner drinkSlug={drinkSlug} recipeSlug={recipeSlug} />
      </ViewTransition>
    </Suspense>
  )
}

function RecipeNameInner({ drinkSlug, recipeSlug }: RecipeNameProps) {
  const { data: recipe } = useSuspenseQuery(
    recipeDetailOptions(drinkSlug, recipeSlug),
  )

  return <span>{recipe.name}</span>
}
