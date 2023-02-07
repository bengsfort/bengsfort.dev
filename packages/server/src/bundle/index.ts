import {App}                   from '@bengsfort.dev/app';
import {createElement, render} from 'preact';


interface SsrWindow extends Window {
  __INITIAL_STATE__?: string;
}

declare const window: SsrWindow;

const initialProps = JSON.parse(window.__INITIAL_STATE__ ?? `{}`);

// @note: Currently we are bound to using `render` because the markup sent by
// the server does not include the attached classes. Getting this to work is
// gonna likely require doing some sort of witchcraft and wizardry with how
// esbuild and postcss are getting injected into the resulting bundle, so we
// can have the server generate the styles as well...
// @todo: See how we can re-use the hashing/head injection from buildCssModulesJS
// inside of postcss-modules-plugin; so we can generate the necessary styles and
// inject them into the SSR'd template (or even create css bundles?)
render(createElement(App, initialProps), document.body);
