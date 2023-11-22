const autoprefixer = require("autoprefixer");
const postcssNested = require("postcss-nested");

module.exports = (ctx) => ({
  map: ctx.env !== 'production' ? ctx.map : false,
  plugins: [
    autoprefixer,
    postcssNested,
  ],
});
