import { recipeDetailOptions } from '@/data/queries'
import { css } from '@styled/css'
import { stack } from '@styled/patterns'
import { useSuspenseQuery } from '@tanstack/react-query'
import Markdown from 'react-markdown'
import { Glimmer } from './common/Glimmer'

interface RecipeDetailsProps {
  drinkSlug: string
  recipeSlug: string
}

export function RecipeDetails({ drinkSlug, recipeSlug }: RecipeDetailsProps) {
  const { data: recipe } = useSuspenseQuery(
    recipeDetailOptions(drinkSlug, recipeSlug),
  )

  return (
    <article className={stack({ gap: '6' })}>
      <h2 className={css({ textStyle: '2xl' })}>{recipe.name}</h2>

      <section>
        <h3 className={css({ textStyle: 'xl' })}>Ingredienser</h3>
        <ul
          className={css({
            display: 'grid',
            gridTemplateColumns: 'auto auto 1fr',
            gap: '1',
          })}
        >
          {recipe.ingredients.map((ingredient, index) => (
            <li
              key={index}
              className={css({
                display: 'grid',
                gridColumn: '1 / -1',
                gridTemplateColumns: 'subgrid',
              })}
            >
              {ingredient.amount && (
                <span className={css({ gridColumn: '1 / 2' })}>
                  {ingredient.amount}
                </span>
              )}

              {ingredient.unit && (
                <span className={css({ gridColumn: '2 / 3' })}>
                  {ingredient.unit}
                </span>
              )}

              <span
                className={css({
                  gridColumn: '3 / 4',
                  paddingInlineStart: '2',
                })}
              >
                {ingredient.name}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section
        className={css({
          '& ol': {
            display: 'flex',
            flexDirection: 'column',
            gap: '1',
            listStyleType: 'decimal',
            marginLeft: '1.5em',
          },
        })}
      >
        <h3 className={css({ textStyle: 'xl' })}>Instruktioner</h3>
        <Markdown
          components={{
            h1: 'h4',
            h2: 'h5',
          }}
        >
          {recipe.instructions}
        </Markdown>
      </section>

      {recipe.inspirationUrl && (
        <p>
          Inspiration:{' '}
          <a href={recipe.inspirationUrl} target="_blank" rel="noreferrer">
            {recipe.inspirationUrl}
          </a>
        </p>
      )}
    </article>
  )
}

RecipeDetails.Skeleton = function RecipeDetailsSkeleton() {
  return (
    <article>
      <Glimmer as="h2" />

      <h3>Ingredienser</h3>
      <ul>
        {Array.from({ length: 3 }).map((_, index) => (
          <Glimmer key={index} as="li" />
        ))}
      </ul>

      <h3>Instruktioner</h3>
      <Glimmer
        css={{
          height: '4lh',
          width: '60ch',
        }}
      />

      <Glimmer />
    </article>
  )
}
