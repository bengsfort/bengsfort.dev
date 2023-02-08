/* eslint-disable @typescript-eslint/naming-convention */

import * as esbuild                            from '@bengsfort.dev/esbuild';
import {html}                                  from '@esbuilder/html';
import {cssModulesPlugin, globalPostcssPlugin} from '@bengsfort.dev/esbuild-plugins';
import {postcssPlugins}                        from '@bengsfort.dev/postcss';
import path                                    from 'node:path';
import {fileURLToPath}                         from 'node:url';

const CURRENT_MODULE_PATH = fileURLToPath(import.meta.url);

export const buildUI = (watchMode, entryPoints, outdir, tsconfigPath = `tsconfig.json`) => {
  return esbuild.build({
    outdir,
    entryPoints,
    tsconfig: tsconfigPath,

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
      html({
        entryNames: `assets/[name]`,
      }),
      cssModulesPlugin([
        ...postcssPlugins,
      ]),
      globalPostcssPlugin([
        ...postcssPlugins,
      ]),
    ],
  }, {watchMode, name: `UI`});
};
