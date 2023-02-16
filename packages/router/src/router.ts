import {RouteObject, RouterContext, RouterImplementationHandlers} from './types';

type RouterUpdateCallback = (state: RouterContext) => void;

export class Router {
  private readonly _handlers: RouterImplementationHandlers;
  private readonly _routes: Array<RouteObject>;
  private readonly _history: Array<RouteObject>;

  private _currentRoute: RouteObject;
  private _subscriptions: Set<RouterUpdateCallback>;

  public get subscriptionCount(): number {
    return this._subscriptions.size;
  }

  public get historySize(): number {
    return this._history.length;
  }

  constructor(handlers: RouterImplementationHandlers, routes: Array<RouteObject>) {
    this._handlers = handlers;
    this._routes = routes;
    this._currentRoute = this._getDefaultRoute(routes);
    this._history = [this._currentRoute];
    this._subscriptions = new Set();
  }

  private _getDefaultRoute(routes: Array<RouteObject>) {
    let defaultRoute: RouteObject | undefined;

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
    // @todo
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

  public getCurrentState(): RouterContext {
    return {
      routes: this._routes,
      customHistory: this._history,
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
