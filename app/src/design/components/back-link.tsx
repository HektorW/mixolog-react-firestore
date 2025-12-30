import { createLink } from '@tanstack/react-router'
import { type AnchorHTMLAttributes, type RefAttributes } from 'react'

import { css, type Styles } from '@styled/css'
import { IconArrowLeft } from '../icons/arrow-left'

interface BackLinkProps
  extends
    AnchorHTMLAttributes<HTMLAnchorElement>,
    RefAttributes<HTMLAnchorElement> {
  css?: Styles
}

function InternalBackLink({
  css: cssProp = {},
  children,
  ...props
}: BackLinkProps) {
  return (
    <a
      {...props}
      className={css(
        {
          alignItems: 'center',
          color: 'blue.500',
          display: 'flex',
          gap: '2',

          _hover: {
            color: 'blue.700',
          },
        },
        cssProp,
      )}
    >
      <IconArrowLeft />
      {children}
    </a>
  )
}

export const BackLink = createLink(InternalBackLink)
