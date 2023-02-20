import express   from 'express';

import {viteSsr} from './middleware/vite/ssr.js';

async function main(port: number) {
  const app = express();

  await viteSsr({
    app,
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
  });
}

main(3000);
