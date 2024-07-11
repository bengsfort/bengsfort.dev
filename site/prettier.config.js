/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  singleQuote: true,
  trailingComma: 'all',
  endOfLine: 'lf',
  overrides: [],
  printWidth: 90,
  singleAttributePerLine: true,
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};

export default config;
