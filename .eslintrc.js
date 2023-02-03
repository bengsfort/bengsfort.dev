module.exports = {
  root: true,

  extends: [
    require.resolve(`@bengsfort.dev/eslint-config`),
  ],

  rules: {
    'consistent-return': 0,
    'arca/import-ordering': 0,
  },
};
