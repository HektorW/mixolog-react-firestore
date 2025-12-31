import { sva } from '@styled/css'

export const buttonLink = sva({
  slots: ['link', 'icon', 'text'],

  base: {
    link: {
      display: 'inline-flex',
      alignItems: 'center',

      color: 'link',
      gap: '2',
      textStyle: '2xl',
      padding: '2',

      _focus: {
        outline: 'none',
      },

      '&:hover, &:focus-visible': {
        color: 'link.hover',
      },
    },

    text: {},

    icon: {
      height: '6',
      width: '6',
    },
  },

  variants: {
    underline: {
      true: {
        link: {
          borderBottomWidth: 1,
        },
      },

      false: {
        link: {
          borderWidth: 1,
          borderColor: 'transparent',
          borderRadius: 'full',

          '&:hover, &:focus-visible': {
            borderColor: 'currentColor',
          },
        },
      },
    },
  },

  defaultVariants: {
    underline: false,
  },
})

export const button = sva({
  slots: ['button', 'icon', 'text'],

  base: {
    button: {
      display: 'inline-flex',
      alignItems: 'center',
      paddingY: '2',
      paddingX: '4',
      backgroundColor: 'primary',
      color: 'white',
      borderRadius: 'md',
      gap: '2',
      textStyle: '2xl',
      fontWeight: '600',

      '&:hover, &:focus-visible': {
        backgroundColor: 'primary.hover',
      },
    },

    text: {},

    icon: {
      height: '6',
      width: '6',
    },
  },

  variants: {
    size: {
      sm: {
        button: {
          paddingY: '1',
          paddingX: '3',
          textStyle: 'xl',
        },
        icon: {
          height: '4',
          width: '4',
        },
      },
    },
  },
})
