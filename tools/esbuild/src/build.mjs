import esbuild from 'esbuild';

export const build = async (options, {watchMode = false, name = ``}) => {
  const measureStartId = `${name}-start`;
  const measureEndId = `${name}-end`;
  const measureTimingId = `${name}-time`;

  performance.mark(measureStartId);

  const result = await esbuild.build({
    // General
    outdir: `build/`,
    bundle: true,
    minify: !watchMode,
    sourcemap: true,
    assetNames: `[name]`,
    // Package specific
    ...options,
    ...(watchMode && {
      watch: {
        onRebuild(err, result) {
          if (err) {
            console.error(`${name} errored:`, err);
          } else {
            console.log(`${name} Incremental rebuild complete (${result.warnings.length} warnings)`);
          }
        },
      },
    }),
  });
  performance.mark(measureEndId);
  const measurements = performance.measure(
    measureTimingId,
    measureStartId,
    measureEndId);

  if (result.errors.length > 0)
    console.error(
      `There were errors in ${name} during bundling:`,
      result.errors);
  else
    console.log(
      watchMode
        ? `Found 0 errors. Watching for ${name} file changes.`
        : `${name} build complete. (completed after ${measurements.duration.toFixed(2)}ms)`);


  return result;
};
