import {ComponentChildren, Fragment, FunctionalComponent} from 'preact';

import {useMatch}                                         from '../../hooks/useMatch.hook';
import {RouteObject}                                      from '../../types';

export interface Props extends Omit<RouteObject, `component`> {
  children: ComponentChildren;
}
export const Route: FunctionalComponent<Props> = ({path, children}) => {
  const isActive = useMatch(path);

  if (isActive)
    return <Fragment>{children}</Fragment>;

  return null;
};
