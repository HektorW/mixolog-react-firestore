import { AuthGuard } from '@/auth/auth-guard'
import { useAuth } from '@/auth/auth-provider'
import { IconArrowLeft } from '@/design/icons/arrow-left'
import { IconPlus } from '@/design/icons/plus'
import { IconProfile } from '@/design/icons/profile'
import { buttonLink } from '@/design/recipes/buttons'
import { css, cx } from '@styled/css'
import { hstack, visuallyHidden } from '@styled/patterns'
import { Link, type LinkComponentProps } from '@tanstack/react-router'
import { type ReactNode } from 'react'

interface HeaderProps {
  title: ReactNode
  backLink?: Pick<LinkComponentProps, 'to' | 'params' | 'search'> & {
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

  const auth = useAuth()

  return (
    <header
      className={hstack({
        containerType: 'inline-size',
        alignItems: 'start',
        paddingBlock: '4',
        paddingInline: 'layout-page-gutter',
      })}
    >
      {backLink && (
        <Link className={backLinkStyle.link} to={backLink.to}>
          <IconArrowLeft className={backLinkStyle.icon} />
          <span className={visuallyHidden()}>{backLink.text}</span>
        </Link>
      )}

      <h1
        className={css({
          textStyle: '2xl',
          alignSelf: 'center',
          textWrap: 'pretty',
        })}
      >
        {title}
      </h1>

      <div className={hstack({ gap: '2', marginLeft: 'auto' })}>
        {createLink && (
          <AuthGuard>
            <Link
              className={cx('group', createLinkStyle.link)}
              to={createLink.to}
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

        {(auth.user || auth.canAuthenticate) && <AuthButton />}
      </div>
    </header>
  )
}

function AuthButton() {
  const auth = useAuth()

  const styles = buttonLink({ variant: auth.user ? 'border' : 'simple' })

  return (
    <button
      className={cx(styles.link, css({ marginLeft: 'auto' }))}
      onClick={auth.user ? auth.signOutAction : auth.signInAction}
    >
      <IconProfile className={styles.icon} />
    </button>
  )
}

function Main({ children }: { children: ReactNode }) {
  return (
    <main
      className={css({
        paddingBlock: 'layout-page-block',
        paddingInline: 'layout-page-gutter',
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
