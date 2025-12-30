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
      <h1>404 - Inget hittades</h1>
      <Link to="/">Gå hem</Link>
    </div>
  ),
  component: () => <Outlet />,
})
