import {ComponentChildren} from 'preact';

interface Props {
  children: ComponentChildren;
}
export function StaticRouter({children}: Props) {
  return (
    <div>
      {children}
    </div>
  );
}
