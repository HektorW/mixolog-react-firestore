import { doc, getDoc } from 'firebase/firestore'
import { getDb } from './firestore'

export async function checkDrinkSlugUnique(slug: string): Promise<boolean> {
  const lower = slug.toLowerCase()

  const db = await getDb()

  const docReference = doc(db, 'drinks', lower)
  const docSnapshot = await getDoc(docReference)

  return !docSnapshot.exists()
}

export async function checkRecipeSlugUnique(
  drinkSlug: string,
  recipeSlug: string,
): Promise<boolean> {
  const lower = recipeSlug.toLowerCase()

  const db = await getDb()

  const docReference = doc(db, 'drinks', drinkSlug, 'recipes', lower)
  const docSnapshot = await getDoc(docReference)

  return !docSnapshot.exists()
}
