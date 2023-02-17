import type {ComponentChildren, FunctionalComponent} from 'preact';
import {RouteObject}                                 from 'types';

export interface Props extends Omit<RouteObject, `component`> {
  children: ComponentChildren;
}
export const Route: FunctionalComponent<Props> = ({path, children, isDefault}) => {
  return (
    <>{children}</>
  );
};
