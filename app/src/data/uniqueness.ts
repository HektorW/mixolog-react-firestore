// T030 uniqueness logic (in-memory for tests + async Firestore-aware helpers)
// Synchronous functions used by unit tests (T011). Async helpers exported for production code.
// Firestore integration is lightweight; falls back to in-memory cache if Firestore unavailable.
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { getDb } from './firestore'

interface DrinkRecord {
  slug: string
  name: string
}
interface RecipeRecord {
  drinkSlug: string
  slug: string
  name: string
}

const drinks = new Map<string, DrinkRecord>() // key: slug
const recipes = new Map<string, Map<string, RecipeRecord>>() // drinkSlug -> (recipeSlug -> recipe)

export function __resetUniquenessTestState() {
  drinks.clear()
  recipes.clear()
}

export function registerDrink(drink: DrinkRecord) {
  drinks.set(drink.slug.toLowerCase(), {
    ...drink,
    slug: drink.slug.toLowerCase(),
    name: drink.name,
  })
}

export function registerRecipe(recipe: RecipeRecord) {
  let m = recipes.get(recipe.drinkSlug)
  if (!m) {
    m = new Map()
    recipes.set(recipe.drinkSlug, m)
  }
  m.set(recipe.slug.toLowerCase(), {
    ...recipe,
    slug: recipe.slug.toLowerCase(),
  })
}

export function isDrinkSlugUnique(proposedSlug: string): boolean {
  const slugKey = proposedSlug.toLowerCase()
  if (drinks.has(slugKey)) return false
  // Name collision rule: if any drink name slugifies to same slug (simplistic for now)
  for (const d of drinks.values()) {
    if (d.slug.toLowerCase() === slugKey) return false
  }
  return true
}

export function isRecipeSlugUnique(
  drinkSlug: string,
  recipeSlug: string,
): boolean {
  const drinkRecipes = recipes.get(drinkSlug)
  if (!drinkRecipes) return true
  return !drinkRecipes.has(recipeSlug.toLowerCase())
}

// ---------- Async Firestore helpers ----------

export async function checkDrinkSlugUnique(slug: string): Promise<boolean> {
  const lower = slug.toLowerCase()
  // Fast in-memory check first
  if (!isDrinkSlugUnique(lower)) return false
  try {
    const db = await getDb()
    const ref = doc(db, 'drinks', lower)
    const snap = await getDoc(ref)
    if (snap.exists()) return false
    // Also check for name collision by scanning names (small scale assumption)
    const col = collection(db, 'drinks')
    const all = await getDocs(col)
    for (const d of all.docs) {
      const data = d.data() as { name?: unknown }
      if (typeof data.name === 'string' && data.name.toLowerCase() === lower)
        return false
    }
    return true
  } catch {
    // On Firestore failure, fall back to in-memory assumption
    return isDrinkSlugUnique(lower)
  }
}

export async function checkRecipeSlugUnique(
  drinkSlug: string,
  recipeSlug: string,
): Promise<boolean> {
  const lower = recipeSlug.toLowerCase()
  if (!isRecipeSlugUnique(drinkSlug, lower)) return false
  try {
    const db = await getDb()
    const ref = doc(db, 'drinks', drinkSlug, 'recipes', lower)
    const snap = await getDoc(ref)
    return !snap.exists()
  } catch {
    return isRecipeSlugUnique(drinkSlug, lower)
  }
}
