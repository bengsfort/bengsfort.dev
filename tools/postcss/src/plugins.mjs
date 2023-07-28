import autoprefixer         from 'autoprefixer';
import postcssNested        from 'postcss-nested';
import postcssFunctions     from 'postcss-functions';
import postcssGlobalData    from '@csstools/postcss-global-data';
import postcssCustomMedia   from 'postcss-custom-media';

import * as CustomFunctions from './functions.mjs';

/**
 * Common PostCSS plugins.
 *
 * @param {string[]} globalCssFiles List of files to be referenced in all css modules.
 * @returns {import('postcss').Plugin[]}
 */
export const postcssPlugins = (globalCssFiles = []) => ([
  postcssGlobalData({
    files: globalCssFiles,
  }),
  postcssCustomMedia(),
  postcssFunctions({
    functions: {
      ...CustomFunctions,
    },
  }),
  autoprefixer,
  postcssNested,
]);
