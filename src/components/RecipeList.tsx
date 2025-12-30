import { recipesForDrinkOptions } from '@/data/queries'
import { CreateLink } from '@/design/components/create-link'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { Glimmer } from './common/Glimmer'

interface RecipeListProps {
  drinkSlug: string
}

export function RecipeList({ drinkSlug }: RecipeListProps) {
  const { data: recipes } = useSuspenseQuery(recipesForDrinkOptions(drinkSlug))

  if (recipes.length === 0) {
    return (
      <>
        <p>Inga recept än.</p>

        <CreateLink to="/drinks/$drinkSlug/recipes/create" params={{ drinkSlug }}>
          Lägg till det första receptet!
        </CreateLink>
      </>
    )
  }

  return (
    <>
      <CreateLink to="/drinks/$drinkSlug/recipes/create" params={{ drinkSlug }}>
        Lägg till nytt recept
      </CreateLink>

      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.slug}>
            <Link
              to="/drinks/$drinkSlug/recipes/$recipeSlug"
              params={{ drinkSlug, recipeSlug: recipe.slug }}
            >
              {recipe.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

RecipeList.Skeleton = function RecipeListSkeleton() {
  return (
    <ul>
      {Array.from({ length: 3 }).map((_, index) => (
        <Glimmer key={index} as="li" />
      ))}
    </ul>
  )
}
