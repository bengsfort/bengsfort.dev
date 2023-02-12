# bengsfort.dev

My personal portfolio/blog. If you would like to see how I tackled implementation of the project linearly, I tried to implement everything in linear PR's so you can see the entire evolution of the project by viewing the closed/merged PR's.

## Notes

- When developing, for the best experience it is ideal to open the project as a workspace in VSCode using the bengsfort.code-workspace file. This enables typescript and linting to work properly.
- The UI code ([packages/app](packages/app)) does not contain any build steps, as it is used essentially as a UI library by [packages/server](packages/server). The server imports the app and throws it into the entry points, making sure that the server/ui code stays isolated from each other. This means you can run the dev server and then just focus on whatever type of code you want to write rather than context switch between ui/server code constantly!

## Architecture

```
[packages/app](packages/app) - The Preact app for the site.
[packages/server](packages/server) - The Node.js server for the site.
[tools/esbuild](tools/esbuild) - The main ESBuild config for the project.
[tools/eslint-config](tools/eslint-config) - The eslint config for the project.
[tools/postcss](tools/postcss) - The postcss config for the project.
```

The project is setup as a yarn workspace for ease of maintenenance and separation of UI / server code, as well as tooling. The project is setup so that common configs can be used easily, and packages can easily reference each-other without worrying about the dependencies involved. Each package contains information on how to use them, their purpose, and the reasonings behind them so feel free to poke around.

## Scripts

- `yarn lint`: Lint all workspaces.

## How I made this

1. [Build system](https://github.com/bengsfort/bengsfort.dev/pull/1)
2. [Core styles](https://github.com/bengsfort/bengsfort.dev/pull/2)
3. [Vite Setup](https://github.com/bengsfort/bengsfort.dev/pull/3)
