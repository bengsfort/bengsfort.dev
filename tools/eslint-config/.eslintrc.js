/* eslint-disable @typescript-eslint/naming-convention */

module.exports = {
  root: true,

  extends: [
    require.resolve(`@yarnpkg/eslint-config`),
    require.resolve(`@yarnpkg/eslint-config/react`),
  ],

  parser: `@typescript-eslint/parser`,
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: `module`,
    'import/parsers': {
      '@typescript-eslint/parser': [`.ts`],
    },
  },

  plugins: [`import`],

  rules: {
    'consistent-return': 0,
    'arca/import-ordering': 0,
  },
};
