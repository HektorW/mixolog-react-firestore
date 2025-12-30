import { css, cx } from '@styled/css'
import type { ReactNode } from 'react'

interface PageTitleProps {
  className?: string
  children: ReactNode
}

export function PageTitle({ children, className }: PageTitleProps) {
  return (
    <h1
      className={cx(
        css({
          fontSize: '2xl',
          fontWeight: 'bold',
          marginBottom: '4',
        }),
        className,
      )}
    >
      {children}
    </h1>
  )
}
