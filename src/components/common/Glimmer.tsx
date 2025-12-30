import { css, cx, type Styles } from '@styled/css'
import type { JSX, ReactNode } from 'react'

interface GlimmerProps {
  as?:
    | keyof JSX.IntrinsicElements
    | React.JSXElementConstructor<{ children: ReactNode; className?: string }>
  placeholderText?: string
  css?: Styles
  className?: string
}

export function Glimmer({
  as: Component = 'div',
  placeholderText = 'Loading...',
  css: cssProp = {},
  className,
}: GlimmerProps) {
  return (
    <Component
      aria-busy="true"
      className={cx(
        css(
          {
            background: '#eee',
            color: 'transparent',
            pointerEvents: 'none',
            userSelect: 'none',
          },
          cssProp,
        ),
        className,
      )}
    >
      {placeholderText}
    </Component>
  )
}
