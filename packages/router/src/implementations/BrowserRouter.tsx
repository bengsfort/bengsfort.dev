import {ComponentChildren, createRef}                                                   from 'preact';
import {useRef, useEffect}                                                              from 'preact/hooks';

import {HandleBackCb, HandleForwardCb, HandleNavigateCb, HandleRedirectCb, RouterState} from '../types';
import {RouterCore}                                                                     from '../RouterCore';
import {Router}                                                                         from '../router';

interface Props {
  children: ComponentChildren;
}
export function BrowserRouter({children}: Props) {
  const routerRef = createRef<Router>();
  const initialPath = useRef(window.location.pathname);
  const routerTriggeredEvent = useRef(false);

  const handleNavigateTo: HandleNavigateCb = (path, match) => {
    // @todo need to update the args to be the state
    routerTriggeredEvent.current = true;
    history.pushState({...match}, ``, path);
  };

  const handleForward: HandleForwardCb = () => {
    routerTriggeredEvent.current = true;
    history.forward();
  };

  const handleBack: HandleBackCb = () => {
    routerTriggeredEvent.current = true;
    history.back();
  };

  const handleRedirect: HandleRedirectCb = (path, match) => {
    routerTriggeredEvent.current = true;
    history.replaceState({...match}, ``, path);
  };

  useEffect(() => {
    const handlePopState = (ev: PopStateEvent) => {
      if (routerTriggeredEvent.current) {
        routerTriggeredEvent.current = false;
        return;
      }

      // const {} = ev.state as Partial<RouterState>;
      // routerRef.current?.historyCursor
      if (typeof ev.state !== `object`) return;

      const {cursor} = ev.state as Partial<RouterState>;
      if (typeof cursor === `undefined`) return;

      // @todo: These that this actually correctly updates the router
      // state whenever the back/forward buttons are used.
      routerRef.current?.updateCursorFromExternal(cursor);
    };

    window.addEventListener(`popstate`, handlePopState);
    return () => {
      window.removeEventListener(`popstate`, handlePopState);
    };
  }, []);

  return (
    <RouterCore
      url={initialPath.current}
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
