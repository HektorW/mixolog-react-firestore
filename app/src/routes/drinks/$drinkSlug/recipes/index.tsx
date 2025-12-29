import { recipesForDrinkOptions } from '@/data/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/drinks/$drinkSlug/recipes/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { drinkSlug } = Route.useParams()
  const { data: recipes } = useSuspenseQuery(recipesForDrinkOptions(drinkSlug))

  return (
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe.slug}>{recipe.name}</li>
      ))}
    </ul>
  )
}
