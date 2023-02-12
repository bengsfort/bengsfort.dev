import {App}                           from '@bengsfort.dev/app';
import {render}                        from 'preact-render-to-string';
import {ComponentProps, createElement} from 'preact';

export function renderStatic(
  url: string,
  props: ComponentProps<typeof App> = {target: `prerender default`},
): string {
  return render(createElement(App, {...props}));
}
