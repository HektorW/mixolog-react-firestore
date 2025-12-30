import { BackLink } from '@/design/components/back-link'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/drinks/$drinkSlug/')({
  component: DrinkDetailRoute,
})

function DrinkDetailRoute() {
  const { drinkSlug } = Route.useParams()

  return (
    <>
      <BackLink to="/">Back to all drinks</BackLink>

      <Link to="/drinks/$drinkSlug/recipes" params={{ drinkSlug }}>
        View Recipes
      </Link>
    </>
  )
}
