import {Route}                                                        from '../components';

import {createElement}                                                from 'preact';
import type {ComponentProps}                                          from 'preact';

import {findRankedPartialMatches, getRouteObjectFromNode, segmentize} from '../utils';
import {RouteMatch, RouteObject}                                      from '../types';

describe(`Utils`, () => {
  describe(`getRouteObjectFromNode`, () => {
    const createDummyRoute = (props: Omit<ComponentProps<typeof Route>, `children`>) => {
      return createElement(Route, {
        ...props,
        children: createElement(`div`, {
          children: `Hello world`,
        }),
      });
    };

    it(`should generate a route object from a node`, () => {
      const el = createDummyRoute({
        path: `/test-route`,
      });

      const result = getRouteObjectFromNode(el);
      expect(result).toEqual<RouteObject>({
        path: `/test-route`,
        component: el,
        isDefault: false,
        isError: false,
      });
    });

    it(`should determine error and default routes`, () => {
      const errorPage = createDummyRoute({
        path: `/404`,
        isError: true,
      });
      const errorRoute = getRouteObjectFromNode(errorPage);
      expect(errorRoute).toEqual<RouteObject>({
        path: `/404`,
        component: errorPage,
        isDefault: false,
        isError: true,
      });

      const defaultPage = createDummyRoute({
        path: `/`,
        isDefault: true,
      });
      const defaultRoute = getRouteObjectFromNode(defaultPage);
      expect(defaultRoute).toEqual<RouteObject>({
        path: `/`,
        component: defaultPage,
        isDefault: true,
        isError: false,
      });
    });
  });

  describe(`segmentize`, () => {
    it(`should return an array of the segments of a path`, () => {
      const target = `user/bob/edit`;
      expect(segmentize(target)).toEqual([`user`, `bob`, `edit`]);
    });

    it(`should ignore starting/ending separators`, () => {
      const target = `/users/`;
      expect(segmentize(target)).toEqual([`users`]);
    });

    it(`should return an empty segment for index`, () => {
      const target = `/`;
      expect(segmentize(target)).toEqual([``]);
    });

    it(`should preserve dynamic variables`, () => {
      const target = `/user/:id`;
      expect(segmentize(target)).toEqual([`user`, `:id`]);
    });
  });

  describe(`findRankedPartialMatches`, () => {
    const createRouteObject = (path: string): RouteObject => ({
      path,
      component: createElement(`div`, {}),
    });

    it(`should return nothing if there are no matches`, () => {
      const result = findRankedPartialMatches(`/nope`, [
        createRouteObject(`/`),
        createRouteObject(`/exists`),
      ]);
      expect(result).toHaveLength(0);
    });

    it(`should not treat an empty route as a partial match`, () => {
      const result = findRankedPartialMatches(`/`, [
        createRouteObject(`/`),
        createRouteObject(`/home`),
        createRouteObject(`/users`),
      ]);
      expect(result).toHaveLength(1);
    });

    it(`should return partial and exact matches (exact matches first)`, () => {
      const routes = [
        createRouteObject(`/home`),
        createRouteObject(`/users`),
        createRouteObject(`/users/me`),
        createRouteObject(`/users/me/edit`),
        createRouteObject(`/users/bob`),
      ];
      const result = findRankedPartialMatches(`/users/me`, routes);
      expect(result).toHaveLength(2);

      expect(result[0]).toEqual<RouteMatch>({
        route: routes[2],
        isExact: true,
      });
      expect(result[1].route).toEqual(routes[1]); // /users
    });

    it(`should match basenames`, () => {
      const routes = [
        createRouteObject(`/home`),
        createRouteObject(`/users`),
        createRouteObject(`/users/me`),
      ];
      const result = findRankedPartialMatches(`/users`, routes);
      expect(result).toHaveLength(1);
      expect(result[0].route).toEqual(routes[1]);
      expect(result[0].isExact).toEqual(true);
    });

    it(`should not mark parent routes as exact matches when deeply nested`, () => {
      const routes = [
        createRouteObject(`/home`),
        createRouteObject(`/user/bob`),
        createRouteObject(`/user/bob/add`),
        createRouteObject(`/user/list`),
      ];
      const dynamicUrlChild = findRankedPartialMatches(`/user/bob/add`, routes);

      expect(dynamicUrlChild).toHaveLength(2);
      expect(dynamicUrlChild[0]).toEqual<RouteMatch>({
        route: routes[2], // /user/bob/add
        isExact: true,
      });
      expect(dynamicUrlChild[1]).toEqual<RouteMatch>({
        route: routes[1], // /user/bob
        isExact: false,
      });
    });

    it(`should not return siblings of dynamic routes`, () => {
      const routes = [
        createRouteObject(`/home`),
        createRouteObject(`/user/:userId`),
        createRouteObject(`/user/:userId/add`),
        createRouteObject(`/user/list`),
      ];
      const dynamicUrlResult = findRankedPartialMatches(`/user/bob`, routes);
      const dynamicUrlChild = findRankedPartialMatches(`/user/bob/add`, routes);

      expect(dynamicUrlResult).toHaveLength(1);
      expect(dynamicUrlResult).toEqual<Array<RouteMatch>>([
        {
          route: routes[1], // /user/:userId
          isExact: true,
        },
      ]);

      expect(dynamicUrlChild).toHaveLength(2);
      expect(dynamicUrlChild[0]).toEqual<RouteMatch>({
        route: routes[2], // /user/:userId/add
        isExact: true,
      });
      expect(dynamicUrlChild[1]).toEqual<RouteMatch>({
        route: routes[1], // /user/:userId
        isExact: false,
      });
    });
  });
});
