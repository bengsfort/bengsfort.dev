# @bengsfort/app

The app/ui code for [bengsfort.dev](https://bengsfort.dev). It is a pretty standard Preact app, and gets imported by @bengsfort.dev/server both in the actual server code during Server Side Rendering, as well as in it's bundle that gets served to the client. As such, this is sort of like a UI library but instead of providing a bunch of common components, provides the components that make up the app, and the server is the main consumer of it.

## Commands

- `yarn lint`: Lint/format all the codebase.
- `yarn lint:ts`: Lint the typescript portion of the codebase.
- `yarn lint:css`: Lint the CSS of the codebase.

## Where are my build commands?!

In [packages/server](/packages/server)! The server contains a Vite build which imports this package in it's two entry points (client and ssr), and the server also contains a vite dev server with HMR when ran in dev mode. As such, there is no need for this package to contain any builds (except maybe storybook in the future). If you would like to generate a production build, try `yarn build` in the server package, or if you would like to start up a dev build/server, try `yarn dev` in the server package.
