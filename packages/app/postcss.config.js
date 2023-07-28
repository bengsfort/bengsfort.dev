/* eslint-disable arca/no-default-export */
import {postcssPlugins} from '@bengsfort.dev/postcss';

export default {
  plugins: [
    ...postcssPlugins([
      './src/common/style/media-queries.global.css',
    ]),
  ],
};
