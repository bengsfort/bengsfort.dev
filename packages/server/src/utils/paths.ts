import * as url from 'node:url';
import path     from 'node:path';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export const resolve = (targetPath: string) => path.resolve(__dirname, targetPath);
