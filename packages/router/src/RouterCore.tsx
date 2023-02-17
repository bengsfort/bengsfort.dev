import {ComponentChildren, createContext, toChildArray, VNode}        from 'preact';
import {useContext, useEffect, useImperativeHandle, useRef, useState} from 'preact/hooks';

import {RouteProps}                                                   from './components/Route';
import {Router}                                                       from './router';
import {RouterContext, RouterImplementationHandlers}                  from './types';
import {getRouteObjectFromNode}                                       from './utils';

// @todo: lazy init so we dont have to have null initial route
const defaultContext: RouterContext = {
  routes: [],
  customHistory: [],
  currentRoute: null,
  cursor: 0,
  navigateTo: _ => {},
  forward: () => {},
  back: () => {},
  redirect: () => {},
};

const Context = createContext<RouterContext>({
  ...defaultContext,
});

interface Props extends RouterImplementationHandlers {
  url: string;
  children: ComponentChildren;
}
export function RouterCore({children, url, ...handlers}: Props) {
  const routes = (toChildArray(children) as Array<VNode<RouteProps>>)
    .map(node => getRouteObjectFromNode(node));
  const router = useRef(new Router(handlers, routes, url));
  const [routerState, setRouterState] = useState(router.current.getCurrentState());
  const routerRef = useRef<unknown>();

  useEffect(() => {
    return router.current.subscribe(setRouterState);
  }, []);

  useImperativeHandle(routerRef, () => router, []);

  // @todo We need to expose a ref via useImperativeHandle
  // That way the implementations can notify the Router of
  // external changes (ie. the browser back button being pressed)


  return (
    <Context.Provider value={routerState} ref={routerRef}>
      {children}
    </Context.Provider>
  );
}

export function useRouter() {
  return useContext(Context);
}
