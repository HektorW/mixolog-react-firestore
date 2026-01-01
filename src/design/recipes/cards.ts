import { cva } from '@styled/css'
import { token } from '@styled/tokens'

export const card = cva({
  base: {
    padding: '4',
  },

  variants: {
    variant: {
      dotted: {
        '--dot-offset': token.var('spacing.5'),

        bgColor: 'white',
        borderRadius: 'md',
        margin: 'var(--dot-offset)',
        position: 'relative',

        _before: {
          bgImage: 'radial-gradient(currentColor 1px, transparent 0px)',
          bgSize: '5px 5px',
          bgPosition: 'center',
          bgRepeat: 'repeat',
          borderRadius: `calc(${token.var('radii.md')} + var(--dot-offset))`,
          content: '""',
          position: 'absolute',
          inset: 'calc(-1 * var(--dot-offset))',
          zIndex: '-1',
        },
      },
    },
  },
})
