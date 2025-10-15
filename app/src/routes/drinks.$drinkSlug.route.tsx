// T035 drink detail route
import { CreateRecipeForm } from '@/components/CreateRecipeForm'
import { drinkDetailOptions, recipesForDrinkOptions } from '@/data/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/drinks/$drinkSlug')({
  loader: ({ context, params }) => {
    void context.queryClient.prefetchQuery(drinkDetailOptions(params.drinkSlug))
    void context.queryClient.prefetchQuery(
      recipesForDrinkOptions(params.drinkSlug),
    )
  },

  component: DrinkDetailRoute,
})

function DrinkDetailRoute() {
  const { drinkSlug } = Route.useParams()
  const drinkQuery = useSuspenseQuery(drinkDetailOptions(drinkSlug))
  const recipesQuery = useSuspenseQuery(recipesForDrinkOptions(drinkSlug))
  const drink = drinkQuery.data
  const recipes = recipesQuery.data
  return (
    <article>
      <h1>{drink.name}</h1>
      <CreateRecipeForm drinkSlug={drink.slug} />
      <section>
        <h2>Recipes</h2>
        {recipes.length === 0 ? (
          <p>No recipes yet.</p>
        ) : (
          <ol>
            {recipes.map((r) => (
              <li key={r.slug}>{r.name}</li>
            ))}
          </ol>
        )}
      </section>
    </article>
  )
}
