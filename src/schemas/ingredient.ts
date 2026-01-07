import { z } from 'zod'

export const IngredientSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Måste fylla i ett namn')
    .max(255, 'Max 255 tecken'),

  amount: z.string().trim().max(255, 'Max 255 tecken').optional(),

  unit: z.string().trim().max(50, 'Max 50 tecken').optional(),
})

export type Ingredient = z.infer<typeof IngredientSchema>
