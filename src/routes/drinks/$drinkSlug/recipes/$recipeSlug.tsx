import { RecipeDetails } from '@/components/RecipeDetails'
import { BackLink } from '@/design/components/back-link'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense, ViewTransition } from 'react'

export const Route = createFileRoute('/drinks/$drinkSlug/recipes/$recipeSlug')({
  component: RouteComponent,
})

function RouteComponent() {
  const { drinkSlug, recipeSlug } = Route.useParams()

  return (
    <>
      <BackLink to="..">Tillbaka till alla recept</BackLink>

      <ViewTransition>
        <Suspense fallback={<RecipeDetails.Skeleton />}>
          <RecipeDetails drinkSlug={drinkSlug} recipeSlug={recipeSlug} />
        </Suspense>
      </ViewTransition>
    </>
  )
}
