import { CreateDrinkForm } from '@/components/CreateDrinkForm'
import { BackLink } from '@/design/components/back-link'
import { PageTitle } from '@/design/components/page-title'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/drinks/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <PageTitle children="New drink" />
      <BackLink to="/">Back to drinks</BackLink>
      <CreateDrinkForm />
    </>
  )
}
