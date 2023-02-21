import {render}       from 'preact-render-to-string';
import {StaticRouter} from '@bengsfort.dev/router/server';
import {App}          from '@bengsfort.dev/app';

export function renderStatic(
  url: string,
  _props: any,
): string {
  return render(
    <App routerComponent={StaticRouter} initialRoute={url} />,
  );
}
