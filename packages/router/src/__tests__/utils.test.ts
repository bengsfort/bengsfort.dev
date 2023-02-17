import {Route}                              from '../components';

import {createElement}                      from 'preact';
import type {ComponentProps}                from 'preact';

import {getRouteObjectFromNode, segmentize} from '../utils';
import {RouteObject}                        from '../types';

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
});
