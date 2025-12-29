import { Glimmer } from '@/components/common/Glimmer'
import { drinkDetailOptions, recipesForDrinkOptions } from '@/data/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/drinks/$drinkSlug')({
  loader: ({ context, params }) => {
    void context.queryClient.prefetchQuery(drinkDetailOptions(params.drinkSlug))
    void context.queryClient.prefetchQuery(
      recipesForDrinkOptions(params.drinkSlug),
    )
  },

  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Suspense fallback={<Glimmer as="h1" />}>
        <DrinkName />
      </Suspense>

      <Outlet />
    </>
  )
}

function DrinkName() {
  const { drinkSlug } = Route.useParams()
  const { data: drink } = useSuspenseQuery(drinkDetailOptions(drinkSlug))

  return <h1>{drink.name}</h1>
}
