import {Route}                       from '@bengsfort.dev/router';
import {BrowserRouter}               from '@bengsfort.dev/router/client';
import {Articles, Portfolio, Resume} from '@bengsfort.dev/app';
import {hydrate}                     from 'preact';

// Enable SSR initial props via the following:

/*
interface SsrWindow extends Window {
  __INITIAL_STATE__?: string;
}

declare const window: SsrWindow;

const _initialProps = JSON.parse(window.__INITIAL_STATE__ ?? `{}`);
*/

hydrate((
  <BrowserRouter>
    <Route path={`/`} isDefault>
      <Portfolio />
    </Route>
    <Route path={`/cv`}>
      <Resume />
    </Route>
    <Route path={`/articles`}>
      <Articles />
    </Route>
    <Route path={`/articles/:id`}>
      <h1>Article!</h1>
    </Route>
    <Route path={`/404`} isError>
      <h1>404</h1>
    </Route>
  </BrowserRouter>
), document.body);
