import { css, type Styles } from '@styled/css'
import { createLink } from '@tanstack/react-router'
import type { AnchorHTMLAttributes, RefAttributes } from 'react'
import { IconPlus } from '../icons/plus'

interface CreateLinkProps
  extends
    AnchorHTMLAttributes<HTMLAnchorElement>,
    RefAttributes<HTMLAnchorElement> {
  css?: Styles
}

function InternalCreateLink({
  css: cssProp = {},
  children,
  ...props
}: CreateLinkProps) {
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
      {children}
      <IconPlus />
    </a>
  )
}

export const CreateLink = createLink(InternalCreateLink)
