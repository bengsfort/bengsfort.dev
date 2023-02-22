/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable arca/no-default-export */

import {defineConfig} from 'vite';
import preact         from '@preact/preset-vite';

export default defineConfig({
  plugins: [
    preact(),
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
