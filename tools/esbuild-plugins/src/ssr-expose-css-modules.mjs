/**
 * @todo: This plugin will traverse all imported css modules within a tree
 * and return them all with the module, that way we can pre-render css module
 * css code into the SSR-rendered page.
 */


/** @returns {import('esbuild').Plugin} */
export const exposeCssModules = () => {
  return {
    name: `expose-css-modules`,
    setup(build) {
      build.onResolve(
        {filter: /^@bengsfort\.dev/},
        args => {
          // @todo
        },
      );
    },
  };
};
