import {VNode}      from 'preact';

import {RouteProps} from './components/Route';

/**
 * This defines a given Route.
 */
export interface RouteObject {
  path: string;
  component: VNode<RouteProps>;
  isDefault?: boolean;
}

/**
 * This is the main exposed router API which should represent the
 * currently active state.
 */
export interface RouterContext {
  // State
  routes: Array<RouteObject>;
  customHistory: Array<RouteObject>;
  currentRoute: RouteObject | null;

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
  handleNavigateTo(path: string, match?: RouteObject): void;
  handleForward(): void;
  handleBack(): void;
  redirect(path: string, match?: RouteObject): void;
}
