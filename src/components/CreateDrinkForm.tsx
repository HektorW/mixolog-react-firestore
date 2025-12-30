// T037 CreateDrinkForm
import { createDrink } from '@/data/mutations'
import { drinksListOptions } from '@/data/queries'
import { CreateDrinkSchema } from '@/schemas/drink'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useFormStatus } from 'react-dom'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'

export function CreateDrinkForm() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  async function action(formData: FormData) {
    await createDrink(
      CreateDrinkSchema.parse({
        name: formData.get('name'),
        slug: formData.get('slug') || undefined,
      }),
    )

    await queryClient.invalidateQueries(drinksListOptions())

    navigate({ to: '/', viewTransition: true })
  }

  return (
    <ErrorBoundary FallbackComponent={CreateDrinkErrorFallback}>
      <form action={action}>
        <FormContent />
      </form>
    </ErrorBoundary>
  )
}

function FormContent() {
  const { pending } = useFormStatus()

  return (
    <fieldset
      disabled={pending}
      style={{ border: 'none', padding: 0, opacity: pending ? 0.5 : 1 }}
    >
      <legend>Add Drink</legend>

      <label htmlFor="drink-name">Name</label>
      <input id="drink-name" name="name" required maxLength={255} />

      <label htmlFor="drink-slug">Slug</label>
      <input
        id="drink-slug"
        name="slug"
        maxLength={255}
        pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
      />

      <button type="submit" disabled={pending}>
        {pending ? 'Adding…' : 'Add Drink'}
      </button>
    </fieldset>
  )
}

function CreateDrinkErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div role="alert">
      <p>Failed to create drink:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}
