import {createElement}               from 'preact';
import type {ComponentChildren, JSX} from 'preact';
import type {JSXInternal}            from 'preact/src/jsx';

import {useNavigateTo, useMatch}     from '../../hooks';

export interface Props extends JSXInternal.HTMLAttributes {
  to: string;
  children: ComponentChildren;
  as?: keyof JSXInternal.IntrinsicElements;
  class?: string;
  activeClass?: string;
}
export function Link({
  to,
  as: componentType = `a`,
  children,
  class: className,
  activeClass,
  onClick,
  ...props
}: Props) {
  const isActive = useMatch(to);
  const navigateTo = useNavigateTo();

  let classes = `${className}`;
  if (isActive)
    classes += ` ${activeClass}`;

  const handleOnClick: JSX.MouseEventHandler<HTMLLinkElement> = ev => {
    ev.preventDefault();

    onClick?.(ev);
    navigateTo(to);
  };

  return createElement(
    // @ts-expect-error For some reason, extending from HTMLAttributes causes a type conflict for `as`.
    // I haven't figurd out why this is, but since this is JSX generics are a bit trickier to work with.
    componentType,
    {
      children,
      onClick: handleOnClick,
      class: classes,
      ...props,
    },
  );
}
