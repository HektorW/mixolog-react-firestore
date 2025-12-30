import { RecipeList } from '@/components/RecipeList'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/drinks/$drinkSlug/recipes/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { drinkSlug } = Route.useParams()

  return (
    <>
      <Link to="..">Back to drink</Link>

      <Suspense fallback={<RecipeList.Skeleton />}>
        <RecipeList drinkSlug={drinkSlug} />
      </Suspense>
    </>
  )
}
