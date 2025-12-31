import { Glimmer } from '@/components/common/Glimmer'
import { DrinkName } from '@/components/drink-name'
import { Page } from '@/components/page'
import { RecipeDetails } from '@/components/recipe-details'
import { RecipePillList } from '@/components/recipe-pill-list'
import { recipesForDrinkOptions } from '@/data/queries'
import { IconPlus } from '@/design/icons/plus'
import { buttonLink } from '@/design/recipes/buttons'
import { css } from '@styled/css'
import { vstack } from '@styled/patterns'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Suspense, ViewTransition, type ReactNode } from 'react'
import z from 'zod'

const drinkDetailsSearchSchema = z.object({
  recipeSlug: z.string().optional(),
})

export const Route = createFileRoute('/drinks/$drinkSlug/')({
  validateSearch: (search) => drinkDetailsSearchSchema.parse(search),

  component: DrinkDetailRoute,
})

function DrinkDetailRoute() {
  return (
    <Suspense fallback={<DrinkDetailRouteSkeleton />}>
      <DrinkDetailRouteRoot />
    </Suspense>
  )
}

function DrinkDetailRouteRoot() {
  const { drinkSlug } = Route.useParams()
  const { recipeSlug: recipeSlugSearch } = Route.useSearch()

  const { data: recipes } = useSuspenseQuery(recipesForDrinkOptions(drinkSlug))

  if (recipes.length === 0) {
    const linkStyles = buttonLink()

    return (
      <Layout>
        <div className={vstack({ gap: '4', marginTop: '8' })}>
          <p className={css({ textStyle: '2xl' })}>Inga recept än :(</p>

          <Link
            to="/drinks/$drinkSlug/recipes/create"
            params={{ drinkSlug }}
            className={linkStyles.link}
          >
            <span className={linkStyles.text}>Lägg till det första!</span>
            <IconPlus className={linkStyles.icon} />
          </Link>
        </div>
      </Layout>
    )
  }

  const selectedRecipe =
    recipes.find(($) => $.slug === recipeSlugSearch) ?? recipes.at(0)

  return (
    <Layout>
      <RecipePillList drinkSlug={drinkSlug} recipeSlug={selectedRecipe?.slug} />

      {selectedRecipe && (
        <ViewTransition>
          <Suspense fallback={<RecipeDetails.Skeleton />}>
            <RecipeDetails
              key={selectedRecipe.slug}
              drinkSlug={drinkSlug}
              recipeSlug={selectedRecipe?.slug}
            />
          </Suspense>
        </ViewTransition>
      )}
    </Layout>
  )
}

function DrinkDetailRouteSkeleton() {
  return (
    <Layout>
      <Glimmer css={{ height: 'lg' }} />
    </Layout>
  )
}

function Layout({ children }: { children: ReactNode }) {
  const { drinkSlug } = Route.useParams()

  return (
    <>
      <Page.Header
        title={<DrinkName slug={drinkSlug} />}
        backLink={{ to: '/', text: 'Tillbaka till alla drinkar' }}
      />

      <Page.Main>{children}</Page.Main>
    </>
  )
}
