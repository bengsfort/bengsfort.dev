import {App}                    from '@bengsfort.dev/app';
import {createElement, hydrate} from 'preact';


interface SsrWindow extends Window {
  __INITIAL_STATE__?: string;
}

declare const window: SsrWindow;

const initialProps = JSON.parse(window.__INITIAL_STATE__ ?? `{}`);

hydrate(createElement(App, initialProps), document.body);
