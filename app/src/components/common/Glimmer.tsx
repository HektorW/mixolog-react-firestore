import type { CSSProperties, JSX } from 'react'

interface GlimmerProps {
  as?: keyof JSX.IntrinsicElements
  placeholderText?: string
  style?: CSSProperties
}

export function Glimmer({
  as: Component = 'div',
  placeholderText = 'Loading...',
  style,
}: GlimmerProps) {
  return (
    <Component
      aria-busy="true"
      style={{
        background: '#eee',
        color: 'transparent',
        pointerEvents: 'none',
        userSelect: 'none',
        ...style,
      }}
    >
      {placeholderText}
    </Component>
  )
}
