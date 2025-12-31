import { DrinkName } from '@/components/drink-name'
import { Page } from '@/components/page'
import { RecipeDetails } from '@/components/recipe-details'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense, ViewTransition } from 'react'

export const Route = createFileRoute('/drinks/$drinkSlug/recipes/$recipeSlug')({
  component: RouteComponent,
})

function RouteComponent() {
  const { drinkSlug, recipeSlug } = Route.useParams()

  return (
    <>
      <Page.Header
        title={
          <>
            <DrinkName slug={drinkSlug} />
          </>
        }
        backLink={{
          to: '..',
          text: 'Tillbaka till alla recept',
        }}
      />

      <Page.Main>
        <ViewTransition>
          <Suspense fallback={<RecipeDetails.Skeleton />}>
            <RecipeDetails drinkSlug={drinkSlug} recipeSlug={recipeSlug} />
          </Suspense>
        </ViewTransition>
      </Page.Main>
    </>
  )
}
