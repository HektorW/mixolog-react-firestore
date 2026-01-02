import { z } from 'zod'
import { IngredientSchema } from './ingredient'

const name = z.string().trim().min(1).max(255)
const slug = z.string().trim().min(1).max(255)
const instructions = z.string().trim().min(1)
const notes = z.string().trim().optional()
const inspirationUrl = z.url().optional()
const ingredients = z.array(IngredientSchema).min(1)
const drinkSlug = z.string().trim().min(1).max(255)

export const RecipeSchema = z.object({
  name,
  slug,
  instructions,
  notes,
  ingredients,
  inspirationUrl,
  createdAt: z.date(),
  drinkSlug,
})

export const CreateRecipeSchema = z.object({
  name,
  slug: slug.optional(),
  instructions,
  notes,
  ingredients,
  inspirationUrl,
  drinkSlug,
})

export type CreateRecipe = z.infer<typeof CreateRecipeSchema>

export type Recipe = z.infer<typeof RecipeSchema>
