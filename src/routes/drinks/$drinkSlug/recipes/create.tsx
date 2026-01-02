import { loaderAuthGuard } from '@/auth/auth-guard'
import { CreateRecipeForm } from '@/components/create-recipe-form'
import { Page } from '@/components/page'
import { drinkDetailOptions } from '@/data/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/drinks/$drinkSlug/recipes/create')({
  beforeLoad: async ({ context, params }) => {
    loaderAuthGuard({
      auth: context.auth,
      redirect: {
        to: `/drinks/$drinkSlug`,
        params: { drinkSlug: params.drinkSlug },
      },
    })
  },

  component: RouteComponent,
})

function RouteComponent() {
  const { drinkSlug } = Route.useParams()
  const { data: drink } = useSuspenseQuery(drinkDetailOptions(drinkSlug))

  return (
    <>
      <Page.Header
        title={`Nytt recept för ${drink.name}`}
        backLink={{
          to: '/drinks/$drinkSlug',
          params: { drinkSlug },
          text: 'Tillbaka till recept',
        }}
      />

      <Page.Main>
        <CreateRecipeForm drinkSlug={drink.slug} />
      </Page.Main>
    </>
  )
}
