import { z } from 'zod'
import { IngredientSchema } from './ingredient'

const slugFormat = z.stringFormat('slug', /^[a-z0-9]+(?:-[a-z0-9]+)*$/)

const name = z.string().trim().min(1, 'Måste ge receptet ett namn').max(255)
const slug = slugFormat.trim().min(1).max(255)
const instructions = z.string().trim().min(1, 'Måste fylla i instruktioner')
const notes = z.string().trim().optional()
const inspirationUrl = z.url().optional()
const ingredients = z
  .array(IngredientSchema)
  .min(1, 'Måste ange minst en ingrediens')
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

export type Recipe = z.infer<typeof RecipeSchema>

export const CreateRecipeSchema = RecipeSchema.omit({
  slug: true,
  createdAt: true,
}).extend({
  slug: slug.optional(),
})

export type CreateRecipe = z.infer<typeof CreateRecipeSchema>

export const EditRecipeSchema = RecipeSchema.omit({
  createdAt: true,
})

export type EditRecipe = z.infer<typeof EditRecipeSchema>
