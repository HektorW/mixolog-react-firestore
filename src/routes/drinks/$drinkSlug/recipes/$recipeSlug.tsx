import { RecipeDetails } from '@/components/RecipeDetails'
import { RecipeList } from '@/components/RecipeList'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Suspense, ViewTransition } from 'react'

export const Route = createFileRoute('/drinks/$drinkSlug/recipes/$recipeSlug')({
  component: RouteComponent,
})

function RouteComponent() {
  const { drinkSlug, recipeSlug } = Route.useParams()

  return (
    <>
      <Link to="..">Back to recipes</Link>

      <ViewTransition>
        <Suspense fallback={<RecipeDetails.Skeleton />}>
          <RecipeDetails drinkSlug={drinkSlug} recipeSlug={recipeSlug} />

          <h2>Other Recipes</h2>
          <RecipeList drinkSlug={drinkSlug} />
        </Suspense>
      </ViewTransition>
    </>
  )
}
