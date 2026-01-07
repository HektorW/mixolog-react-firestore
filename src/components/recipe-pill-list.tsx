import { AuthGuard } from '@/auth/auth-guard'
import { recipesForDrinkOptions } from '@/data/queries'
import { IconPlus } from '@/design/icons/plus'
import { pill, pillList } from '@/design/recipes/pills'
import { css, cx } from '@styled/css'
import { stack } from '@styled/patterns'
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
    <section className={stack({ gap: '2' })}>
      <h2 className={css({ textStyle: 'lg', fontWeight: 'lighter' })}>
        Recept-varianter
      </h2>

      <ul
        className={cx(
          pillList(),
          css({ '--overflow-margin': token.var('spacing.layout-page-gutter') }),
        )}
      >
        {recipeList.map((recipe) => (
          <li key={recipe.slug}>
            <Link
              className={pill({
                selected: selectedRecipe?.slug === recipe.slug,
              })}
              to="/drinks/$drinkSlug"
              params={{ drinkSlug }}
              search={{ recipeSlug: recipe.slug }}
            >
              {recipe.name}
            </Link>
          </li>
        ))}

        <AuthGuard>
          <li>
            <Link
              className={pill({ variant: 'outline' })}
              to="/drinks/$drinkSlug/recipes/create"
              params={{ drinkSlug }}
            >
              Lägg till recept <IconPlus />
            </Link>
          </li>
        </AuthGuard>
      </ul>
    </section>
  )
}
