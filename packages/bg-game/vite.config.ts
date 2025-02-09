import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';

const PROJECT_ROOT = dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ command }) => {
  // @todo: should this be done using mode perhaps? That way we can still use
  // 'serve' for library mode as well.
  if (command === 'serve') {
    console.log('Creating serve config for', resolve(PROJECT_ROOT, './dev.html'));
    return {};
  }

  return {
    build: {
      lib: {
        entry: resolve(PROJECT_ROOT, './src/main.ts'),
        formats: ['es', 'cjs'],
      },
    },
  };
});
