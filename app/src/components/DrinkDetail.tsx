// T038 DrinkDetail component
import type { Drink } from '@/schemas/drink'
import type { Recipe } from '@/schemas/recipe'

interface Props { drink: Drink; recipes: Recipe[] }

export function DrinkDetail({ drink, recipes }: Props) {
  return (
    <article>
      <h1>{drink.name}</h1>
      <section>
        <h2>Recipes</h2>
        {recipes.length === 0 ? (
          <p>No recipes yet.</p>
        ) : (
          <ol>
            {recipes.map((r) => (
              <li key={r.slug}>{r.name}</li>
            ))}
          </ol>
        )}
      </section>
    </article>
  )
}
