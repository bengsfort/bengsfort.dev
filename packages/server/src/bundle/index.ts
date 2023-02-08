import {App}                    from '@bengsfort.dev/app';
import {createElement, hydrate} from 'preact';


interface SsrWindow extends Window {
  __INITIAL_STATE__?: string;
}

declare const window: SsrWindow;

const initialProps = JSON.parse(window.__INITIAL_STATE__ ?? `{}`);

// @todo: This will flash unstyled briefly due to the server not being
// able to generate the necessary style tags into the template. We have
// fixed the issue of not being able to have styles work at all with SSR,
// but we need to create a plugin that treats @bengsfort.dev/app imports
// specially, and collects all CSS imports and exposes them via the component
// import, that way we can inject them on the server and not have flashes.
hydrate(createElement(App, initialProps), document.body);
