import * as esbuild from 'esbuild';

/** @returns {import('esbuild').Plugin} */
export const buildReporter = (
  /** @type {string} */
  buildName,
) => {
  return {
    name: `Reporter`,
    setup: build => {
      const measureStartId = `${buildName}-start`;
      const measureEndId = `${buildName}-end`;
      const measureId = `${buildName}-time`;

      build.onStart(() => {
        console.log(`[${buildName}] Build started.`);
        performance.mark(measureStartId);
      });

      build.onEnd(async ({errors, warnings}) => {
        performance.mark(measureEndId);
        const measurements = performance.measure(
          measureId,
          measureStartId,
          measureEndId);

        if (errors.length > 0) {
          console.log(`[${buildName}] Build failed after ${measurements.duration.toFixed(2)}ms (${errors.length} errors, ${warnings.length} warnings)`);
          const errorMessages = await esbuild.formatMessages(errors, {
            kind: `error`,
            color: true,
          });
          console.log(errorMessages.join(`\n`));
        } else {
          console.log(`[${buildName}] Build completed after ${measurements.duration.toFixed(2)}ms (${warnings.length} warnings)`);
        }

        if (warnings.length > 0) {
          const warningMessages = await esbuild.formatMessages(warnings, {
            kind: `warning`,
            color: true,
          });
          console.log(warningMessages.join(`\n`));
        }
      });
    },
  };
};
