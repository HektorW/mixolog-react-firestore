// T034 index route listing drinks
import { CreateDrinkForm } from '@/components/CreateDrinkForm'
import { drinksListOptions } from '@/data/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  loader: ({ context }) => {
    void context.queryClient.prefetchQuery(drinksListOptions())
  },

  component: IndexComponent,
  pendingComponent: () => <div>Loading drinks route...</div>,
})

function IndexComponent() {
  const { data } = useSuspenseQuery(drinksListOptions())
  return (
    <main>
      <h1>Drinks</h1>
      <CreateDrinkForm />
      {data.length === 0 ? (
        <p>No drinks yet.</p>
      ) : (
        <ul>
          {data.map((d) => (
            <li key={d.slug}>
              <Link to={'/drinks/$drinkSlug'} params={{ drinkSlug: d.slug }}>
                {d.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
