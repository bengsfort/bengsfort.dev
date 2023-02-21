import type {ComponentChildren} from 'preact';

import {PageNav}                from '../PageNav/index.js';

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
