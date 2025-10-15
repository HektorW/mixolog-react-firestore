// T029 Query option factories for TanStack Query
import { DrinkSchema } from '@/schemas/drink'
import { RecipeSchema } from '@/schemas/recipe'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore'
import { getDb } from './firestore'

export function drinksListOptions() {
  return {
    queryKey: ['drinks'],
    queryFn: async () => {
      const db = await getDb()
      const col = collection(db, 'drinks')
      const q = query(col, orderBy('name'))
      const snap = await getDocs(q)
      return snap.docs.map((d) =>
        DrinkSchema.parse({ ...d.data(), slug: d.id }),
      )
    },
  }
}

export function drinkDetailOptions(drinkSlug: string) {
  return {
    queryKey: ['drink', drinkSlug],
    queryFn: async () => {
      const db = await getDb()
      const ref = doc(db, 'drinks', drinkSlug)
      const snap = await getDoc(ref)
      if (!snap.exists()) throw new Error('Not found')
      return DrinkSchema.parse({ ...snap.data(), slug: snap.id })
    },
  }
}

export function recipesForDrinkOptions(drinkSlug: string) {
  return {
    queryKey: ['recipes', drinkSlug],
    queryFn: async () => {
      const db = await getDb()
      const col = collection(db, 'drinks', drinkSlug, 'recipes')
      // Newest first
      const q = query(col, orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      return snap.docs.map((d) =>
        RecipeSchema.parse({ ...d.data(), slug: d.id }),
      )
    },
  }
}
