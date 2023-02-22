import {findRankedPartialMatches, segmentize} from './utils';
import type * as RouterTypes                  from './types';

type RouterUpdateCallback = (state: RouterTypes.RouterContext) => void;

export class Router {
  private readonly _handlers: RouterTypes.RouterImplementationHandlers;
  private readonly _routes: Array<RouterTypes.RouteObject>;
  private readonly _history: Array<RouterTypes.RouteHistoryEntry>;

  private _cursor: number;
  private _subscriptions: Set<RouterUpdateCallback>;
  private _errorRouteIndex: number;
  private _defaultRouteIndex: number;
  private _initialPath: string;

  public get subscriptionCount(): number {
    return this._subscriptions.size;
  }

  public get historySize(): number {
    return this._history.length;
  }

  public get historyCursor(): number {
    return this._cursor;
  }

  public get isDetached(): boolean {
    return this._cursor < this._history.length - 1;
  }

  private get _currentRoute(): RouterTypes.RouteHistoryEntry {
    return this._history[this._cursor];
  }

  private get _errorRoute(): RouterTypes.RouteObject {
    return this._routes[this._errorRouteIndex];
  }

  private get _defaultRoute(): RouterTypes.RouteObject {
    return this._routes[this._defaultRouteIndex];
  }

  constructor(
    handlers: RouterTypes.RouterImplementationHandlers,
    routes: Array<RouterTypes.RouteObject>,
    initialPath = `/`) {
    this._handlers = handlers;
    this._routes = routes;

    this._initialPath = initialPath;
    this._defaultRouteIndex = this._getDefaultRoute(routes);
    this._errorRouteIndex = this._getErrorRoute(routes);
    if (this._errorRouteIndex === -1)
      this._errorRouteIndex = this._defaultRouteIndex;

    let initialRoute = this._getRouteForPath(initialPath, routes);
    if (Object.keys(initialRoute).length === 0)
      initialRoute = routes[this._defaultRouteIndex];

    this._history = [initialRoute];
    this._cursor = 0;
    this._subscriptions = new Set();
    this._handlers.handleInit(initialPath, this.getCurrentState());
  }

  private _getErrorRoute(routes: Array<RouterTypes.RouteObject>) {
    return routes.findIndex(route => route.isError);
  }

  private _getDefaultRoute(routes: Array<RouterTypes.RouteObject>) {
    let hasDefaultRoute = false;
    let routeIndex = 0;

    routes.forEach((route, index) => {
      // If we already have a route marked as default, just skip the rest.
      if (hasDefaultRoute) return;

      // If the route isn't marked as default OR `/`, skip it.
      if (!route.isDefault || route.path !== `/`) return;

      hasDefaultRoute = route.isDefault;
      routeIndex = index;
    });

    return routeIndex;
  }

  private _getRouteForPath(path: string, routes: Array<RouterTypes.RouteObject>): RouterTypes.RouteHistoryEntry {
    let historyEntry: RouterTypes.RouteHistoryEntry;

    const [match] = findRankedPartialMatches(path, routes);

    if (match?.isExact) {
      historyEntry = {
        ...match.route,
        params: match.params,
      };
    } else {
      historyEntry = {
        ...this._errorRoute,
      };
    }

    return historyEntry;
  }

  private _ensureRelativePathSafety(path: string) {
    if (path.charAt(0) === `/`) return path;

    return [
      `/`,
      ...segmentize(this._currentRoute.path),
      ...segmentize(path),
    ].join(`/`);
  }

  private _notifySubscribers() {
    const state = this.getCurrentState();

    for (const fn of this._subscriptions) {
      fn(state);
    }
  }

  public navigateTo = (path: string) => {
    const targetPath = this._ensureRelativePathSafety(path);

    const historyEntry = this._getRouteForPath(targetPath, this._routes);

    // When we have a detached history cursor, we need to splice instead of push.
    if (this.isDetached) {
      const detachedCount = this._history.length - this._cursor;
      this._history.splice(this._cursor + 1, detachedCount, historyEntry);
    } else {
      this._history.push(historyEntry);
    }

    this._cursor++;
    this._handlers.handleNavigateTo(targetPath, this.getCurrentState());
    this._notifySubscribers();
  };

  public forward = () => {
    if (!this.isDetached)
      return;

    this._cursor++;
    this._handlers.handleForward();
    this._notifySubscribers();
  };

  public back = () => {
    if (this._cursor === 0)
      return;

    this._cursor--;
    this._handlers.handleBack();
    this._notifySubscribers();
  };

  public redirect = (path: string) => {
    const targetPath = this._ensureRelativePathSafety(path);
    const historyEntry = this._getRouteForPath(targetPath, this._routes);

    // When we have a detached history cursor, we need to remove any detached.
    const replaceCount = this.isDetached
      ? this._history.length - this._cursor
      : 1;

    this._history.splice(this._cursor, replaceCount, historyEntry);
    this._handlers.handleRedirect(targetPath, this.getCurrentState());
    this._notifySubscribers();
  };

  public getCurrentState(): RouterTypes.RouterContext {
    return {
      routes: this._routes,
      customHistory: [...this._history],
      currentRoute: this._currentRoute,
      cursor: this._cursor,

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

  public updateCursorFromExternal(newCursor: number, path: string) {
    this._cursor = newCursor;

    // Sometimes things can get de-synced when using the back button to LEAVE the site and then return.
    // To fix this, we need to re-build the state if things don't look correct.
    const newRoute = this._history[newCursor];
    if (typeof newRoute === `undefined`) {
      const targetPath = this._ensureRelativePathSafety(path);
      const historyEntry = this._getRouteForPath(targetPath, this._routes);
      this._history[newCursor] = historyEntry;
    }

    this._notifySubscribers();
  }
}
