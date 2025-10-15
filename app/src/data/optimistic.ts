// T040 optimistic update helpers (simplified)
import type { Drink } from '@/schemas/drink'
import type { Recipe } from '@/schemas/recipe'
import type { QueryClient } from '@tanstack/react-query'

export function optimisticallyAddDrink(client: QueryClient, drink: Drink) {
  client.setQueryData<Drink[]>(['drinks'], (old) => {
    const list = old ? [...old] : []
    if (!list.find((d) => d.slug === drink.slug)) list.push(drink)
    // Keep alphabetical order (case-insensitive)
    list.sort((a, b) =>
      a.name.localeCompare(b.name, undefined, {
        sensitivity: 'accent',
        caseFirst: 'upper',
      }),
    )
    return list
  })
}

export function optimisticallyAddRecipe(client: QueryClient, recipe: Recipe) {
  client.setQueryData<Recipe[]>(['recipes', recipe.drinkSlug], (old) => {
    const list = old ? [recipe, ...old] : [recipe]
    return list
  })
}
