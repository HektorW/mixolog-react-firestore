import { AuthGuard } from '@/auth/auth-guard'
import { IconArrowLeft } from '@/design/icons/arrow-left'
import { IconPlus } from '@/design/icons/plus'
import { buttonLink } from '@/design/recipes/buttons'
import { css, cx } from '@styled/css'
import { hstack, visuallyHidden } from '@styled/patterns'
import { Link, type LinkComponentProps } from '@tanstack/react-router'
import type { ReactNode } from 'react'

interface HeaderProps {
  title: ReactNode
  backLink?: Pick<LinkComponentProps, 'to' | 'params'> & {
    text: ReactNode
  }
  createLink?: {
    to: LinkComponentProps['to']
    text: ReactNode
  }
}

export function Header({ title, backLink, createLink }: HeaderProps) {
  const backLinkStyle = buttonLink()
  const createLinkStyle = buttonLink()

  return (
    <header
      className={hstack({
        paddingBlock: '4',
        paddingInline: 'layout-page-gutter',
      })}
    >
      {backLink && (
        <Link to={backLink.to} className={backLinkStyle.link}>
          <IconArrowLeft className={backLinkStyle.icon} />
          <span className={visuallyHidden()}>{backLink.text}</span>
        </Link>
      )}

      <h1
        className={css({
          textStyle: '4xl',
          textWrap: 'pretty',
        })}
      >
        {title}
      </h1>

      {createLink && (
        <AuthGuard>
          <Link
            to={createLink.to}
            className={cx(
              'group',
              createLinkStyle.link,
              css({ marginLeft: 'auto' }),
            )}
          >
            <span className={createLinkStyle.text}>{createLink.text}</span>
            <IconPlus
              className={cx(
                createLinkStyle.icon,
                css({
                  _groupHover: {
                    animationName: 'spin',
                    animationDuration: 'slower',
                    animationTimingFunction: 'out',
                  },
                }),
              )}
            />
          </Link>
        </AuthGuard>
      )}
    </header>
  )
}

function Main({ children }: { children: ReactNode }) {
  return (
    <main
      className={css({
        paddingInline: 'layout-page-gutter',
        paddingBlock: 'layout-page-block',
      })}
    >
      {children}
    </main>
  )
}

export const Page = {
  Header,
  Main,
}
