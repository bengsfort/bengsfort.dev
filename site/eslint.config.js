import eslintPluginAstro from 'eslint-plugin-astro';
import tsEslint from 'typescript-eslint';

import pluginPromise from 'eslint-plugin-promise';
import pluginPrettier from 'eslint-plugin-prettier/recommended';

/**
 * @todo: Add missing plugins once they get better ESLint v9 support.
 * Some of these do have work-arounds, but I have not had the time to try them yet.
 * 
 * - eslint-plugin-import: https://github.com/import-js/eslint-plugin-import/issues/2948
 */

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...tsEslint.configs.strict,
  pluginPromise.configs['flat/recommended'],
  {
    files: [
      "public/**/*.js",
      "public/**/*.ts",
      "src/**/*.js",
      "src/**/*.ts",
      "src/**/*.astro",
    ],
    rules: {
      
    },
    // languageOptions: {
    //   parserOptions: {
    //     project: './tsconfig.json',
    //     tsconfigRootDir: import.meta.dirname,
    //   },
    // },
  },
  pluginPrettier,
  ...eslintPluginAstro.configs.recommended,
];

