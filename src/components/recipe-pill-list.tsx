import { AuthGuard } from '@/auth/auth-guard'
import { recipesForDrinkOptions } from '@/data/queries'
import { IconPlus } from '@/design/icons/plus'
import { pill, pillList } from '@/design/recipes/pills'
import { css, cx } from '@styled/css'
import { token } from '@styled/tokens'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'

interface RecipePillListProps {
  drinkSlug: string
  recipeSlug: string | undefined
}

export function RecipePillList({ drinkSlug, recipeSlug }: RecipePillListProps) {
  const { data: recipeList } = useSuspenseQuery(
    recipesForDrinkOptions(drinkSlug),
  )

  const selectedRecipe = recipeList.find(($) => $.slug === recipeSlug)

  return (
    <ul
      className={cx(
        pillList(),
        css({ '--overflow-margin': token.var('spacing.layout-page-gutter') }),
      )}
    >
      {recipeList.map((recipe) => (
        <li key={recipe.slug}>
          <Link
            to="/drinks/$drinkSlug"
            params={{ drinkSlug }}
            search={{ recipeSlug: recipe.slug }}
            className={pill({ selected: selectedRecipe?.slug === recipe.slug })}
          >
            {recipe.name}
          </Link>
        </li>
      ))}

      <AuthGuard>
        <li>
          <Link
            to="/drinks/$drinkSlug/recipes/create"
            params={{ drinkSlug }}
            className={pill({ variant: 'outline' })}
          >
            Lägg till recept <IconPlus />
          </Link>
        </li>
      </AuthGuard>
    </ul>
  )
}
