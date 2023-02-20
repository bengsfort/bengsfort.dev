import {ComponentChildren, createRef}                                      from 'preact';

import {HandleBackCb, HandleForwardCb, HandleNavigateCb, HandleRedirectCb} from '../types';
import {RouterCore}                                                        from '../RouterCore';
import {Router}                                                            from '../router';

interface Props {
  url: string;
  children: ComponentChildren;
}
export function StaticRouter({url, children}: Props) {
  const routerRef = createRef<Router>();

  const handleNavigateTo: HandleNavigateCb = (_path, _state) => {
    console.error(`Navigation is not available in static environments.`);
  };
  const handleForward: HandleForwardCb = () => {
    console.error(`Navigation is not available in static environments.`);
  };
  const handleBack: HandleBackCb = () => {
    console.error(`Navigation is not available in static environments.`);
  };
  const handleRedirect: HandleRedirectCb = (_path, _state) => {
    console.error(`Navigation is not available in static environments.`);
  };

  return (
    <RouterCore
      url={url}
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
