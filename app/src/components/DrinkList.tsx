// T036 DrinkList component
import { Link } from '@tanstack/react-router'
import type { Drink } from '@/schemas/drink'

interface Props { drinks: Drink[] }

export function DrinkList({ drinks }: Props) {
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
