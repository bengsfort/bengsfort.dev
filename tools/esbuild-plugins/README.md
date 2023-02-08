# @bengsfort.dev/esbuild-plugins

This package contains the custom plugins made for this particular esbuild setup so they can be easily re-used between client and server.

## Plugins

### `buildReporter(buildName: string)`

```js
import {buildReporter} from '@bengsfort.dev/esbuild-plugins';
buildReporter(`Server`)
```

Build Reporter is a simple informative plugin that provides build performance + formatted build errors/warnings information. This is currently used in the main esbuild wrapper.

### `cssModulesPlugin([]: string[])`

```js
import {cssModulesPlugin} from '@bengsfort.dev/esbuild-plugins';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';

cssModulesPlugin([
  autoprefixer,
  postcssNested,
])
```

CSS Modules Plugin is a modified version of [esbuild-css-modules-plugin](https://github.com/indooorsman/esbuild-css-modules-plugin) to allow support for passing postcss plugins into the css module implementation, otherwise we could have css modules but with no postcss plugins. The modifications mostly surround being able to pass in an array of postcss plugins, and making the injected codes both browser-ready and SSR safe.

This is used in both the client build and server build.

### `exposeCssModules()`

The expose CSS modules plugin is not currently implemented, but it will be mostly used in the server build so that any Preact modules loaded from `@bengsfort.dev/app` will have all css module content included on import so that it can be injected into the SSR page that gets sent to the client.
