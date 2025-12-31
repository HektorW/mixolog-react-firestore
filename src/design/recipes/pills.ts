import { cva } from '@styled/css'

export const pillList = cva({
  base: {
    '--_overflow-margin': 'var(--overflow-margin, 0px)',

    display: 'flex',
    flexWrap: 'nowrap',
    gap: '2',
    overflowX: 'auto',

    marginInline: 'calc(var(--_overflow-margin) * -1)',
    paddingInline: 'var(--_overflow-margin)',

    paddingBlockEnd: '0.75rem',
    scrollbarWidth: 'thin',
  },
})

export const pill = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2',

    paddingBlock: '1',
    paddingInline: '3',

    borderRadius: 'full',
    border: '2px solid',
    // boxShadow: 'sm',
    textStyle: 'sm',
    whiteSpace: 'nowrap',

    userSelect: 'none',
    cursor: 'pointer',

    transitionProperty: 'colors',
    transitionDuration: 'fast',
  },

  variants: {
    selected: {
      false: {
        // backgroundColor: 'gray.100',
        borderColor: 'gray.200',
        color: 'gray.800',

        _hover: {
          backgroundColor: 'gray.200',
        },
      },

      true: {
        backgroundColor: 'black',
        borderColor: 'black',
        color: 'white',

        _hover: {
          backgroundColor: 'gray.900',
        },
      },
    },

    variant: {
      outline: {
        backgroundColor: 'transparent',
        borderColor: 'gray.800',
        borderStyle: 'dashed',
        color: 'gray.800',

        _hover: {
          backgroundColor: 'gray.100',
        },
      },
    },
  },

  defaultVariants: {
    selected: false,
  },
})
