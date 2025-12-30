import { drinkDetailOptions } from '@/data/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense, ViewTransition } from 'react'
import { Glimmer } from './common/Glimmer'

interface DrinkNameProps {
  slug: string
}

export function DrinkName({ slug }: DrinkNameProps) {
  return (
    <Suspense fallback={<Glimmer as="span" />}>
      <ViewTransition>
        <DrinkNameInner slug={slug} />
      </ViewTransition>
    </Suspense>
  )
}

function DrinkNameInner({ slug }: DrinkNameProps) {
  const { data: drink } = useSuspenseQuery(drinkDetailOptions(slug))

  return <span>{drink.name}</span>
}
