import type {ComponentChildren} from 'preact';

export interface Props {
  path: string;
  children: ComponentChildren;
  isDefault?: boolean;
}
export function Route({path, children, isDefault}: Props) {
  return (
    <>{children}</>
  );
}
