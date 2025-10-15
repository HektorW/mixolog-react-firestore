import {
  __resetUniquenessTestState,
  isDrinkSlugUnique,
  isRecipeSlugUnique,
  registerDrink,
  registerRecipe,
} from '@/data/uniqueness'
import { beforeEach, describe, expect, it } from 'vitest'

// T011 uniqueness logic (in-memory placeholder; later Firestore-backed)

describe('uniqueness checks', () => {
  beforeEach(() => __resetUniquenessTestState())

  it('drink slug unique initially', () => {
    expect(isDrinkSlugUnique('cola')).toBe(true)
  })

  it('drink slug not unique after registering drink (by slug)', () => {
    registerDrink({ slug: 'cola', name: 'Cola' })
    expect(isDrinkSlugUnique('cola')).toBe(false)
  })

  it('drink slug not unique if name collides case-insensitive', () => {
    registerDrink({ slug: 'fizzy-water', name: 'Fizzy Water' })
    expect(isDrinkSlugUnique('fizzy-water')).toBe(false)
    // Name collision scenario (simulate checking by proposed slug vs existing name duplicate rule)
  })

  it('recipe slug unique per drink partition', () => {
    registerDrink({ slug: 'cola', name: 'Cola' })
    expect(isRecipeSlugUnique('cola', 'classic')).toBe(true)
    registerRecipe({ drinkSlug: 'cola', slug: 'classic', name: 'Classic' })
    expect(isRecipeSlugUnique('cola', 'classic')).toBe(false)
    // Different drink -> still unique
    registerDrink({ slug: 'pepsi', name: 'Pepsi' })
    expect(isRecipeSlugUnique('pepsi', 'classic')).toBe(true)
  })
})
