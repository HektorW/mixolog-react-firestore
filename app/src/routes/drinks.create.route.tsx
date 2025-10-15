import { CreateDrinkForm } from '@/components/CreateDrinkForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/drinks/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <h1>New drink</h1>
      <CreateDrinkForm />
    </>
  )
}
