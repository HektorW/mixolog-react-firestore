import { cva, sva } from '@styled/css'
import { stack } from '@styled/patterns'

export const formField = sva({
  slots: ['container', 'label', 'control', 'error'],

  base: {
    container: {
      ...stack.raw(),
      gap: '1',
    },

    label: {
      textStyle: 'sm',
    },

    control: {},

    error: {
      textStyle: 'sm',
      color: 'red.600',
    },
  },
})

export const fieldset = sva({
  slots: ['container', 'legend'],

  base: {
    container: {
      ...stack.raw(),
    },

    legend: {
      // textStyle: 'md',
      borderColor: 'neutral.500',
      borderBottom: '1px solid',
      width: 'full',
      marginBlockEnd: '4',
    },
  },
})

export const formLayout = cva({
  base: {
    ...stack.raw(),
    gap: '10',
    maxWidth: '60ch',
    marginX: 'auto',
  },
})

export const input = cva({
  base: {
    display: 'block',

    borderColor: 'gray.300',
    borderRadius: 'md',
    borderWidth: '1',

    width: 'full',

    paddingY: '2',
    paddingX: '3',

    backgroundColor: 'white',

    _readOnly: {
      cursor: 'not-allowed',
      backgroundColor: 'gray.100',
    },

    '&:focus': {
      borderColor: 'primary',
      outlineColor: 'primary',
    },
  },
})

export const submit = cva({
  base: {
    textStyle: '2xl',
    borderRadius: 'md',
    paddingY: '2',
    paddingX: '4',
    color: 'white',
    fontWeight: '600',

    backgroundColor: 'primary',
    _disabled: {
      cursor: 'not-allowed',
      backgroundColor: 'gray.400',
    },
    '&:hover, &:focus-visible': {
      backgroundColor: 'primary.hover',
    },
  },

  variants: {
    pending: {
      true: {
        cursor: 'not-allowed',
        backgroundColor: 'gray.400',
      },
    },
  },
})
