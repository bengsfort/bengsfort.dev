# bengsfort.dev

My personal portfolio/blog.

## Notes

When developing, for the best experience it is ideal to open the project as a workspace in VSCode using the bengsfort.code-workspace file. This enables typescript and linting to work properly.

## Architecture

```
packages/app - The Preact app for the site.
packages/server - The Node.js server for the site.
tools/esbuild - The common ESBuild config for the project.
tools/eslint-config - The eslint config for the project.
```

The project is setup as a yarn workspace for ease of maintenenance and separation of UI / server code, as well as tooling. The project is setup so that common configs can be used easily, and packages can easily reference each-other without worrying about the dependencies involved.

## Scripts

- `yarn lint`: Lint all workspaces.
