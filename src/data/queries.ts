import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore'
import { drinkConverter, recipeConverter } from './converters'
import { toSortedDrinkList } from './drinks'
import { getDb } from './firestore'

export function drinksListOptions() {
  return {
    queryKey: ['drinks'],
    queryFn: async () => {
      const db = await getDb()

      const collectionReference = collection(db, 'drinks').withConverter(
        drinkConverter,
      )

      const collectionQuery = query(collectionReference, orderBy('name'))

      const querySnapshot = await getDocs(collectionQuery)

      const drinkList = querySnapshot.docs.map((queryDocSnapshot) =>
        queryDocSnapshot.data(),
      )

      return toSortedDrinkList(drinkList)
    },
  }
}

export function drinkDetailOptions(drinkSlug: string) {
  return {
    queryKey: ['drink', drinkSlug],
    queryFn: async () => {
      const db = await getDb()

      const docReference = doc(db, 'drinks', drinkSlug).withConverter(
        drinkConverter,
      )

      const docSnapshot = await getDoc(docReference)
      if (!docSnapshot.exists()) {
        throw new Error('Not found')
      }

      return docSnapshot.data()
    },
  }
}

export function recipesForDrinkOptions(drinkSlug: string) {
  return {
    queryKey: ['recipes', drinkSlug],
    queryFn: async () => {
      const db = await getDb()

      const collectionReference = collection(
        db,
        'drinks',
        drinkSlug,
        'recipes',
      ).withConverter(recipeConverter)

      const collectionQuery = query(
        collectionReference,
        orderBy('createdAt', 'asc'),
      )

      const querySnapshot = await getDocs(collectionQuery)

      return querySnapshot.docs.map((queryDocSnapshot) =>
        queryDocSnapshot.data(),
      )
    },
  }
}

export function recipeDetailOptions(drinkSlug: string, recipeSlug: string) {
  return {
    queryKey: ['recipe', drinkSlug, recipeSlug],
    queryFn: async () => {
      const db = await getDb()

      const docReference = doc(
        db,
        'drinks',
        drinkSlug,
        'recipes',
        recipeSlug,
      ).withConverter(recipeConverter)

      const docSnapshot = await getDoc(docReference)

      if (!docSnapshot.exists()) {
        throw new Error('Not found')
      }

      return docSnapshot.data()
    },
  }
}
