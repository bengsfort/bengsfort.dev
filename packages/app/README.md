# @bengsfort/app

The app/ui code for [bengsfort.dev](https://bengsfort.dev).

## Commands

- `yarn lint`: Lint/format the codebase.
- `yarn clean`: Clean any build artefacts from the directory.
- `yarn build`: Build the codebase with esbuild.*
- `yarn watch`: Watch the codebase and rebuild with esbuild on any changes.*

_* The build commands in this package are mostly for ease-of-use when it comes to inspecting the actual build output to validate it, as the actual build is ran in the server package for simplicity and less orchestration. The server package uses the build scripts included here to generate the bundle, so running the commands here will produce the same output as the server build._
