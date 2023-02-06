/* eslint-disable @typescript-eslint/naming-convention */

import * as esbuild       from '@bengsfort.dev/esbuild';

import {cssModulesPlugin} from './plugins/postcss-modules-plugin.mjs';

import path               from 'node:path';
import {fileURLToPath}    from 'node:url';

const CURRENT_MODULE_PATH = fileURLToPath(import.meta.url);

export const buildUI = isWatch => {
  return esbuild.build({
    outdir: `build/`,
    entryPoints: [
      `./src/index.ts`,
    ],

    // Browser settings
    format: `iife`,
    target: [`chrome58`],
    platform: `browser`,

    // Shims
    inject: [
      path.resolve(CURRENT_MODULE_PATH, `../shims/preact-shim.mjs`),
    ],

    // Preact support
    jsx: `transform`,
    jsxFactory: `h`,
    jsxFragment: `Fragment`,

    // File handling
    // @todo: Revisit after fonts are in place
    loader: {
      '.ttf': `file`,
      '.woff': `file`,
      '.woff2': `file`,
      '.png': `file`,
      '.jpg': `file`,
      '.gif': `file`,
    },

    // Plugins
    plugins: [
      cssModulesPlugin([]),
    ],
  }, {isWatch, name: `UI`});
};

/**
 * Usage:
 * Placed in ./scripts/build.mjs
 * node ./scripts/build.mjs [--watch]
 * --watch: Enable watch mode
 */

// Parse args
const [...args] = process.argv.slice(2);
const isWatchMode = args.includes(`--watch`);

buildUI(isWatchMode);
