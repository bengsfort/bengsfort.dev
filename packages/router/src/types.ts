import {VNode}      from 'preact';

import {RouteProps} from './components/Route';

/**
 * This defines a given Route.
 */
export interface RouteObject {
  path: string;
  component: VNode<RouteProps>;
  isDefault?: boolean;
  isError?: boolean;
}

/** This defines a route that was active. */
export interface RouteHistoryEntry<
  ParamType extends Record<string, any> = Record<string, any>,
> extends RouteObject {
  params?: ParamType;
}

/** Interface used when defining a matching route. */
export interface RouteMatch {
  route: RouteObject;
  isExact: boolean;
}

/**
 * This is the main exposed router API which should represent the
 * currently active state.
 */
export interface RouterContext {
  // State
  routes: Array<RouteObject>;
  customHistory: Array<RouteHistoryEntry>;
  currentRoute: RouteHistoryEntry | null;

  // API
  navigateTo(path: string): void;
  forward(): void;
  back(): void;
  redirect(path: string): void;
}

/**
 * This is for assigning handlers that handle the actual implementation
 * of a certain router; ie. Taking the result of the operation and tying
 * it to the browser History API.
 */
export interface RouterImplementationHandlers {
  handleNavigateTo(path: string, match?: RouteHistoryEntry): void;
  handleForward(): void;
  handleBack(): void;
  redirect(path: string, match?: RouteHistoryEntry): void;
}