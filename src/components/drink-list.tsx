// T036 DrinkList component
import { drinksListOptions } from '@/data/queries'
import { css } from '@styled/css'
import { stack } from '@styled/patterns'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { useDeferredValue, ViewTransition } from 'react'
import { Glimmer } from './common/Glimmer'

export function DrinkList() {
  const { data: drinksRaw } = useSuspenseQuery(drinksListOptions())
  const drinks = useDeferredValue(drinksRaw) // Enables view transitions

  if (drinks.length === 0) {
    return <p className={css({ textStyle: '8xl' })}>Finns inga drinkar :(.</p>
  }

  return (
    <ul className={listStyles}>
      {drinks.map((drink) => (
        <ViewTransition key={drink.slug}>
          <li>
            <Link
              className={linkStyles}
              to={'/drinks/$drinkSlug'}
              params={{ drinkSlug: drink.slug }}
            >
              {drink.name}
            </Link>
          </li>
        </ViewTransition>
      ))}
    </ul>
  )
}

DrinkList.Skeleton = function DrinkListSkeleton() {
  return (
    <ul className={listStyles}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Glimmer as="li" className={linkStyles} key={index} />
      ))}
    </ul>
  )
}

const listStyles = stack({
  containerType: 'inline-size',
  gap: '6',
})

const linkStyles = css({
  textStyle: '5xl',
  display: 'inline-block',

  '@/xl': {
    textStyle: '7xl',
  },

  '&:focus, &:focus-visible': {
    outline: 'none',
  },

  '&:hover, &:focus-visible': {
    textDecoration: 'underline',
  },
})
