// T028 Firestore initialization with offline persistence
// NOTE: Replace placeholder firebaseConfig with real project config (injected externally or via env)
import { initializeApp, type FirebaseApp } from 'firebase/app'
import {
  initializeFirestore,
  persistentLocalCache,
  type Firestore,
} from 'firebase/firestore'

let app: FirebaseApp | undefined
let db: Firestore | undefined

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    app = initializeApp({
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    })
  }

  return app
}

export async function getDb(): Promise<Firestore> {
  if (!db) {
    const _app = getFirebaseApp()

    db = initializeFirestore(_app, {
      localCache: persistentLocalCache(),
    })
  }

  return db
}
