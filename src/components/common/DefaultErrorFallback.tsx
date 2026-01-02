import { css } from '@styled/css'
import type { FallbackProps } from 'react-error-boundary'

export function DefaultErrorFallback(props: FallbackProps) {
  return (
    <div role="alert">
      <h2>Något gick fel</h2>
      <pre className={css({ color: 'red.500' })}>{props.error.message}</pre>
      <button onClick={props.resetErrorBoundary}>Reset error</button>
    </div>
  )
}
