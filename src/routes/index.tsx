import { DrinkList } from '@/components/DrinkList'
import { Page } from '@/components/page'
import { drinksListOptions } from '@/data/queries'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/')({
  loader: ({ context }) => {
    void context.queryClient.prefetchQuery(drinksListOptions())
  },

  component: IndexComponent,
  pendingComponent: () => <div>Laddar drinkar...</div>,
})

function IndexComponent() {
  return (
    <>
      <Page.Header
        title="Driiiinkar"
        createLink={{
          to: '/drinks/create',
          text: 'Ny drink',
        }}
      />

      <Page.Main>
        <Suspense fallback={<DrinkList.Skeleton />}>
          <DrinkList />
        </Suspense>
      </Page.Main>
    </>
  )
}
