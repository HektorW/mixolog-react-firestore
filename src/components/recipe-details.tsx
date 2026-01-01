import { AuthGuard } from '@/auth/auth-guard'
import { recipeDetailOptions } from '@/data/queries'
import { IconPencil } from '@/design/icons/pencil'
import { IconShare } from '@/design/icons/share'
import { buttonLink } from '@/design/recipes/buttons'
import { card } from '@/design/recipes/cards'
import { css } from '@styled/css'
import { hstack, stack } from '@styled/patterns'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, useLocation } from '@tanstack/react-router'
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

  const location = useLocation()

  const shareData: ShareData = {
    title: `Recept för ${recipe.name}`,
    text: `Kolla in receptet för ${recipe.name} på Mixolog!`,
    url: location.href,
  }

  const canShare = navigator.canShare && navigator.canShare(shareData)

  function onShare() {
    if (canShare) {
      navigator.share(shareData)
    }
  }

  const toolbarLinkStyle = buttonLink({ size: 'sm' })

  return (
    <article className={stack({ gap: '6' })}>
      <section className={hstack({ gap: '2', justify: 'end' })}>
        <AuthGuard>
          <Link
            to="/drinks/$drinkSlug/recipes/$recipeSlug/edit"
            params={{ drinkSlug, recipeSlug }}
            className={toolbarLinkStyle.link}
          >
            <IconPencil className={toolbarLinkStyle.icon} />
          </Link>
        </AuthGuard>

        {canShare && (
          <button className={toolbarLinkStyle.link} onClick={onShare}>
            <span className={toolbarLinkStyle.text}>Dela</span>
            <IconShare className={toolbarLinkStyle.icon} />
          </button>
        )}
      </section>

      <section className={card({ variant: 'dotted' })}>
        <h3
          className={css({
            textStyle: 'xl',
            marginBlockEnd: '2',
            fontWeight: 'lighter',
          })}
        >
          Ingredienser
        </h3>
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
                <span
                  className={css({
                    color: 'gray.600',
                    gridColumn: '1 / 2',
                    textAlign: 'right',
                  })}
                >
                  {ingredient.amount}
                </span>
              )}

              {ingredient.unit && (
                <span
                  className={css({ color: 'gray.600', gridColumn: '2 / 3' })}
                >
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

      <hr className={css({ borderColor: 'gray.200', marginY: '1' })} />

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
        <h3
          className={css({
            textStyle: 'xl',
            marginBlockEnd: '2',
            fontWeight: 'lighter',
          })}
        >
          Instruktioner
        </h3>
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
        <p className={css({ textStyle: 'sm', color: 'gray.600' })}>
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
  return <Glimmer css={{ height: 'md' }} />
  // return (
  //   <article>
  //     <section>
  //       <h3>Ingredienser</h3>
  //       <ul>
  //         {Array.from({ length: 3 }).map((_, index) => (
  //           <Glimmer key={index} as="li" />
  //         ))}
  //       </ul>
  //     </section>

  //     <h3>Instruktioner</h3>
  //     <Glimmer
  //       css={{
  //         height: '4lh',
  //         width: '60ch',
  //       }}
  //     />

  //     <Glimmer />
  //   </article>
  // )
}
