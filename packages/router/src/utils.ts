import {VNode}       from 'preact';

import {RouteProps}  from './components/Route';
import {RouteObject} from './types';

export function getRouteObjectFromNode(node: VNode<RouteProps>): RouteObject {
  const {isDefault, path} = node.props as RouteProps;
  return {
    path,
    isDefault: isDefault ?? false,
    component: node,
  };
}
