// T025 Ingredient schema
import { z } from 'zod'

export const IngredientSchema = z.object({
  name: z.string().trim().min(1).max(255),
  amount: z.string().trim().min(1).max(255),
  unit: z.string().trim().max(50).optional(),
})

export type Ingredient = z.infer<typeof IngredientSchema>
