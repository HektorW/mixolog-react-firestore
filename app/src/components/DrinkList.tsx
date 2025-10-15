// T036 DrinkList component
import { drinksListOptions } from '@/data/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'

export function DrinkList() {
  const { data: drinks } = useSuspenseQuery(drinksListOptions())

  if (drinks.length === 0) return <p>No drinks yet.</p>
  return (
    <ul>
      {drinks.map((d) => (
        <li key={d.slug}>
          <Link to={'/drinks/$drinkSlug'} params={{ drinkSlug: d.slug }}>
            {d.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

DrinkList.Skeleton = function DrinkListSkeleton() {
  return (
    <ul>
      {Array.from({ length: 3 }).map((_, i) => (
        <li
          key={i}
          style={{ background: '#eee', height: 20, margin: '8px 0' }}
        />
      ))}
    </ul>
  )
}
