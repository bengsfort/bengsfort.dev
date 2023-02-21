import {ComponentChildren, createRef} from 'preact';

import {RouterCore}                   from '../RouterCore';
import {Router}                       from '../router';

interface Props {
  url: string;
  children: ComponentChildren;
}
export function StaticRouter({url, children}: Props) {
  const routerRef = createRef<Router>();

  const handleInit = () => {};
  const handleNavigateTo = () => {
    console.error(`Navigation is not available in static environments.`);
  };
  const handleForward = () => {
    console.error(`Navigation is not available in static environments.`);
  };
  const handleBack = () => {
    console.error(`Navigation is not available in static environments.`);
  };
  const handleRedirect = () => {
    console.error(`Navigation is not available in static environments.`);
  };

  return (
    <RouterCore
      url={url}
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
