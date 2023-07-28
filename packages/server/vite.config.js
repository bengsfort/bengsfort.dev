/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable arca/no-default-export */

import {defineConfig} from 'vite';
import preact         from '@preact/preset-vite';
import tsconfigPaths  from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    preact(),
    tsconfigPaths(),
  ],
  css: {
    modules: {
      localsConvention: `camelCase`,
    },
  },
  resolve: {
    alias: {
      react: `preact/compat`,
      "react-dom": `preact/compat`,
      "react/jsx-runtime": `preact/jsx-runtime`,
    },
  },
  build: {
    minify: false,
  },
});
