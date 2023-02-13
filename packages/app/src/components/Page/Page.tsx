import type {ComponentChildren} from 'preact';

import {PageNav}                from '../PageNav';

interface Props {
  children: ComponentChildren;
}
export function Page({children}: Props) {
  return (
    <div>
      <PageNav />
      <main>
        {children}
      </main>
    </div>
  );
}
