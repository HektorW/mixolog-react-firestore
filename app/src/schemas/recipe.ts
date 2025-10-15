// T026 Recipe schema (depends on Ingredient schema)
import { z } from 'zod'
import { IngredientSchema } from './ingredient'

export const RecipeSchema = z.object({
  name: z.string().trim().min(1).max(255),
  slug: z.string().trim().min(1).max(255),
  instructions: z.string().trim().min(1),
  ingredients: z.array(IngredientSchema).min(1),
  inspirationUrl: z.url().optional(),
  createdAt: z.date(),
  drinkSlug: z.string().trim().min(1).max(255),
})

export type Recipe = z.infer<typeof RecipeSchema>
