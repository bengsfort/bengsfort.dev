import express   from 'express';

import {viteSsr} from './middleware/vite/ssr.js';
import {resolve} from './utils/paths.js';

async function main(port: number) {
  const app = express();

  // Setup middleware.
  app.use(express.static(resolve(`./public`)));

  // This needs to be last.
  await viteSsr({
    app,
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
  });
}

main(3000);
