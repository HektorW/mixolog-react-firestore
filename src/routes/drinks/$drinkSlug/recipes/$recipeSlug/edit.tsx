import { loaderAuthGuard } from '@/auth/auth-guard'
import { DrinkName } from '@/components/drink-name'
import { RecipeFormEdit } from '@/components/forms/recipe-form-edit'
import { Page } from '@/components/page'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute(
  '/drinks/$drinkSlug/recipes/$recipeSlug/edit',
)({
  beforeLoad: async ({ context, params }) => {
    loaderAuthGuard({
      auth: context.auth,
      redirect: {
        to: `/drinks/$drinkSlug`,
        params: { drinkSlug: params.drinkSlug },
        search: { recipeSlug: params.recipeSlug },
      },
    })
  },

  component: RouteComponent,
})

function RouteComponent() {
  const { drinkSlug, recipeSlug } = Route.useParams()

  return (
    <>
      <Page.Header
        title={
          <>
            <span>Redigera: </span>
            <DrinkName slug={drinkSlug} />
          </>
        }
        backLink={{
          text: 'Tillbaka till receptet',
          to: '/drinks/$drinkSlug',
          params: { drinkSlug },
          search: { recipeSlug },
        }}
      />

      <Page.Main>
        <Suspense fallback={<RecipeFormEdit.Skeleton />}>
          <RecipeFormEdit drinkSlug={drinkSlug} recipeSlug={recipeSlug} />
        </Suspense>
      </Page.Main>
    </>
  )
}
