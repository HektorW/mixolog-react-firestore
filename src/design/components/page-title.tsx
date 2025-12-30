import { css, cx } from '@styled/css'
import type { ReactNode } from 'react'

interface PageTitleProps {
  className?: string
  children: ReactNode
}

export function PageTitle({ children, className }: PageTitleProps) {
  return (
    <h1 className={cx(css({ textStyle: '5xl' }), className)}>{children}</h1>
  )
}
