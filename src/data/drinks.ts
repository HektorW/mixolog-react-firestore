import { type Drink } from '@/schemas/drink'

export function toSortedDrinkList(drinkList: Drink[]) {
  return drinkList.toSorted((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'accent' }),
  )
}
