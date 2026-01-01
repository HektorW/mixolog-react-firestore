import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/drinks/$drinkSlug/recipes/$recipeSlug/edit',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/drinks/$drinkSlug/recipes/$recipeSlug/edit"!</div>
}
