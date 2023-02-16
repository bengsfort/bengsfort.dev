import {ComponentChildren, createContext, toChildArray, VNode} from 'preact';
import {useContext, useEffect, useRef, useState}               from 'preact/hooks';

import {RouteProps}                                            from './components/Route';
import {Router}                                                from './router';
import {RouteObject, RouterContext}                            from './types';
import {getRouteObjectFromNode}                                from './utils';

// @todo: lazy init so we dont have to have null initial route
const defaultContext: RouterContext = {
  routes: [],
  customHistory: [],
  currentRoute: null,
  navigateTo: _ => {},
  forward: () => {},
  back: () => {},
  redirect: () => {},
};

const Context = createContext<RouterContext>({
  ...defaultContext,
});

interface Props {
  handleNavigateTo: (path: string, match?: RouteObject) => void;
  handleForward: () => void;
  handleBack: () => void;
  redirect: (path: string, match?: RouteObject) => void;
  children: ComponentChildren;
}
export function RouterCore({children, ...handlers}: Props) {
  const routes = (toChildArray(children) as Array<VNode<RouteProps>>)
    .map(node => getRouteObjectFromNode(node));
  const router = useRef(new Router(handlers, routes));
  const [routerState, setRouterState] = useState(router.current.getCurrentState());

  useEffect(() => {
    return router.current.subscribe(setRouterState);
  }, []);

  return (
    <Context.Provider value={routerState}>
      {children}
    </Context.Provider>
  );
}

export function useRouter() {
  return useContext(Context);
}
