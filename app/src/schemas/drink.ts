// T024 Drink schema
import { z } from 'zod'

const name = z.string().trim().min(1).max(255)
const slug = z
  .string()
  .trim()
  .min(1)
  .max(255)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)

export const DrinkSchema = z.object({
  name,
  slug,
  createdAt: z.date(),
})

export const CreateDrinkSchema = z.object({
  name,
  slug: slug.min(0).optional(),
})

export type Drink = z.infer<typeof DrinkSchema>
export type CreateDrink = z.infer<typeof CreateDrinkSchema>
