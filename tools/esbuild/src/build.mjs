import * as esbuild    from 'esbuild';

import {buildReporter} from './plugins/reporter.mjs';

export const build = async (options, {watchMode = false, name = ``}) => {
  /** @type {import('esbuild').BuildOptions} */
  const opts = {
    // General
    outdir: `build/`,
    bundle: true,
    minify: !watchMode,
    sourcemap: true,
    assetNames: `[name]`,

    // Package specific
    ...options,
    plugins: [
      buildReporter(name),
      ...options.plugins,
    ],
  };

  if (!watchMode) {
    await esbuild.build(opts);
    return;
  }

  const ctx = await esbuild.context({
    ...opts,
  });

  await ctx.watch();
  console.log(`Waiting for ${name} changes...`);
};
