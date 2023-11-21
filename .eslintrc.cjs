/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: ['@bengsfort'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
    ecmaVersion: 20,
    sourceType: 'module',
  },
};
