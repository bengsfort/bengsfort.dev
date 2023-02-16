import {ComponentChildren} from 'preact';

interface Props {
  children: ComponentChildren;
}
export function BrowserRouter({children}: Props) {
  return (
    <div>
      {children}
    </div>
  );
}
