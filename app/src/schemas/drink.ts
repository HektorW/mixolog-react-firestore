// T024 Drink schema
import { z } from 'zod'

export const DrinkSchema = z.object({
  name: z.string().trim().min(1).max(255),
  slug: z.string().trim().min(1).max(255),
  createdAt: z.date(),
})

export type Drink = z.infer<typeof DrinkSchema>
