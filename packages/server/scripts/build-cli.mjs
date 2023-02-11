/**
 * Usage:
 * Placed in ./scripts/build.mjs
 * node ./scripts/build.mjs [--watch]
 * --watch: Enable watch mode
 */

import {buildApp} from './build.mjs';

// Parse args
const [...args] = process.argv.slice(2);
const isWatchMode = args.includes(`--watch`);

buildApp(isWatchMode);
