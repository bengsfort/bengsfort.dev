import path    from 'node:path';
import fs      from 'node:fs/promises';
import express from 'express';

const app = express();

const TEMPLATE_DIR = `./build/ui`;

app.use(`/bundle`, express.static(path.join(TEMPLATE_DIR, `bundle`)));
app.get(`/`, async (_, res) => {
  const templatePath = path.join(TEMPLATE_DIR, `index.html`);
  const template = await fs.readFile(templatePath);
  res.send(template.toString(`utf-8`));
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
