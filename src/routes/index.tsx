import { DrinkList } from '@/components/drink-list'
import { Page } from '@/components/page'
import { drinksListOptions } from '@/data/queries'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense, ViewTransition } from 'react'

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
        <ViewTransition>
          <Suspense fallback={<DrinkList.Skeleton />}>
            <DrinkList />
          </Suspense>
        </ViewTransition>
      </Page.Main>
    </>
  )
}
