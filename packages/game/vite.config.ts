import { defineConfig } from 'vite'

// Config for the game dev environment.
export default defineConfig({
  plugins: [],
  define: {},
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
})
