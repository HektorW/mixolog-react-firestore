// T028 Firestore initialization with offline persistence
// NOTE: Replace placeholder firebaseConfig with real project config (injected externally or via env)
import { initializeApp, type FirebaseApp } from 'firebase/app'
import {
  enableIndexedDbPersistence,
  getFirestore,
  type Firestore,
} from 'firebase/firestore'

let app: FirebaseApp | undefined
let db: Firestore | undefined

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    app = initializeApp({
      apiKey: 'FAKE-KEY',
      authDomain: 'placeholder.firebaseapp.com',
      projectId: 'placeholder',
      storageBucket: 'placeholder.appspot.com',
      messagingSenderId: '000000000000',
      appId: '1:000000000000:web:placeholder',
    })
  }
  return app
}

export async function getDb(): Promise<Firestore> {
  if (!db) {
    const a = getFirebaseApp()
    db = getFirestore(a)
    try {
      await enableIndexedDbPersistence(db)
    } catch (e) {
      console.warn(
        'IndexedDB persistence enable failed (may already be enabled in another tab)',
        e,
      )
    }
  }
  return db
}
