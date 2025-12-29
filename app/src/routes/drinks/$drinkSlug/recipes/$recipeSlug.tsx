import { RecipeDetails } from '@/components/RecipeDetails'
import { RecipeList } from '@/components/RecipeList'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/drinks/$drinkSlug/recipes/$recipeSlug')({
  component: RouteComponent,
})

function RouteComponent() {
  const { drinkSlug, recipeSlug } = Route.useParams()

  return (
    <>
      <Suspense fallback={<RecipeDetails.Skeleton />}>
        <RecipeDetails drinkSlug={drinkSlug} recipeSlug={recipeSlug} />

        <h2>Other Recipes</h2>
        <RecipeList drinkSlug={drinkSlug} />
      </Suspense>
    </>
  )
}
