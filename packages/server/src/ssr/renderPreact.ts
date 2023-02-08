import {render}                                           from 'preact-render-to-string';
import {createElement, ComponentProps, FunctionComponent} from 'preact';
import {readFile}                                         from 'node:fs/promises';

const INITIAL_STATE_TAG = `<!-- @__INITIAL_STATE__-->`;
const SSR_RENDER_TAG = `<!-- @__SSR_RENDER__ -->`;

const templateCache = new Map<string, string>();

type SsrResult = [markup: string, err: string | null];
export const renderPreactPage = async <Component extends FunctionComponent>(templatePath: string, component: Component, props: ComponentProps<Component> | null = null): Promise<SsrResult> => {
  try {
    // Used cached version if available.
    let template = templateCache.get(templatePath);
    if (!template) {
      template = await readFile(templatePath, {encoding: `utf-8`});
      templateCache.set(templatePath, template);
    }

    // Render the element to a string
    const renderedStr = render(createElement(component, props));

    // Inject the initial state and rendered element into our template
    const markup = template
      .replace(
        INITIAL_STATE_TAG,
        props ? `<script>window.__INITIAL_STATE__ = '${JSON.stringify(props)}';</script>` : ``)
      .replace(SSR_RENDER_TAG, renderedStr);

    return [markup, null];
  } catch (e) {
    console.error(`Error rendering preact page:`, e);
    return [``, `${e}`];
  }
};

export const getCacheSize = () => templateCache.size;
export const clearSsrCache = () => {
  templateCache.clear();
};
