import { DrinkName } from '@/components/drink-name'
import { Page } from '@/components/page'
import { buttonLink } from '@/design/recipes/buttons'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/drinks/$drinkSlug/')({
  loader: ({ params }) => {
    throw redirect({
      to: '/drinks/$drinkSlug/recipes',
      params: { drinkSlug: params.drinkSlug },
    })
  },

  component: DrinkDetailRoute,
})

function DrinkDetailRoute() {
  const { drinkSlug } = Route.useParams()

  return (
    <>
      <Page.Header
        title={<DrinkName slug={drinkSlug} />}
        backLink={{ to: '/', text: 'Tillbaka till alla drinkar' }}
      />

      <Page.Main>
        <Link
          to="/drinks/$drinkSlug/recipes/create"
          params={{ drinkSlug }}
          className={buttonLink().link}
        >
          Inga recept ännu. Lägg till ett.
        </Link>
      </Page.Main>
    </>
  )
}
