# @bengsfort/router

The router package for [bengsfort.dev](https://bengsfort.dev). This is a basic router implementation built for Preact, specifically to enable both browser routing + SSR routing. I built this because preact-router does not support SSR, and while React Router does, I ran into multiple issues regarding the Vite build + preact/compat. Instead of spending even more time on configuration testing I decided to just whip up a simple but effective routing solution myself.

## Commands

- `yarn test`: Run tests.
- `yarn watch`: Run tests in watch mode.
- `yarn lint`: Lint/format all the codebase.
- `yarn lint:ts`: Lint the typescript portion of the codebase.
- `yarn lint:css`: Lint the CSS of the codebase.
