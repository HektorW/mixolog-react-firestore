// T033 root route
import type { QueryClient } from '@tanstack/react-query'

import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from '@tanstack/react-router'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  notFoundComponent: () => (
    <div>
      <h1>404 - Not Found</h1>
      <Link to="/">Go Home</Link>
    </div>
  ),
  component: () => <Outlet />,
})
