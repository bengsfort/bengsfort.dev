import {ComponentChildren, createElement} from 'preact';
import type {JSXInternal}                 from 'preact/src/jsx';

import styles                             from './VisuallyHidden.module.css';

interface Props {
  children: ComponentChildren;
  as?: keyof JSXInternal.IntrinsicElements;
}
export function VisuallyHidden({children, as = `div`}: Props) {
  return createElement(
    as,
    {
      children,
      class: styles.visuallyHidden,
    },
  );
}
