import { CreateRecipeForm } from '@/components/create-recipe-form'
import { Page } from '@/components/page'
import { drinkDetailOptions } from '@/data/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/drinks/$drinkSlug/recipes/create')({
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
          to: '/drinks/$drinkSlug/recipes',
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
