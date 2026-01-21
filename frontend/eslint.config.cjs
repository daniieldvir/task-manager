const js = require('@eslint/js');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.app.json'],
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,

      // Remove unused imports/variables (prefix with _ to intentionally ignore)
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // Collapse multiple blank lines
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],

      // Keep things tight at file end
      'eol-last': ['error', 'always'],

      // Avoid stray spaces; Prettier will handle exact layout
      'no-trailing-spaces': 'error',
    },
  },
  {
    ignores: ['**/dist/**', '**/node_modules/**', 'vite.config.*'],
  },
];

