# @bengsfort/server

The server code for [bengsfort.dev](https://bengsfort.dev).

## Commands

- `yarn lint`: Lint/format all the codebase.
- `yarn clean`: Cleans the build directory.
- `yarn build`: Build the UI and server code.
- `yarn start`: Run the server in production mode. You should run `yarn build` first.
- `yarn dev`: Run a watcher for the server build and run the server in dev mode (to also run a Vite dev server).

## Build system

This app runs using both [esbuild](https://esbuild.github.io/) (for server code) and [vite](https://vitejs.dev/) (for client code). Both build systems live within this package and are somewhat intertwined due to the SSR implementation, which in dev mode the code managed by esbuild will actually utilise the vite API to create a dev server to manage the client code entry points.

This package contains 3 entry points:

1. `server.ts` - The entrypoint for the actual express server that handles API's, SSR rendering, dev server handling, etc. This is managed by esbuild.
2. `entry-client.ts` - The entrypoint that actually gets loaded in the browser via vite/our index.html template. This is managed by vite.
3. `entry-server.ts` - The entrypoint that gets loaded on the server to pre-render the app before sending a response to the client. This is managed by vite.

In production mode, all 3 entry points are built beforehand by their respective build tool (esbuild for the 1, vite for 2 & 3) during a compilation step. All bundles are available and ready for use at the start of the server. In dev mode, all 3 entry points are still managed by their respective build tools however 2 & 3 no longer happens in a compilation step. Instead, the server will create a vite dev server instance to dynamically generate the bundles at runtime with full HMR support. Additionally, all of this logic is gated behind environment checks and dynamic imports so none of the overhead is included within the production build.

### Why not use esbuild for everything?

I love esbuild, and I [_was_ initially planning](https://github.com/bengsfort/bengsfort.dev/pulls/1) on using esbuild for everything. However, after my initial implementation I noticed some things:

- Having two separate esbuild configs for the two separate bundles resulted in a lot of unwanted boilerplate/code duplication.
- Build orchestration was a little bit convoluted and confusing due to the added complexity.
- Client dependencies were hard to map out because the server only needed some of the dependencies to build the SSR entrypoint, and including more would have bloated the server build.
- While I was able to get PostCSS CSS modules working, they were only partially working. Without getting too wild we could get class names included in the initial render so css modules would work, but not embedded styles without fully bundling all of them in a css file beforehand. While this would work to combat the initial unstyled-page flash, it is not an ideal solution because then the CSS Modules would get re-generated at runtime, duplicating every style. 

While you could write a few custom esbuild plugins to solve most of these issues (and they are extremely interesting issues that I would love to solve), I'm at a bit of a time disadvantage at the moment so it's just not a great idea to embark on at the moment, especially when I can get a more robust feature set by just utilising Vite for the client build.

### Why not use ts-node for the server so you don't need a build step for the server?

In my previous encounters with ts-node I just ended up not being a huge fan of using it for production code due to inconsistencies and volatility between environments. I prefer being able to have full control over what code gets ran in production, and being able to see exactly what is getting ran; with ts-node I don't feel like I have that. Additionally, having a bundling step allows me more freedoms and options when it comes to being able to import and utilise file types other than .ts/.json.
