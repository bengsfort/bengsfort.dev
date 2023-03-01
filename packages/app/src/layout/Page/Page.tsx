import type {ComponentChildren} from 'preact';

import {PageNav}                from '../PageNav';

import styles                   from './Page.module.css';

interface Props {
  children: ComponentChildren;
}
export function Page({children}: Props) {
  return (
    <>
      <PageNav />
      <main class={styles.contentAreaWrapper}>
        {children}
      </main>
    </>
  );
}

Page.Container = ({children}: Props) => (
  <div class={styles.contentArea}>{children}</div>
);
