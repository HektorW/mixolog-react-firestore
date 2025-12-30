import { drinkDetailOptions, recipesForDrinkOptions } from '@/data/queries'
import { createFileRoute, Outlet } from '@tanstack/react-router'

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
  return <Outlet />
}
