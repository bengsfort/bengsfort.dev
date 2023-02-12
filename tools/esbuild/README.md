# @bengsfort.dev/esbuild

This package contains a boilerplate esbuild build script that allows for creating simple bundling scripts via esbuild with support for watching and measuring build times. Think of it as a nice lil wrapper for the esbuild bundler that makes it really easy for us to utilize [yarn workspace tools](https://yarnpkg.com/cli/workspaces/foreach) to have two esbuild watch/build bundles happening in parallel if we need, which is not quite as relevant in a small project like this, but still a nice to have. :)

## Why esbuild?

- [It's way fast.](https://esbuild.github.io/faq/#why-is-esbuild-fast)
- [It's really simple.](https://esbuild.github.io/getting-started/)
- [It's super easy to write custom plugins.](https://esbuild.github.io/plugins/#using-plugins)

## How to use

Import the script and pass normal esbuild options to it. Additionally, you give the build a name and whether or not to run the build in watch mode, then let it do it's thing. You can use the below code as a template for a node build script.

```js
import * as esbuild from '@bengsfort.dev/esbuild';

export const buildApp = isWatch => {
  return esbuild.build({
    outdir: `dist`,
    entryPoints: [
      `./src/index.ts`,
    ],
    external: [],
  }, {isWatch, name: `App`});
};

export const buildUI = isWatch => {
  return esbuild.build({
    outdir: `dist/ui`,
    entryPoints: [
      `./src/ui/index.html`,
    ],
    assetNames: `[name]`,
  }, {isWatch, name: `UI`});
};

/**
 * Usage:
 * Placed in ./scripts/build.mjs
 * node ./scripts/build.mjs [--watch]
 * --watch: Enable watch mode
 */

// Parse args
const [...args] = process.argv.slice(2);
const isWatchMode = args.includes(`--watch`);

buildApp(isWatchMode);
buildUI(isWatchMode);
```

## Note

While this project no longer has two separate esbuild builds (client/server), I have opted to keep this boilerplate package so that if the need to extend esbuild with custom plugins arises, that can be added in isolation and without dirtying up the main server package. 
