# @bengsfort/server

The server code for [bengsfort.dev](https://bengsfort.dev). This also contains a 'ui bundle' which essentially is an iife bundle that imports the app from @bengsfort.dev/app and handles initial state hydration and the html template that gets served to the client. This allows us to streamline this process and have it all in the same place, while the actual app logic/ui code remains in @bengsfort.dev/app.

## Commands

- `yarn lint`: Lint/format all the codebase.
- `yarn lint:ts`: Lint the typescript portion of the codebase.
- `yarn lint:css`: Lint the CSS of the codebase.
- `yarn clean`: Cleans the build directory.
- `yarn build`: Build the UI and server code.
- `yarn watch`: Runs a watcher script that will auto rebuild both UI and server code upon changes.
- `yarn start`: Run the server via nodemon.
