import {createElement}                             from 'preact';
import {RouteObject, RouterImplementationHandlers} from 'types';

import {Router}                                    from '../router';

const createHandlersMock = (): RouterImplementationHandlers => ({
  handleNavigateTo: jest.fn(),
  handleBack: jest.fn(),
  handleForward: jest.fn(),
  redirect: jest.fn(),
});

const createBaseRouteObject = (path: string): RouteObject => ({
  path,
  component: createElement(`div`, {}),
});

describe(`router`, () => {
  const testRoutes: Array<RouteObject> = [
    {
      ...createBaseRouteObject(`/home`),
      isDefault: true,
    },
    createBaseRouteObject(`/profile`),
    createBaseRouteObject(`/item/:id`),
  ];

  const createHandlersMock = (): RouterImplementationHandlers => ({
    handleNavigateTo: jest.fn(),
    handleBack: jest.fn(),
    handleForward: jest.fn(),
    redirect: jest.fn(),
  });

  describe(`initialization`, () => {
    it(`should use 'isDefault' routes as the initial route`, () => {
      const router = new Router(createHandlersMock(), testRoutes);
      const state = router.getCurrentState();
      expect(state.currentRoute).toEqual(testRoutes[0]);
    });

    it(`should fallback to '/' as the initial route if no 'isDefault' route`, () => {
      const routes = [
        createBaseRouteObject(`/test`),
        createBaseRouteObject(`/`),
        createBaseRouteObject(`/foo`),
      ];
      const router = new Router(createHandlersMock(), routes);
      const state = router.getCurrentState();
      expect(state.currentRoute).toEqual(routes[1]);
    });

    it(`should fallback to the first route in the list if '/' and 'isDefault' do not exist`, () => {
      const routes = [
        createBaseRouteObject(`/home`),
        createBaseRouteObject(`/bar`),
        createBaseRouteObject(`/foo`),
      ];
      const router = new Router(createHandlersMock(), routes);
      const state = router.getCurrentState();
      expect(state.currentRoute).toEqual(routes[0]);
    });
  });

  describe(`subscription`, () => {
    it(`should provide a way for subscribing and unsubscribing to changes`, () => {
      const router = new Router(createHandlersMock(), testRoutes);
      expect(router.subscriptionCount).toEqual(0);

      const unsub = router.subscribe(() => {});
      expect(router.subscriptionCount).toEqual(1);

      unsub();
      expect(router.subscriptionCount).toEqual(0);
    });

    it(`should not subscribe the same function twice`, () => {
      const router = new Router(createHandlersMock(), testRoutes);
      expect(router.subscriptionCount).toEqual(0);

      const fn = () => {};
      router.subscribe(fn);
      expect(router.subscriptionCount).toEqual(1);

      router.subscribe(fn);
      expect(router.subscriptionCount).toEqual(1);
    });

    it(`should receive state updates when subscribed`, () => {
      const router = new Router(createHandlersMock(), testRoutes);
      const fn = jest.fn();
      const unsub = router.subscribe(fn);

      // @todo: trigger changes, observe mock function getting called.
    });
  });

  describe(`.navigateTo(routePath)`, () => {
    it(`should update the current route and add to the history`, () => {
      // @todo
    });

    it(`should revert to the error route if the route is not found`, () => {
      // @todo
    });

    it(`should revert to the default route if the route and an error route are not found`, () => {
      // @todo
    });
  });

  describe(`.back()`, () => {
    it(`should move backwards in the history`, () => {
      // @todo
    });

    it(`should do nothing if already at the last history entry`, () => {
      // @todo
    });

    it(`should discard future elements when navigating from a detached head`, () => {
      // @todo
    });
  });

  describe(`.forward()`, () => {
    it(`should move forwards in the history`, () => {
      // @todo
    });

    it(`should do nothing if already at the first history entry`, () => {
      // @todo
    });
  });

  describe(`.redirect()`, () => {
    it(`should re-write the current history item and update the current route`, () => {
      // @todo
    });
  });
});
