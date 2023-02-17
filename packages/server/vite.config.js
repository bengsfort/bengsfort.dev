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
  build: {
    minify: false,
  },
});