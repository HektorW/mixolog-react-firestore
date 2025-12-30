import { DrinkName } from '@/components/drink-name'
import { Page } from '@/components/page'
import { RecipeList } from '@/components/RecipeList'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/drinks/$drinkSlug/recipes/')({
  // loader: async ({ context, params }) => {
  //   const recipes = await context.queryClient.fetchQuery(
  //     recipesForDrinkOptions(params.drinkSlug),
  //   )

  //   const firstRecipe = recipes.at(0)
  //   if (firstRecipe) {
  //     throw redirect({
  //       to: '/drinks/$drinkSlug/recipes/$recipeSlug',
  //       params: {
  //         drinkSlug: params.drinkSlug,
  //         recipeSlug: firstRecipe.slug,
  //       },
  //     })
  //   }
  // },

  component: RouteComponent,
})

function RouteComponent() {
  const { drinkSlug } = Route.useParams()

  return (
    <>
      <Page.Header
        title={
          <>
            <span>Recept för </span>
            <DrinkName slug={drinkSlug} />
          </>
        }
        backLink={{ to: `/`, text: 'Tillbaka till alla drinkar' }}
      />

      <Page.Main>
        <Suspense fallback={<RecipeList.Skeleton />}>
          <RecipeList drinkSlug={drinkSlug} />
        </Suspense>
      </Page.Main>
    </>
  )
}
