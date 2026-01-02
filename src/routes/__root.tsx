import type { AuthContextType } from '@/auth/auth-provider'
import type { QueryClient } from '@tanstack/react-query'

import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from '@tanstack/react-router'

interface MyRouteContext {
  auth: AuthContextType
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouteContext>()({
  notFoundComponent: () => (
    <div>
      <h1>404 - Inget hittades</h1>
      <Link to="/">Gå hem</Link>
    </div>
  ),
  component: () => <Outlet />,
})
