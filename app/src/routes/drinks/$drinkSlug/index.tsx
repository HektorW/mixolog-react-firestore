import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/drinks/$drinkSlug/')({
  component: DrinkDetailRoute,
})

function DrinkDetailRoute() {
  const { drinkSlug } = Route.useParams()

  return (
    <>
      <Link to="/">Back to all drinks</Link>

      <Link to="/drinks/$drinkSlug/recipes" params={{ drinkSlug }}>
        View Recipes
      </Link>
    </>
  )
}
