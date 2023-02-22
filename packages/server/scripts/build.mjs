/* eslint-disable @typescript-eslint/naming-convention */
import {copy}       from 'esbuild-plugin-copy';
import * as esbuild from '@bengsfort.dev/esbuild';

export const buildApp = watchMode => {
  return esbuild.build({
    outdir: `build/`,
    entryPoints: [
      `./src/server.ts`,
    ],

    // Node settings
    format: `esm`,
    target: `node16`,
    platform: `node`,
    packages: `external`,

    // File handling
    loader: {
      '.html': `file`,
    },
    external: [
      `./server/entry-server.js`,
    ],

    // Plugins
    plugins: [
      copy({
        assets: [
          {
            from: [`./src/public/**/*`],
            to: [`./public`], // uses the dist directory as a base.
          },
        ],
      }),
    ],
  }, {watchMode, name: `Server`});
};
