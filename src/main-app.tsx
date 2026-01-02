import { QueryClientProvider, useQueryClient } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { StrictMode, type ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { AuthProvider, useAuth } from './auth/auth-provider'
import { DefaultErrorFallback } from './components/common/DefaultErrorFallback'
import { queryClient } from './query-client'
import { router } from './router'

export function MainApp() {
  return (
    <MainAppShell>
      <MainAppRoot />
    </MainAppShell>
  )
}

function MainAppShell({ children }: { children: ReactNode }) {
  return (
    <StrictMode>
      <ErrorBoundary FallbackComponent={DefaultErrorFallback}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </AuthProvider>
      </ErrorBoundary>
    </StrictMode>
  )
}

function MainAppRoot() {
  const auth = useAuth()
  const queryClient = useQueryClient()

  return <RouterProvider router={router} context={{ auth, queryClient }} />
}
