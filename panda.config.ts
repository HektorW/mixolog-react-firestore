import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{ts,tsx}'],

  // Files to exclude
  exclude: [],

  theme: {
    extend: {
      textStyles: {},

      tokens: {
        gradients: {
          yellowGreen: {
            value:
              'linear-gradient(98.4deg, rgb(254 251 191) 16.6%, rgb(187 240 211) 81.8%)',
          },
        },
      },

      semanticTokens: {
        colors: {
          primary: {
            DEFAULT: { value: 'black' },
            hover: { value: 'black' },
          },
          link: {
            DEFAULT: { value: 'black' },
            hover: { value: 'black' },
          },
        },
        spacing: {
          'layout-page-gutter': { value: '1rem' },
          'layout-page-block': { value: '1rem' },
        },
      },

      keyframes: {
        shimmer: {
          from: { maskPosition: '150%' },
          to: { maskPosition: '-50%' },
        },
      },

      layerStyles: {
        card: {
          DEFAULT: {
            value: {
              background: 'white',
              border: '1px solid',
              borderColor: 'gray.200',
              borderRadius: 'md',
              boxShadow: 'sm',
            },
          },
          elevated: {
            value: {
              background: 'white',
              border: 'none',
              borderRadius: 'lg',
              boxShadow: 'lg',
            },
          },
          outlined: {
            value: {
              background: 'transparent',
              border: '2px solid',
              borderColor: 'gray.300',
              borderRadius: 'md',
              boxShadow: 'none',
            },
          },
        },
      },
    },
  },

  jsxFramework: 'react',

  // The output directory for your css system
  outdir: 'styled-system',
})
