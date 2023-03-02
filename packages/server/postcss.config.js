/* eslint-disable arca/no-default-export */
import {postcssPlugins} from '@bengsfort.dev/postcss';

console.log(`Using plugins`, postcssPlugins);

export default {
  plugins: [
    ...postcssPlugins,
  ],
};
