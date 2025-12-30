// T031 Create mutations (drink & recipe)
import { DrinkSchema, type CreateDrink, type Drink } from '@/schemas/drink'
import type { Ingredient } from '@/schemas/ingredient'
import { RecipeSchema, type Recipe } from '@/schemas/recipe'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { getDb } from './firestore'
import { normalizeSlug } from './slug'
import { checkDrinkSlugUnique, checkRecipeSlugUnique } from './uniqueness'

interface CreateRecipeInput {
  drinkSlug: string
  name: string
  slug?: string
  instructions: string
  ingredients: Ingredient[]
  inspirationUrl?: string
}

export async function createDrink(input: CreateDrink): Promise<Drink> {
  const name = input.name.trim()
  const slug = normalizeSlug(input.slug || name)

  if (!(await checkDrinkSlugUnique(slug))) {
    throw new Error('Duplicate drink slug or name')
  }

  const db = await getDb()

  const docReference = doc(db, 'drinks', slug)
  const toWrite = { name, createdAt: serverTimestamp() } as const

  await setDoc(docReference, toWrite)

  return DrinkSchema.parse({ ...toWrite, createdAt: new Date(), slug })
}

export async function createRecipe(input: CreateRecipeInput): Promise<Recipe> {
  const name = input.name.trim()

  let slug = (input.slug ?? normalizeSlug(name)).trim()
  slug = normalizeSlug(slug)

  if (!(await checkRecipeSlugUnique(input.drinkSlug, slug))) {
    throw new Error('Duplicate recipe slug')
  }

  const db = await getDb()
  const docReference = doc(db, 'drinks', input.drinkSlug, 'recipes', slug)

  const toWrite = {
    name,
    instructions: input.instructions.trim(),
    ingredients: input.ingredients,
    inspirationUrl: input.inspirationUrl?.trim() || undefined,
    createdAt: serverTimestamp(),
    drinkSlug: input.drinkSlug,
  } as const

  await setDoc(docReference, toWrite)

  return RecipeSchema.parse({ ...toWrite, createdAt: new Date(), slug })
}
