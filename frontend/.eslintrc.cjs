module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: ['./tsconfig.app.json'],
  },
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // Remove unused imports/variables (prefix with _ to intentionally ignore)
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],

    // Collapse multiple blank lines
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],

    // Keep things tight at file end
    'eol-last': ['error', 'always'],

    // Let Prettier handle style details; just avoid conflicts
    'no-trailing-spaces': 'error',
  },
  ignorePatterns: [
    '**/dist/**',
    '**/node_modules/**',
    'vite.config.*',
  ],
};

