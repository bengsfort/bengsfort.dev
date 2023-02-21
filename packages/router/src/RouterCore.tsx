import {ComponentChildren, createContext, toChildArray, VNode} from 'preact';
import {useContext}                                            from 'preact/hooks';
import {PureComponent}                                         from 'preact/compat';

import {RouteProps}                                            from './components/Route';
import {Router}                                                from './router';
import {RouterContext, RouterImplementationHandlers}           from './types';
import {getRouteObjectFromNode}                                from './utils';

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

export function useRouter() {
  return useContext(Context);
}

interface Props extends RouterImplementationHandlers {
  url: string;
  children: ComponentChildren;
}

export class RouterCore extends PureComponent<Props, RouterContext> {
  private _router: Router;
  private _unsub: () => void;

  constructor(props: Props) {
    super(props);
    const {children, url, ...handlers} = props;

    const routes = (toChildArray(children) as Array<VNode<RouteProps>>)
      .map(node => getRouteObjectFromNode(node));
    this._router = new Router(handlers, routes, url);
    this._unsub = this._router.subscribe(this._onStateChange);
    this.state = {
      ...this._router.getCurrentState(),
    };
  }

  private _onStateChange = (newState: RouterContext) => {
    this.setState({
      ...newState,
    });
  };

  public componentWillUnmount(): void {
    this._unsub();
  }

  public render({children}: Props, state: RouterContext) {
    return (
      <Context.Provider value={state}>
        {children}
      </Context.Provider>
    );
  }

  public updateCursorFromExternal(cursor: number, path: string) {
    this._router.updateCursorFromExternal(cursor, path);
  }
}
