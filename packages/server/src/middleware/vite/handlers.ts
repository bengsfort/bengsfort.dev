import {readFile}                         from 'node:fs/promises';
import {Express, static as ExpressStatic} from 'express';

import {resolve}                          from '../../utils/paths.js';
// We only import the type staticly so we can type our interface.
import type {renderStatic}                from '../../entry-server.js';

type SsrRenderFn = typeof renderStatic;


const BUILD_HTML_PATH = resolve(`./client/index.html`);
const BUILD_ENTRY_PATH = resolve(`./server/entry-server.js`);
const BUILD_ASSETS_PATH = resolve(`./client/assets`);
const DEV_HTML_PATH = resolve(`../index.html`);
const DEV_ENTRY_PATH = `./src/entry-server.tsx`;

interface SsrHandler {
  attachMiddleware(app: Express): void | Promise<void>;
  prepareRenderer(url: string): Promise<[template: string, renderFn: SsrRenderFn]>;
  handleErrors?(error: Error): void;
}

export async function ssrProdHandler(): Promise<SsrHandler> {
  const cachedIndex = await readFile(BUILD_HTML_PATH, `utf-8`);

  // This is the built vite bundle. It's marked as external as managing this in
  // esbuild is quite a chore/time consuming, and we can take advantage of vite by just letting
  // esbuild take care of the express server sans preact/postcss.
  const cachedRenderFn = (await import(BUILD_ENTRY_PATH)).renderStatic as SsrRenderFn;

  return {
    async attachMiddleware(app) {
      app.use((await import(`compression`)).default());
      app.use(`/assets`, ExpressStatic(BUILD_ASSETS_PATH, {
        index: false,
      }));
    },
    prepareRenderer() {
      const template = cachedIndex;
      const renderFn = cachedRenderFn;
      return Promise.resolve([template, renderFn]);
    },
  };
}

export async function ssrDevHandler(root: string, hmrPort: number): Promise<SsrHandler> {
  console.log(`Init with targets:\n- DEV_HTML_PATH = ${DEV_HTML_PATH}\n - DEV_ENTRY_PATH = ${DEV_ENTRY_PATH}`);

  const viteDevServer = await (await import(`vite`)).createServer({
    root,
    logLevel: `info`,
    server: {
      middlewareMode: true,
      hmr: {
        port: hmrPort,
      },
    },
    appType: `custom`,
  });

  return {
    attachMiddleware(app) {
      app.use(viteDevServer.middlewares);
    },
    async prepareRenderer(url) {
      console.log(`Preparing renderer for ${url}`);
      // We always want to use a fresh template in dev
      const rawTemplate = await readFile(DEV_HTML_PATH, `utf-8`);
      const template = await viteDevServer.transformIndexHtml(url, rawTemplate);
      const render = (await viteDevServer.ssrLoadModule(DEV_ENTRY_PATH)).renderStatic as SsrRenderFn;
      return [template, render];
    },
    handleErrors(error) {
      viteDevServer.ssrFixStacktrace(error);
    },
  };
}
