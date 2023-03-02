import autoprefixer         from 'autoprefixer';
import postcssNested        from 'postcss-nested';
import postcssFunctions     from 'postcss-functions';

import * as CustomFunctions from './functions.mjs';

console.log(`Using custom functions`, CustomFunctions);

export const postcssPlugins = [
  postcssFunctions({
    functions: {
      ...CustomFunctions,
    },
  }),
  autoprefixer,
  postcssNested,
];
