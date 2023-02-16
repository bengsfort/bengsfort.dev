import {createElement}          from 'preact';
import type {ComponentChildren} from 'preact';
import type {JSXInternal}       from 'preact/src/jsx';

interface Props extends JSXInternal.HTMLAttributes {
  to: string;
  children: ComponentChildren;
  as?: keyof JSXInternal.IntrinsicElements;
  class?: string;
  activeClass?: string;
}
export function Link({
  as: componentType = `a`,
  children,
  class: className,
  activeClass,
  ...props
}: Props) {
  return createElement(
    // @ts-expect-error For some reason, extending from HTMLAttributes causes a type conflict for `as`.
    // I haven't figurd out why this is, but since this is JSX generics are a bit trickier to work with.
    componentType,
    {
      children,
      class: className,
      ...props,
    },
  );
}
