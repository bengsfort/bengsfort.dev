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
 *
 * Abandoned rules due to this:
 *
 * - @typescript-eslint/naming-convention (noooooo)
 * - @typescript-eslint/consistent-type-exports
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
    ignores: ['*.config.cjs', '.astro', '.astro/**/*'],
    rules: {
      // General
      // Code Cleanliness
      curly: ['error', 'all'],
      semi: ['error', 'always'],
      eqeqeq: ['error', 'always'],
      'max-len': 'off',
      'no-console': 'warn', // Warning to encourage using scoped loggers.
      'no-plusplus': 'off',
      'no-unused-vars': 'off', // Disabled as it is handled by typescript-eslint
      'no-underscore-dangle': 'off',
      'class-methods-use-this': 'off', // Not a fan of forcing all methods to static.
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: true,
        },
      ],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'block-like', next: 'block-like' },
      ],
      // Potential bugs
      'no-prototype-builtins': 'off',
      'constructor-super': 'error',
      'no-this-before-super': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['src/*'],
              message: 'You should import using alias or with relative path',
            },
          ],
        },
      ],
      'no-extra-boolean-cast': [
        'error',
        {
          enforceForLogicalOperands: true,
        },
      ],

      // Typescript
      // Code cleanliness
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'array',
          readonly: 'array',
        },
      ],
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'local',
          args: 'after-used',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: false,
        },
      ],
      // Potential bugs
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'off',
          },
        },
      ],
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
            'private-method',
            'protected-method',
            'public-method',
            'method',
          ],
        },
      ],
      '@typescript-eslint/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: ['interface'],
        },
        {
          blankLine: 'always',
          prev: ['interface'],
          next: '*',
        },
      ],
    },
  },
  pluginPrettier,
  ...eslintPluginAstro.configs.recommended,
  // Note: Due to the layering nature of the new eslint config, the generated astro typedefs
  // cause lint errors. Ignoring them from anywhere else causes editor issues, so we are left
  // with targeting them directly here and overriding problematic rules.
  //
  // Not ideal, but it is what it is.
  {
    files: ['.astro/**/*'],
    rules: {
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/unified-signatures': 'off',
    },
  },
];
