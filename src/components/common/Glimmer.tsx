import { css, type Styles } from '@styled/css'
import type { JSX, ReactNode } from 'react'

interface GlimmerProps {
  as?:
    | keyof JSX.IntrinsicElements
    | React.JSXElementConstructor<{ children: ReactNode; className?: string }>
  placeholderText?: string
  css?: Styles
}

export function Glimmer({
  as: Component = 'div',
  placeholderText = 'Loading...',
  css: cssProp = {},
}: GlimmerProps) {
  return (
    <Component
      aria-busy="true"
      className={css(
        {
          background: '#eee',
          color: 'transparent',
          pointerEvents: 'none',
          userSelect: 'none',
        },
        cssProp,
      )}
    >
      {placeholderText}
    </Component>
  )
}
