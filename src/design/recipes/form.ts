import { cva, sva } from '@styled/css'
import { stack } from '@styled/patterns'

export const formField = sva({
  slots: ['container', 'label', 'control', 'error'],

  base: {
    label: {
      display: 'block',
      marginBottom: '2',
      textStyle: '2xl',
    },

    control: {},

    error: {
      marginTop: '1',
      color: 'red.600',
      textStyle: 'md',
    },
  },
})

export const formLayout = cva({
  base: {
    ...stack.raw(),
    gap: '6',
  },
})

export const input = cva({
  base: {
    display: 'block',
    width: 'full',
    paddingY: '2',
    paddingX: '3',
    borderWidth: '1',
    borderColor: 'gray.300',
    borderRadius: 'md',
    backgroundColor: 'white',
    textStyle: '2xl',

    '&:focus': {
      outlineColor: 'primary',
      borderColor: 'primary',
    },
  },
})

export const submit = cva({
  base: {
    paddingY: '2',
    paddingX: '4',
    backgroundColor: 'primary',
    color: 'white',
    borderRadius: 'md',
    textStyle: '2xl',
    fontWeight: '600',

    '&:hover, &:focus-visible': {
      backgroundColor: 'primary.hover',
    },

    _disabled: {
      backgroundColor: 'gray.400',
      cursor: 'not-allowed',
    },
  },

  variants: {
    pending: {
      true: {
        backgroundColor: 'gray.400',
        cursor: 'not-allowed',
      },
    },
  },
})
