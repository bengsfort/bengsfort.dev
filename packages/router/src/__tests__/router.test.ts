import {createElement}                             from 'preact';
import {RouteObject, RouterImplementationHandlers} from 'types';

import {Router}                                    from '../router';

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
    createBaseRouteObject(`/profile/edit`),
    createBaseRouteObject(`/item`),
  ];

  const createHandlersMock = (): RouterImplementationHandlers => ({
    handleInit: jest.fn(),
    handleNavigateTo: jest.fn(),
    handleBack: jest.fn(),
    handleForward: jest.fn(),
    handleRedirect: jest.fn(),
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

      router.navigateTo(testRoutes[1].path);
      expect(fn).toHaveBeenCalledTimes(1);

      router.back();
      expect(fn).toHaveBeenCalledTimes(2);

      router.forward();
      expect(fn).toHaveBeenCalledTimes(3);

      router.redirect(testRoutes[0].path);
      expect(fn).toHaveBeenCalledTimes(4);

      unsub();
      router.navigateTo(testRoutes[2].path);
      expect(fn).toHaveBeenCalledTimes(4);
    });
  });

  describe(`.navigateTo(routePath)`, () => {
    it(`should update the current route and add to the history`, () => {
      const router = new Router(createHandlersMock(), testRoutes);

      expect(router.historySize).toEqual(1);
      expect(router.historyCursor).toEqual(0);

      router.navigateTo(testRoutes[1].path);
      expect(router.historySize).toEqual(2);
      expect(router.historyCursor).toEqual(1);
    });

    it(`should revert to the error route if the route is not found`, () => {
      const routes: Array<RouteObject> = [
        createBaseRouteObject(`/`),
        {
          ...createBaseRouteObject(`/404`),
          isError: true,
        },
      ];
      const router = new Router(createHandlersMock(), routes);
      let state = router.getCurrentState();
      expect(state.currentRoute).toEqual(routes[0]);

      router.navigateTo(`lolnope`);
      state = router.getCurrentState();
      expect(state.currentRoute).toEqual(routes[1]);
    });

    it(`should revert to the default route if the route and an error route are not found`, () => {
      const routes: Array<RouteObject> = [
        createBaseRouteObject(`/home`),
        createBaseRouteObject(`/foo`),
      ];
      const router = new Router(createHandlersMock(), routes);
      router.navigateTo(`/foo`);

      let state = router.getCurrentState();
      expect(state.currentRoute).toEqual(routes[1]);

      router.navigateTo(`/unknown`);
      state = router.getCurrentState();
      expect(state.currentRoute).toEqual(routes[0]);
    });
  });

  describe(`.back()`, () => {
    it(`should move backwards in the history`, () => {
      const router = new Router(createHandlersMock(), testRoutes);

      router.navigateTo(testRoutes[1].path);
      router.navigateTo(testRoutes[2].path);
      expect(router.historySize).toEqual(3);
      expect(router.historyCursor).toEqual(2);

      router.back();
      expect(router.historySize).toEqual(3);
      expect(router.historyCursor).toEqual(1);

      const state = router.getCurrentState();
      expect(state.currentRoute).toEqual(testRoutes[1]);
    });

    it(`should do nothing if already at the last history entry`, () => {
      const router = new Router(createHandlersMock(), testRoutes);

      router.navigateTo(testRoutes[1].path);
      router.navigateTo(testRoutes[2].path);
      expect(router.historySize).toEqual(3);
      expect(router.historyCursor).toEqual(2);

      router.back();
      router.back();
      expect(router.historySize).toEqual(3);
      expect(router.historyCursor).toEqual(0);

      const ogState = router.getCurrentState();
      router.back();
      expect(ogState).toEqual(router.getCurrentState());
    });

    it(`should discard future elements when navigating from a detached head`, () => {
      const router = new Router(createHandlersMock(), testRoutes);

      // Each navigate call has the history cursor next to it.
      router.navigateTo(testRoutes[1].path); // 1
      router.navigateTo(testRoutes[2].path); // 2
      router.navigateTo(testRoutes[3].path); // 3
      router.navigateTo(testRoutes[0].path); // 4
      router.navigateTo(testRoutes[1].path); // 5
      router.navigateTo(testRoutes[2].path); // 6
      expect(router.historySize).toEqual(7);
      expect(router.historyCursor).toEqual(6);

      router.back(); // -> 5
      router.back(); // -> 4
      router.back(); // -> 3
      expect(router.historySize).toEqual(7);
      expect(router.historyCursor).toEqual(3);

      const preDetachedHistory = router.getCurrentState().customHistory;
      expect(preDetachedHistory).toEqual([
        testRoutes[0],
        testRoutes[1],
        testRoutes[2],
        testRoutes[3],
        testRoutes[0],
        testRoutes[1],
        testRoutes[2],
      ]);

      // Detaches the head
      router.navigateTo(testRoutes[2].path);
      expect(router.historySize).toEqual(5);
      expect(router.historyCursor).toEqual(4);

      const state = router.getCurrentState();
      expect(state.currentRoute).toEqual(testRoutes[2]);

      const postDetachedHistory = state.customHistory;
      expect(postDetachedHistory).toEqual([
        testRoutes[0],
        testRoutes[1],
        testRoutes[2],
        testRoutes[3],
        testRoutes[2],
      ]);
    });
  });

  describe(`.forward()`, () => {
    it(`should move forwards in the history`, () => {
      const router = new Router(createHandlersMock(), testRoutes);

      router.navigateTo(testRoutes[1].path);
      router.navigateTo(testRoutes[2].path);
      expect(router.historySize).toEqual(3);
      expect(router.historyCursor).toEqual(2);

      router.back();
      expect(router.historySize).toEqual(3);
      expect(router.historyCursor).toEqual(1);

      router.forward();
      expect(router.historySize).toEqual(3);
      expect(router.historyCursor).toEqual(2);

      const state = router.getCurrentState();
      expect(state.currentRoute).toEqual(testRoutes[2]);
    });

    it(`should do nothing if already at the first history entry`, () => {
      const router = new Router(createHandlersMock(), testRoutes);

      router.navigateTo(testRoutes[1].path);
      router.navigateTo(testRoutes[2].path);
      expect(router.historySize).toEqual(3);
      expect(router.historyCursor).toEqual(2);

      router.forward();
      expect(router.historySize).toEqual(3);
      expect(router.historyCursor).toEqual(2);
    });
  });

  describe(`.redirect()`, () => {
    it(`should re-write the current history item and update the current route`, () => {
      const router = new Router(createHandlersMock(), testRoutes);

      router.navigateTo(testRoutes[2].path);

      expect(router.getCurrentState().currentRoute).toEqual(testRoutes[2]);
      expect(router.historySize).toEqual(2);
      expect(router.historyCursor).toEqual(1);

      router.redirect(testRoutes[1].path);

      expect(router.getCurrentState().currentRoute).toEqual(testRoutes[1]);
      expect(router.historySize).toEqual(2);
      expect(router.historyCursor).toEqual(1);
    });
  });

  describe(`Route Handling`, () => {
    it(`should treat paths without '/' as relative`, () => {
      const router = new Router(createHandlersMock(), testRoutes);

      router.navigateTo(testRoutes[1].path); // /profile
      let state = router.getCurrentState();
      expect(state.currentRoute).toEqual(testRoutes[1]);

      router.navigateTo(`edit`);
      state = router.getCurrentState();
      expect(state.currentRoute).toEqual(testRoutes[2]); // /profile/edit
    });

    it(`should map dynamic paths to the correct path and provide the value`, () => {
      const routes: Array<RouteObject> = [
        createBaseRouteObject(`/`),
        createBaseRouteObject(`/collection`),
        createBaseRouteObject(`/item/:itemId`),
      ];
      const router = new Router(createHandlersMock(), routes);

      router.navigateTo(`/item/123`);
      const state = router.getCurrentState();

      expect(state.currentRoute).toEqual({
        ...routes[2],
        params: {
          itemId: `123`,
        },
      });
    });

    it(`should call the appropriate handlers when handling routes`, () => {
      const handlers = createHandlersMock();
      const router = new Router(handlers, testRoutes);

      router.navigateTo(testRoutes[1].path);
      expect(handlers.handleNavigateTo).toHaveBeenCalledTimes(1);

      router.back();
      expect(handlers.handleBack).toHaveBeenCalledTimes(1);

      router.forward();
      expect(handlers.handleForward).toHaveBeenCalledTimes(1);

      router.redirect(testRoutes[2].path);
      expect(handlers.handleRedirect).toHaveBeenCalledTimes(1);
    });
  });

  describe(`Edge cases`, () => {
    // I couldn't think of a better name for this test, but it basically tests
    // how we re-generate the state whenever re-building from external nav.
    //
    // ie. If you use the browser back button to leave the site, and then use
    // the forward button to return, when you come back the browser history
    // still has a valid history stack, but since the site re-initializes fresh
    // when returning we don't actually have history entries. In that case, we
    // have to re-build the history stack.
    it(`should handle lazy- re-initializing gracefully`, () => {
      const handlers = createHandlersMock();
      const router = new Router(handlers, testRoutes);

      const initialState = router.getCurrentState();
      expect(initialState.currentRoute?.path).toEqual(testRoutes[0].path);
      expect(initialState.cursor).toEqual(0);

      router.updateCursorFromExternal(1, testRoutes[2].path);
      const newState = router.getCurrentState();
      expect(newState.currentRoute?.path).toEqual(testRoutes[2].path);
      expect(newState.cursor).toEqual(1);
    });
  });
});
