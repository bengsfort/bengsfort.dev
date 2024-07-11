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

/**
 * @todo: Fix type-checking. I cannot seem to get type checking to work with the newest
 * eslint version and the flat configs + astro; due to specific rules just causing failures.
 *
 * Since I am pressed for time, will leave it for now as the defaults are fine for now;
 * we aren't doing anything super wild.
 */

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...tsEslint.configs.strict,
  pluginPromise.configs['flat/recommended'],
  {
    files: [
      'public/**/*.js',
      'public/**/*.ts',
      'src/**/*.js',
      'src/**/*.ts',
      'src/**/*.astro',
    ],
    rules: {},
  },
  pluginPrettier,
  ...eslintPluginAstro.configs.recommended,
];
