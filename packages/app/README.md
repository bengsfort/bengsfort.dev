# @bengsfort/app

The app/ui code for [bengsfort.dev](https://bengsfort.dev). It is a pretty standard Preact app, and gets imported by @bengsfort.dev/server both in the actual server code during Server Side Rendering, as well as in it's bundle that gets served to the client. As such, this is sort of like a UI library but instead of providing a bunch of common components, provides the components that make up the app, and the server is the main consumer of it.

## Commands

- `yarn lint`: Lint/format all the codebase.
- `yarn lint:ts`: Lint the typescript portion of the codebase.
- `yarn lint:css`: Lint the CSS of the codebase.

_* The build commands in this package are mostly for ease-of-use when it comes to inspecting the actual build output to validate it, as the actual build is ran in the server package for simplicity and less orchestration. The server package uses the build scripts included here to generate the bundle, so running the commands here will produce the same output as the server build._
