import {ComponentChildren}                                                 from 'preact';
import {useRef, useEffect}                                                 from 'preact/hooks';

import {HandleBackCb, HandleForwardCb, HandleNavigateCb, HandleRedirectCb} from '../types';
import {RouterCore}                                                        from '../RouterCore';

interface Props {
  children: ComponentChildren;
}
export function BrowserRouter({children}: Props) {
  const initialPath = useRef(window.location.pathname);
  const routerTriggeredEvent = useRef(false);

  const handleNavigateTo: HandleNavigateCb = (path, match) => {
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

      // @todo notify router instance of change of state
      // ONLY NEEDED IN THE CASE OF FORWARD/BACK WHEN WE
      // ARE NOT THE ONES THAT HAVE TRIGGERED IT!
      // (ie. when back buton on browser has been used)
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
    >
      {children}
    </RouterCore>
  );
}
