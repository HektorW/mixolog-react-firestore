import { CreateRecipeForm } from '@/components/CreateRecipeForm'
import { drinkDetailOptions } from '@/data/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/drinks/$drinkSlug/recipes/create')({
  component: RouteComponent,
})

function RouteComponent() {
  const { drinkSlug } = Route.useParams()
  const { data: drink } = useSuspenseQuery(drinkDetailOptions(drinkSlug))

  return (
    <>
      <Link to="..">Back to recipes</Link>
      <CreateRecipeForm drinkSlug={drink.slug} />
    </>
  )
}
