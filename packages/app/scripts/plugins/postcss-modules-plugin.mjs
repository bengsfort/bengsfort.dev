/**
 * Modified from https://github.com/indooorsman/esbuild-css-modules-plugin
 * This adds support to provide other postcss plugins to postcss.
 *
 * Esbuild has plans to add css module support https://github.com/evanw/esbuild/issues/20,
 * once that lands this plugin is not needed anymore.
 */
import crypto     from 'node:crypto';
import fs         from 'fs-extra';
import path       from 'node:path';
import postcss    from 'postcss';
import cssModules from 'postcss-modules';
import tmp        from 'tmp';
import util       from 'node:util';

const hash = crypto.createHash(`sha256`);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const ensureDir = util.promisify(fs.ensureDir);
const pluginNamespace = `esbuild-postcss-modules-namespace`;

const buildCssModulesJS = async (cssFullPath, plugins = []) => {
  const css = await readFile(cssFullPath);

  let cssModulesJSON = {};
  const result = await postcss([
    ...plugins,
    cssModules({
      localsConvention: `camelCaseOnly`,
      getJSON(_, json) {
        cssModulesJSON = {...json};
        return cssModulesJSON;
      },
    }),
  ]).process(css, {
    from: undefined,
    map: false,
  });

  const classNames = JSON.stringify(cssModulesJSON);
  hash.update(cssFullPath);
  const digest = hash.copy().digest(`hex`);

  const injectedCode =  `
    (function() {
      if (!document.getElementById(digest)) {
        var el = document.createElement('style');
        el.id = digest;
        el.textContent = css;
        document.head.appendChild(el);
      }
    })();`;

  const jsContent = `
    const digest = '${digest}';
    const css = \`${result.css}\`;
    ${injectedCode}
    export default ${classNames};
    export { css, digest };
  `;

  return {
    jsContent,
    cssContent: result.css,
  };
};

const onResolveFactory = (build, plugins) => async args => {
  const {outdir, bundle} = build.initialOptions;
  const rootDir = process.cwd();
  const tmpDirPath = tmp.dirSync().name;
  const sourceFullPath = path.resolve(args.resolveDir, args.path);
  const sourceExt = path.extname(sourceFullPath);
  const sourceBaseName = path.basename(sourceFullPath, sourceExt);
  const sourceDir = path.dirname(sourceFullPath);
  const sourceRelDir = path.relative(path.dirname(rootDir), sourceDir);
  const tmpDir = path.resolve(tmpDirPath, sourceRelDir);
  await ensureDir(tmpDir);
  const tmpFilePath = path.resolve(tmpDir, `${sourceBaseName}.css`);

  const {jsContent} = await buildCssModulesJS(sourceFullPath, plugins);

  await writeFile(`${tmpFilePath}.js`, jsContent, {encoding: `utf-8`});

  if (outdir && !bundle) {
    const isOutdirAbsolute = path.isAbsolute(outdir);
    const absoluteOutdir = isOutdirAbsolute ? outdir : path.resolve(args.resolveDir, outdir);
    const isEntryAbsolute = path.isAbsolute(args.path);
    const entryRelDir = isEntryAbsolute
      ? path.dirname(path.relative(args.resolveDir, args.path))
      : path.dirname(args.path);
    const targetSubpath =
      absoluteOutdir.indexOf(entryRelDir) === -1
        ? path.join(entryRelDir, `${sourceBaseName}.css.js`)
        : `${sourceBaseName}.css.js`;
    const target = path.resolve(absoluteOutdir, targetSubpath);
    await ensureDir(path.dirname(target));
    fs.copyFileSync(`${tmpFilePath}.js`, target);
  }
  if (!bundle)
    return {path: sourceFullPath, namespace: `file`};

  return {
    path: `${tmpFilePath}.js`,
    namespace: pluginNamespace,
    pluginData: {
      content: jsContent,
      resolveArgs: {
        path: args.path,
        fullPath: sourceFullPath,
        importer: args.importer,
        namespace: args.namespace,
        resolveDir: args.resolveDir,
        kind: args.kind,
      },
    },
  };
};

const onLoadFactory = () => args => {
  const {fullPath} = args.pluginData.resolveArgs;
  return {contents: args.pluginData.content, loader: `js`, watchFiles: [fullPath]};
};


export const cssModulesPlugin = (plugins = []) => ({
  name: `postcss-modules`,
  setup: async build => {
    build.onResolve(
      {filter: /\.modules?\.css$/, namespace: `file`},
      onResolveFactory(build, plugins),
    );

    build.onLoad(
      {filter: /\.modules?\.css\.js$/, namespace: pluginNamespace},
      onLoadFactory(build),
    );
  },
});