import { DrinkSchema, type Drink } from '@/schemas/drink'
import { RecipeSchema, type Recipe } from '@/schemas/recipe'
import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore'

// Helper: normalize Firestore Timestamp / Date / sentinel-ish values to Date
interface PossiblyTimestampLike {
  toDate?: () => Date
  seconds?: number
}

function asDate(value: unknown): Date {
  if (!value) return new Date()
  if (value instanceof Date) return value
  if (typeof value === 'string' || typeof value === 'number') {
    // Let Date handle parsing; invalid inputs become 'Invalid Date' which we could guard against.
    const d = new Date(value)
    return isNaN(d.getTime()) ? new Date() : d
  }
  if (typeof value === 'object') {
    const v = value as PossiblyTimestampLike
    if (typeof v.toDate === 'function') return v.toDate()
    if (typeof v.seconds === 'number') return new Date(v.seconds * 1000)
  }
  return new Date()
}

export const drinkConverter: FirestoreDataConverter<Drink> = {
  toFirestore(model: Drink): DocumentData {
    // Note: NOT used for initial create because we prefer serverTimestamp().
    // If you later want symmetric writes, pass a Drink with a real Date and this
    // will serialize it as a Firestore Timestamp automatically.
    return {
      name: model.name,
      createdAt: model.createdAt,
    }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): Drink {
    const data = snapshot.data(options)

    return DrinkSchema.parse({
      name: data.name,
      slug: snapshot.id,
      createdAt: asDate(data.createdAt),
    })
  },
}

export const recipeConverter: FirestoreDataConverter<Recipe> = {
  toFirestore(model: Recipe): DocumentData {
    return {
      name: model.name,
      instructions: model.instructions,
      ingredients: model.ingredients,
      inspirationUrl: model.inspirationUrl ?? null,
      createdAt: model.createdAt,
      drinkSlug: model.drinkSlug,
    }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): Recipe {
    const data = snapshot.data(options)

    return RecipeSchema.parse({
      name: data.name,
      slug: snapshot.id,
      instructions: data.instructions,
      ingredients: data.ingredients,
      inspirationUrl: data.inspirationUrl ?? undefined,
      createdAt: asDate(data.createdAt),
      drinkSlug: data.drinkSlug,
    })
  },
}
