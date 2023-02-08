/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable arca/no-default-export */

module.exports = {
  extends: [
    `stylelint-config-recommended`,
    `stylelint-config-rational-order`,
  ],
  plugins: [`stylelint-high-performance-animation`],
  rules: {
    "rule-empty-line-before": [`always`, {except: [`first-nested`, `after-single-line-comment`]}],
    "max-nesting-depth": 2,
    "no-unknown-animations": true,
    "no-missing-end-of-source-newline": true,
    "at-rule-no-unknown": [true, {ignoreAtRules: [`define-mixin`, `mixin`]}],
    "unit-allowed-list": [
      [`rem`, `ms`, `%`, `deg`, `vw`, `vh`, `fr`],
      {ignoreProperties: {em: [`letter-spacing`], px: [`/border-*/`, `box-shadow`, `backdrop-filter`, `filter`]}},
    ],
    "declaration-block-no-duplicate-properties": true,
    "selector-pseudo-class-no-unknown": [true, {ignorePseudoClasses: [`global`]}],
    indentation: 2,
    "no-eol-whitespace": true,
    "max-empty-lines": 1,
    "declaration-colon-space-after": `always`,
    "declaration-colon-space-before": `never`,
    "declaration-block-trailing-semicolon": `always`,
    "no-extra-semicolons": true,
    "plugin/no-low-performance-animation-properties": [true, {ignoreProperties: [`color`, `background-color`, `border-color`, `border`], severity: `warning`}],
    "selector-class-pattern": [
      `^([a-z][a-z0-9]*)(-[a-z0-9]+)*$`,
      {
        message: `Expected custom property name to be kebab-case`,
      },
    ],
  },
};
