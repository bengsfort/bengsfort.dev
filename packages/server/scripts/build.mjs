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
    plugins: [
      // @todo: Custom plugin that will transform any import from @bengsfort.dev/app
      // into an object containing the component, but also all of the css modules
      // within the tree so that we can inject them into the DOM before sending SSR'd
      // markup back to the browser.
    ],
  }, {watchMode, name: `Server`});
};
