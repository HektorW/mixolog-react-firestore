import { DrinkSchema, type Drink } from '@/schemas/drink'
import type { DocumentSnapshot, QuerySnapshot } from 'firebase/firestore'

function documentSnapshotToDrinkStruct(docSnapshot: DocumentSnapshot) {
  const data = docSnapshot.data()
  if (!data) throw new Error('No data')

  return {
    ...data,
    slug: docSnapshot.id,
    createdAt: new Date(data.createdAt.seconds),
  }
}

export function parseSnapshotToDrink(doc: DocumentSnapshot): Drink {
  return DrinkSchema.parse(documentSnapshotToDrinkStruct(doc))
}

export function safeParseSnapshotToDrinkList(snap: QuerySnapshot): Drink[] {
  return snap.docs
    .map((doc) => DrinkSchema.safeParse(documentSnapshotToDrinkStruct(doc)))
    .filter((r) => r.success)
    .map((r) => r.data)
}

export function toSortedDrinkList(drinkList: Drink[]) {
  return drinkList.toSorted((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'accent' }),
  )
}
