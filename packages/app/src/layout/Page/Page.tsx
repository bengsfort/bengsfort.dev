import type {ComponentChildren} from 'preact';
import classNames               from 'classnames';

import {PageNav}                from '../PageNav';

import styles                   from './Page.module.css';

interface Props {
  hasNoPadding?: boolean;
  children: ComponentChildren;
}
export function Page({children, hasNoPadding = false}: Props) {
  return (
    <>
      <PageNav />
      <main class={classNames(styles.contentAreaWrapper, {[styles.noPadding]: hasNoPadding})}>
        {children}
      </main>
    </>
  );
}

Page.Container = ({children}: Props) => (
  <div class={styles.contentArea}>{children}</div>
);
