import {segmentize}          from './utils';
import type * as RouterTypes from './types';

type RouterUpdateCallback = (state: RouterTypes.RouterContext) => void;

export class Router {
  private readonly _handlers: RouterTypes.RouterImplementationHandlers;
  private readonly _routes: Array<RouterTypes.RouteObject>;
  private readonly _history: Array<RouterTypes.RouteHistoryEntry>;

  private _cursor: number;
  private _subscriptions: Set<RouterUpdateCallback>;

  public get subscriptionCount(): number {
    return this._subscriptions.size;
  }

  public get historySize(): number {
    return this._history.length;
  }

  public get historyCursor(): number {
    return this._cursor;
  }

  private get _currentRoute(): RouterTypes.RouteHistoryEntry {
    return this._history[this._cursor];
  }

  constructor(handlers: RouterTypes.RouterImplementationHandlers, routes: Array<RouterTypes.RouteObject>) {
    this._handlers = handlers;
    this._routes = routes;

    const currentRoute = this._getDefaultRoute(routes);
    this._history = [currentRoute];
    this._cursor = 0;
    this._subscriptions = new Set();
  }

  private _getDefaultRoute(routes: Array<RouterTypes.RouteObject>) {
    let defaultRoute: RouterTypes.RouteObject | undefined;

    routes.forEach(route => {
      // If we already have a route marked as default, just skip the rest.
      if (defaultRoute?.isDefault) return;

      if (route.isDefault || (route.path === `/` && !defaultRoute?.isDefault)) {
        defaultRoute = route;
        return;
      }
    });

    return defaultRoute ?? routes[0];
  }

  public navigateTo = (path: string) => {
    let targetPath = path;

    // When handling relative paths we add the path to the current path.
    if (path[0] !== `/`) {
      targetPath = [
        `/`,
        ...segmentize(this._currentRoute.path),
        ...segmentize(path),
      ].join(`/`);
    }
  };

  public forward = () => {
    // @todo
  };

  public back = () => {
    // @todo
  };

  public redirect = (path: string) => {
    // @todo
  };

  public getCurrentState(): RouterTypes.RouterContext {
    return {
      routes: this._routes,
      customHistory: [...this._history],
      currentRoute: this._currentRoute,

      navigateTo: this.navigateTo,
      forward: this.forward,
      back: this.back,
      redirect: this.redirect,
    };
  }

  public subscribe(fn: RouterUpdateCallback) {
    if (this._subscriptions.has(fn))
      return () => {};

    this._subscriptions.add(fn);
    return () => {
      this._subscriptions.delete(fn);
    };
  }
}
