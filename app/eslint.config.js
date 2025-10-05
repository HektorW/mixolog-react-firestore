// ESLint Flat Config
// Reference: https://eslint.org/docs/latest/use/configure/configuration-files-new

import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  // Ignore patterns
  {
    ignores: ['dist', 'node_modules']
  },
  {
    files: ['**/*.{js,cjs,mjs,ts,tsx,jsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react-hooks': reactHooks
    },
    // Merge in recommended rule sets then apply project overrides
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      // React Hooks recommended subset
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // Project customizations
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
    }
  }
];
