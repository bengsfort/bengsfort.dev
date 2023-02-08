/* eslint-disable arca/no-default-export */

/**
 * This ambient declaration module is where we define all of our
 * custom imports that get bundled via esbuild. For example, if
 * we import a .png it will get transformed into a url by esbuild.
 *
 * We can type this by declaring '*.png' modules as exporting a string:
 *
 * @example
 * declare module '*.png' {
 *  const str: string;
 *  export default str;
 * }
 */

declare module '*.module.css' {
  // Main usage
  const classes: { [key: string]: string };
  export default classes;

  // These get injected by esbuild
  // @see app/scripts/plugins/postcss-modules-plugin.mjs
  // @see server/scripts/plugins/ssr-postcss-modules-plugin.mjs
  export const css: string;
  export const digest: string;
}
