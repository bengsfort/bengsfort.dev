import {VNode}                   from 'preact';

import {RouteProps}              from './components/Route';
import {RouteMatch, RouteObject} from './types';

/**
 * Extracts route information from a given Route component.
 *
 * @param node The Route component.
 * @returns A route object containing the extracted route info.
 */
export function getRouteObjectFromNode(node: VNode<RouteProps>): RouteObject {
  const {isDefault, isError, path} = node.props as RouteProps;
  return {
    path,
    isDefault: isDefault ?? false,
    isError: isError ?? false,
    component: node,
  };
}

/**
 * Removes the first and last '/' and then split based on '/'.
 *
 * @param path The path to segmentize.
 * @returns An array of the segments of the path.
 */
export function segmentize(path: string): Array<string> {
  // Remove the first/last '/' and then split based on '/'.
  // This returns an array of the
  return path.replace(/(^\/+|\/+$)/g, ``).split(`/`);
}

/**
 * Iterates through the provided routes to find any matches with the given route.
 * Will return both exact and partial matches, with any exact matches at the start
 * of the array.
 *
 * @param targetPath The URL to check for matches with.
 * @param routes The available routes.
 * @returns An array with matches. Exact matches are at the beginning of the array.
 */
export function findRankedPartialMatches(targetPath: string, routes: Array<RouteObject>): Array<RouteMatch> {
  const matches: Array<RouteMatch> = [];
  const [targetBasename, ...targetSegments] = segmentize(targetPath);

  // Iterate through each route to find any matches.
  routes.forEach(route => {
    const [basename, ...routeSegments] = segmentize(route.path);

    // if our basenames don't match,  go ahead and just skip this route.
    if (basename !== targetBasename || routeSegments.length > targetSegments.length)
      return;


    // If there are more than 0 segments this will be updated with the correct
    // value, however if there are no segments this validates that we have the
    // correct root route.
    let isExact = routeSegments.length === targetSegments.length;

    // If we actually have segments, parse them. Otherwise, skip.
    if (routeSegments.length > 0) {
      let matchDepth = 0;
      isExact = routeSegments.every((segment, i) => {
        const targetEquivalent = targetSegments[i];
        if (typeof targetEquivalent === `undefined`)
          return false;

        const segmentMatches = segment.charAt(0) === `:` || segment === targetEquivalent;
        if (segmentMatches) {
          matchDepth++;
          return true;
        }

        return false;
      });

      if (matchDepth < 1) {
        return;
      }
    }

    matches.push({
      route,
      isExact: routeSegments.length < targetSegments.length ? false : isExact,
    });
  });

  // Sort the matches so the exact match is first.
  matches.sort((a, b) =>
    a.isExact && !b.isExact ? -1 :
      !a.isExact && b.isExact ? 1 : 0,
  );

  return matches;
}
