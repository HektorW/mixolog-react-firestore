// T037 CreateDrinkForm
import { createDrink } from '@/data/mutations'
import { drinksListOptions } from '@/data/queries'
import { formLayout, input, submit } from '@/design/recipes/form'
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

    navigate({ to: '/' })
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
    <div className={formLayout()}>
      <div>
        <label htmlFor="drink-name">Namn</label>
        <input
          id="drink-name"
          name="name"
          required
          maxLength={255}
          className={input()}
        />
      </div>

      <div>
        <label htmlFor="drink-slug">Slug</label>
        <input
          id="drink-slug"
          name="slug"
          maxLength={255}
          pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
          className={input()}
        />
      </div>

      <button type="submit" disabled={pending} className={submit({ pending })}>
        {pending ? 'Lägger till…' : 'Lägg till drink'}
      </button>
    </div>
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
