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

declare module '*.module.css';
