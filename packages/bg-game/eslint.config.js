import eslintPluginAstro from 'eslint-plugin-astro';
import makeConfig from '@bengsfort/eslint-config-flat';

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
 *
 * Abandoned rules due to this:
 *
 * - @typescript-eslint/naming-convention (noooooo)
 * - @typescript-eslint/consistent-type-exports
 */

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...makeConfig(import.meta.dirname, './tsconfig.json'),
  ...eslintPluginAstro.configs.recommended,
  {
    ignores: [
      '*.config.{js,cjs,ts}',
    ],
  }
];
