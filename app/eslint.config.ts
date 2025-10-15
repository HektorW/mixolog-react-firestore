import js from '@eslint/js'
import pluginRouter from '@tanstack/eslint-plugin-router'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js, 'react-hooks': reactHooks },
    extends: ['js/recommended', 'react-hooks/recommended'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  pluginRouter.configs['flat/recommended'],
])
