import { redirect, type LinkComponentProps } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { useAuth, type AuthContextType } from './auth-provider'

interface AuthGuardProps {
  children: ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return <>{children}</>
}

interface LoaderAuthGuardProps {
  auth: AuthContextType
  redirect?: Pick<LinkComponentProps, 'to' | 'params' | 'search'>
}

export function loaderAuthGuard({
  auth,
  redirect: redirectTo,
}: LoaderAuthGuardProps) {
  if (!auth.user) {
    throw redirect(redirectTo ?? { to: '/' })
  }
}
