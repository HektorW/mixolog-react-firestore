import { RecipeList } from '@/components/RecipeList'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/drinks/$drinkSlug/')({
  component: DrinkDetailRoute,
})

function DrinkDetailRoute() {
  const { drinkSlug } = Route.useParams()

  return (
    <section>
      <Suspense fallback={<RecipeList.Skeleton />}>
        <RecipeList drinkSlug={drinkSlug} />
      </Suspense>
    </section>
  )
}
