import {ComponentChildren, createElement} from 'preact';
import type {JSXInternal}                 from 'preact/src/jsx';
import {useRef}                           from 'preact/hooks';
import classNames                         from 'classnames';
import {useInViewport}                    from '@hooks/useInViewport.hook';

interface Props {
  children: ComponentChildren;
  defaultStyles: string;
  visibleStyles: string;
  as?: keyof JSXInternal.IntrinsicElements;
}
export function TransitionOnVisible({children, defaultStyles, visibleStyles, as = `div`}: Props) {
  const viewRef = useRef<HTMLDivElement>(null);
  const isVisible = useInViewport(viewRef);

  return createElement(
    as,
    {
      children,
      class: classNames(defaultStyles, {[visibleStyles]: isVisible}),
      ref: viewRef,
    },
  );
}
