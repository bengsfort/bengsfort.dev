import express                                         from 'express';
import {clearSsrCache, getCacheSize, renderPreactPage} from 'ssr/renderPreact';
import {App}                                           from '@bengsfort.dev/app';

const app = express();

const TEMPLATE_DIR = `${__dirname}/bundle`;

app.use(`/assets`, express.static(`${TEMPLATE_DIR}/assets`));
app.get(`/`, async (_, res) => {
  const templatePath = `${TEMPLATE_DIR}/index.html`;
  const [markup, err] = await renderPreactPage(templatePath, App, {target: `ssr`});

  if (err) {
    console.error(`Error:`, err);
    return res.send(`ERROR: ${err}`);
  }

  res.send(markup);
});

app.get(`/ssr-cache-size`, (_, res) => {
  const size = getCacheSize();
  res.send(`Cache size: ${size}`);
});

app.get(`/ssr-cache-clear`, (_, res) => {
  clearSsrCache();
  res.send(`Cache cleared`);
});

app.listen(3000, () => {
  console.log(`Listening on port 3000!`);
});
