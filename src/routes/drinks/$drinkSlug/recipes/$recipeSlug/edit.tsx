import { loaderAuthGuard } from '@/auth/auth-guard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/drinks/$drinkSlug/recipes/$recipeSlug/edit',
)({
  beforeLoad: async ({ context, params }) => {
    loaderAuthGuard({
      auth: context.auth,
      redirect: {
        to: `/drinks/$drinkSlug`,
        params: { drinkSlug: params.drinkSlug },
        search: { recipeSlug: params.recipeSlug },
      },
    })
  },

  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/drinks/$drinkSlug/recipes/$recipeSlug/edit"!</div>
}
