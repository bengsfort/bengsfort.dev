import {render}                      from 'preact-render-to-string';
import {StaticRouter, Route}         from '@bengsfort.dev/router/server';
import {Articles, Portfolio, Resume} from '@bengsfort.dev/app';

export function renderStatic(
  url: string,
  _props: any,
): string {
  return render(
    <StaticRouter url={url}>
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
    </StaticRouter>,
  );
}
