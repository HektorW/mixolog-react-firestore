import { sva } from '@styled/css'

export const buttonLink = sva({
  slots: ['link', 'icon', 'text'],

  base: {
    link: {
      textStyle: '2xl',
      display: 'inline-flex',
      gap: '2',
      justifyContent: 'center',

      alignItems: 'center',
      padding: '2',

      color: 'link',
      _focus: {
        outline: 'none',
      },

      '&:hover, &:focus-visible': {
        color: 'link.hover',
      },
    },

    text: {},

    icon: {
      width: '6',
      height: '6',
    },
  },

  variants: {
    size: {
      sm: {
        link: {
          textStyle: 'sm',
          paddingBlock: '1',
        },
        icon: {
          width: '4',
          height: '4',
        },
      },
    },

    variant: {
      simple: {
        link: {
          borderColor: 'transparent',
          borderRadius: 'full',

          borderWidth: 1,
          '&:hover, &:focus-visible': {
            borderColor: 'currentColor',
          },
        },
      },

      underline: {
        link: {
          borderBottomWidth: 1,
        },
      },

      border: {
        link: {
          borderColor: 'currentColor',
          borderRadius: 'full',
          borderWidth: 1,
          paddingX: '3',

          '&:hover, &:focus-visible': {
            borderStyle: 'dashed',
          },
        },
      },
    },
  },

  defaultVariants: {
    variant: 'simple',
  },
})

export const button = sva({
  slots: ['button', 'icon', 'text'],

  base: {
    button: {
      textStyle: '2xl',
      display: 'inline-flex',
      gap: '2',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 'md',
      paddingY: '2',
      paddingX: '4',
      color: 'white',
      fontWeight: '600',

      backgroundColor: 'primary',
      '&:hover, &:focus-visible': {
        backgroundColor: 'primary.hover',
      },
    },

    text: {},

    icon: {
      width: '6',
      height: '6',
    },
  },

  variants: {
    size: {
      sm: {
        button: {
          textStyle: 'xl',
          paddingY: '1',
          paddingX: '3',
        },
        icon: {
          width: '4',
          height: '4',
        },
      },
    },
  },
})
