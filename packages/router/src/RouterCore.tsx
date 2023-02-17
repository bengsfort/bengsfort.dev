import {ComponentChildren, createContext, toChildArray, VNode}        from 'preact';
import {useContext, useEffect, useImperativeHandle, useRef, useState} from 'preact/hooks';
import {forwardRef}                                                   from 'preact/compat';

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
export const RouterCore = forwardRef<Router, Props>(({children, url, ...handlers}: Props, ref) => {
  const routes = (toChildArray(children) as Array<VNode<RouteProps>>)
    .map(node => getRouteObjectFromNode(node));
  const router = useRef(new Router(handlers, routes, url));
  const [routerState, setRouterState] = useState(router.current.getCurrentState());

  useEffect(() => {
    return router.current.subscribe(setRouterState);
  }, []);

  useImperativeHandle(ref, () => router.current, []);

  return (
    <Context.Provider value={routerState}>
      {children}
    </Context.Provider>
  );
});

export function useRouter() {
  return useContext(Context);
}
