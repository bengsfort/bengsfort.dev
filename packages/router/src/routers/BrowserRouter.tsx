import {ComponentChildren, createRef}              from 'preact';
import {useRef, useEffect}                         from 'preact/hooks';

import {RouterImplementationHandlers, RouterState} from '../types';
import {RouterCore}                                from '../RouterCore';

type HandleInitCb = RouterImplementationHandlers[`handleInit`];
type HandleNavigateCb = RouterImplementationHandlers[`handleNavigateTo`];
type HandleForwardCb = RouterImplementationHandlers[`handleForward`];
type HandleBackCb = RouterImplementationHandlers[`handleBack`];
type HandleRedirectCb = RouterImplementationHandlers[`handleRedirect`];

interface Props {
  children: ComponentChildren;
}
export function BrowserRouter({children}: Props) {
  const routerRef = createRef<RouterCore>();
  const initialPath = useRef(window.location.pathname);
  const routerTriggeredEvent = useRef(false);

  const handleInit: HandleInitCb = (path, state) => {
    const {cursor} = state;
    history.replaceState({cursor}, ``, path);
  };

  const handleNavigateTo: HandleNavigateCb = (path, state) => {
    const {cursor} = state;
    history.pushState({cursor}, ``, path);
  };

  const handleForward: HandleForwardCb = () => {
    routerTriggeredEvent.current = true;
    history.forward();
  };

  const handleBack: HandleBackCb = () => {
    routerTriggeredEvent.current = true;
    history.back();
  };

  const handleRedirect: HandleRedirectCb = (path, state) => {
    const {cursor} = state;
    history.replaceState({cursor}, ``, path);
  };

  useEffect(() => {
    const handlePopState = (ev: PopStateEvent) => {
      if (routerTriggeredEvent.current) {
        routerTriggeredEvent.current = false;
        return;
      }

      if (typeof ev.state !== `object` || ev.state === null) return;
      const {cursor} = ev.state as Partial<RouterState>;
      if (typeof cursor === `undefined`) return;

      routerRef.current?.updateCursorFromExternal(cursor, window.location.pathname);
    };

    window.addEventListener(`popstate`, handlePopState);
    return () => {
      window.removeEventListener(`popstate`, handlePopState);
    };
  }, []);

  return (
    <RouterCore
      url={initialPath.current}
      handleInit={handleInit}
      handleNavigateTo={handleNavigateTo}
      handleForward={handleForward}
      handleBack={handleBack}
      handleRedirect={handleRedirect}
      ref={routerRef}
    >
      {children}
    </RouterCore>
  );
}
