/* eslint-disable @typescript-eslint/naming-convention */

import * as esbuild from '@bengsfort.dev/esbuild';

export const buildApp = watchMode => {
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
  }, {watchMode, name: `Server`});
};
