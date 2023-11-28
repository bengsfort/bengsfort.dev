/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: ['@bengsfort'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
    ecmaVersion: 20,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          // Index signature
          'signature',

          // Fields
          'public-field',
          'protected-field',
          'private-field',
          'field',
          'constructor',
          'public-method',
          'protected-method',
          'private-method',
          'method',
        ],
      },
    ],
  }
};
