# utils/shims

This directory is filled with things that cannot be ran in the SSR environment due to them not existing in NodeJS.

This isn't a great solution, and I hope to improve it by moving shims over to the server so that the app can just use the API's as normal and not have any idea whether or not it is in SSR mode, however I am becoming quite time constrained at the moment and my previous attempts to inject the shims directly into the Vite build failed (If you have an idea of how to do this cleanly, please let me know via an issue or PR!)
