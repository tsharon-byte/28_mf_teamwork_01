module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    'no-empty': 'off',
    'import/no-cycle': 'error',
    '@typescript-eslint/no-var-requires': 'off'
  },
}
