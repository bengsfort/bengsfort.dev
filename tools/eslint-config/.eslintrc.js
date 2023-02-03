module.exports = {
    root: true,
  
    extends: [
      require.resolve(`@yarnpkg/eslint-config`),
      require.resolve(`@yarnpkg/eslint-config/react`),
    ],
  
    rules: {
      'consistent-return': 0,
      'arca/import-ordering': 0,
    },
  };
