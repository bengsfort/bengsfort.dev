/* eslint-disable arca/no-default-export */
import {postcssPlugins} from '@bengsfort.dev/postcss';


export default {
  plugins: [
    ...postcssPlugins([
      // This isn't really ideal, and feels kinda gross, but it's better than
      // having to manually copy the file over or have the global css files
      // included in the postcss package, since then it would be outside of
      // the actual 'codebase' where everything else is defined.
      `../app/src/common/style/media-queries.global.css`,
    ]),
  ],
};
