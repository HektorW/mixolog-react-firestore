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
              to={'/drinks/$drinkSlug'}
              params={{ drinkSlug: drink.slug }}
              className={linkStyles}
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
        <Glimmer key={index} as="li" className={linkStyles} />
      ))}
    </ul>
  )
}

const listStyles = stack({
  containerType: 'inline-size',
  gap: '6',
})

const linkStyles = css({
  display: 'inline-block',
  textStyle: '7xl',

  '@/xl': {
    textStyle: '9xl',
  },

  '&:focus, &:focus-visible': {
    outline: 'none',
  },

  '&:hover, &:focus-visible': {
    textDecoration: 'underline',
  },
})
