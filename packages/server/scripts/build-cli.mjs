/**
 * Usage:
 * Placed in ./scripts/build.mjs
 * node ./scripts/build.mjs [--watch]
 * --watch: Enable watch mode
 */

import {buildUI}  from '@bengsfort.dev/app/scripts/build.mjs';

import {buildApp} from './build.mjs';

// Parse args
const [...args] = process.argv.slice(2);
const isWatchMode = args.includes(`--watch`);

buildApp(isWatchMode);
buildUI(isWatchMode, [`src/bundle/index.html`], `build/bundle`, `tsconfig.ui.json`);
