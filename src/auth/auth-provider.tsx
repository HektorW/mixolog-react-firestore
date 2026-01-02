import { getAuthInstance, getGoogleAuthProvider } from '@/data/firestore'
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth'
import {
  createContext,
  use,
  useEffect,
  useState,
  useTransition,
  type ReactNode,
} from 'react'
import { useCanAuthenticate } from './can-authenticate'

export interface AuthContextType {
  canAuthenticate: boolean
  user: User | null
  loading: boolean
  signInAction: () => void
  signOutAction: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = use(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, startTransition] = useTransition()

  const canAuthenticate = useCanAuthenticate()

  useEffect(() => {
    onAuthStateChanged(getAuthInstance(), (firebaseUser) => {
      startTransition(() => {
        setUser(firebaseUser)
      })
    })
  }, [])

  function signInAction() {
    startTransition(async () => {
      await signInWithPopup(getAuthInstance(), getGoogleAuthProvider())
    })
  }

  function signOutAction() {
    startTransition(async () => {
      await signOut(getAuthInstance())
    })
  }

  const contextValue: AuthContextType = {
    canAuthenticate,
    user,
    loading,
    signInAction,
    signOutAction,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
