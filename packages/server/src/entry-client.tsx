import {BrowserRouter} from '@bengsfort.dev/router/client';
import {App}           from '@bengsfort.dev/app';
import {hydrate}       from 'preact';

// Enable SSR initial props via the following:

/*
interface SsrWindow extends Window {
  __INITIAL_STATE__?: string;
}

declare const window: SsrWindow;

const _initialProps = JSON.parse(window.__INITIAL_STATE__ ?? `{}`);
*/

hydrate((
  <App routerComponent={BrowserRouter} initialRoute={window.location.pathname} />
), document.body);
