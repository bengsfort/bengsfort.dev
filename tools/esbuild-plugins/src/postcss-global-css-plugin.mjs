import fs      from 'fs-extra';
import postcss from 'postcss';
import util    from 'node:util';
import path    from 'node:path';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const ensureDir = util.promisify(fs.ensureDir);

/** @return {import('esbuild').Plugin} */
export const globalPostcssPlugin = (
  /** @type {import('postcss').Plugin[]} */
  plugins = [],
) => ({
  name: `global-postcss`,
  setup: async build => {
    build.onResolve(
      {filter: /\.global?|variables?\.css$/},
      async args => {
        const {outdir, entryNames} = build.initialOptions;

        // Get the file to read
        const sourceFullPath = path.resolve(args.resolveDir, args.path);

        // Get the dist file
        const pathName = args.path.replace(`./`, ``).replaceAll(`/`, `_`);
        const distFilePath = path.resolve(outdir, entryNames.replace(`[name]`, pathName));
        await ensureDir(outdir);
        await ensureDir(path.dirname(distFilePath));

        // Get the css
        const css = await readFile(sourceFullPath);
        const result = await postcss(plugins).process(css, {
          from: sourceFullPath,
          to: distFilePath,
        });

        // Write result file
        await writeFile(distFilePath, result.css);

        return {
          path: distFilePath,
          watchFiles: [sourceFullPath],
        };
      },
    );
  },
});
