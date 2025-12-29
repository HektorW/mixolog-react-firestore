// T034 index route listing drinks
import { DrinkList } from '@/components/DrinkList'
import { drinksListOptions } from '@/data/queries'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/')({
  loader: ({ context }) => {
    void context.queryClient.prefetchQuery(drinksListOptions())
  },

  component: IndexComponent,
  pendingComponent: () => <div>Loading drinks route...</div>,
})

function IndexComponent() {
  return (
    <main>
      <h1>Drinks</h1>

      <Link to="/drinks/create">Add drink</Link>

      <Suspense fallback={<DrinkList.Skeleton />}>
        <DrinkList />
      </Suspense>
    </main>
  )
}
