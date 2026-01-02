import { loaderAuthGuard } from '@/auth/auth-guard'
import { CreateDrinkForm } from '@/components/create-drink-form'
import { Page } from '@/components/page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/drinks/create')({
  beforeLoad: async ({ context }) => {
    loaderAuthGuard({ auth: context.auth })
  },

  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Page.Header
        title="Ny drink"
        backLink={{
          text: 'Tillbaka till drinkar',
          to: '/',
        }}
      />

      <Page.Main>
        <CreateDrinkForm />
      </Page.Main>
    </>
  )
}
