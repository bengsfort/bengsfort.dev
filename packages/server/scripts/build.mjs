/* eslint-disable @typescript-eslint/naming-convention */

import * as esbuild from '@bengsfort.dev/esbuild';

export const buildApp = isWatch => {
  return esbuild.build({
    outdir: `build/`,
    entryPoints: [
      `./src/index.ts`,
    ],

    // Node settings
    format: `cjs`,
    target: `node16`,
    platform: `node`,

    // File handling
    loader: {
      '.html': `file`,
    },
    external: [],

    // Plugins
    plugins: [],
  }, {isWatch, name: `Server`});
};

export const buildUI = isWatch => {
  return esbuild.build({
    outdir: `build/ui`,
    entryPoints: [
      `./src/ui/index.html`,
    ],

    // Browser settings
    format: `iife`,
    target: [`chrome58`],
    platform: `browser`,

    // File handling
    loader: {
      '.html': `file`,
    },
    external: [`@bengsfort.dev/app`],

    // Plugins
    plugins: [],
  }, {isWatch, name: `Server UI`});
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

buildApp(isWatchMode);
buildUI(isWatchMode);
