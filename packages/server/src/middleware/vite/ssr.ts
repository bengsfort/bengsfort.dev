import {Express}                       from 'express';

import {ssrDevHandler, ssrProdHandler} from './handlers.js';

const INITIAL_STATE_TAG = `<!-- @__INITIAL_STATE__-->`;
const SSR_RENDER_TAG = `<!-- @__SSR_RENDER__ -->`;

interface ViteSsrOpts {
  app: Express;
  viteRoot?: string;
  isProd?: boolean;
  hmrPort?: number;
}
export async function viteSsr({
  app,
  viteRoot = process.cwd(),
  isProd = process.env.NODE_ENV === `production`,
  hmrPort = 5173,
}: ViteSsrOpts) {
  console.log(`Initializing vite ssr with opts:`, {viteRoot, isProd, hmrPort});
  const handler = await (isProd ? ssrProdHandler() : ssrDevHandler(viteRoot, hmrPort));

  // Attach required middlewares to the app.
  await handler.attachMiddleware(app);

  // Set up a catch-all so that any non-explicit routes get handled via vite/client.
  // This enables us to set up 404 pages client side, have client side routing, etc.
  app.use(`*`, async (req, res) => {
    try {
      const url = req.originalUrl;
      const [template, render] = await handler.prepareRenderer(url);

      // @todo: Handle 301 redirects, etc..
      const appProps = {target: `ssr!`};

      const appHtml = render(url, appProps);
      const initialState = JSON.stringify(appProps);

      const html = template
        .replace(INITIAL_STATE_TAG, `<script>window.__INITIAL_STATE__ = '${initialState}';</script>`)
        .replace(SSR_RENDER_TAG, appHtml);

      res.status(200)
        // eslint-disable-next-line @typescript-eslint/naming-convention
        .set({'Content-Type': `text/html`})
        .end(html);
    } catch (e) {
      const err = e as Error;
      handler.handleErrors?.(err);
      console.log(err.stack);
      res.status(500).end(err.stack);
    }
  });
}
