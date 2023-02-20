import {useMatch}                      from '../../hooks/useMatch.hook';

import {Fragment, FunctionalComponent} from 'preact';
import {useEffect}                     from 'preact/hooks';

import {RouteObject}                   from '../../types';
import {useRedirect}                   from '../../hooks';

export interface Props extends Omit<RouteObject, `component`> {
  to: string;
}
export const Redirect: FunctionalComponent<Props> = ({path, to}) => {
  const redirect = useRedirect();
  const isActive = useMatch(path);

  useEffect(() => {
    redirect(to);
  }, [isActive]);

  return <Fragment />;
};
