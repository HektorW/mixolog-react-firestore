import { DrinkList } from '@/components/DrinkList'
import { drinksListOptions } from '@/data/queries'
import { CreateLink } from '@/design/components/create-link'
import { PageTitle } from '@/design/components/page-title'
import { createFileRoute } from '@tanstack/react-router'
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
      <PageTitle children="Drinks" />

      <CreateLink to="/drinks/create">Add drink</CreateLink>

      <Suspense fallback={<DrinkList.Skeleton />}>
        <DrinkList />
      </Suspense>
    </main>
  )
}
