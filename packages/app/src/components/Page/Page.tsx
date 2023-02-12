import {Github, LinkedIn}       from '../../assets/icons';

import type {ComponentChildren} from 'preact';

import styles                   from './Page.module.css';

interface Props {
  children: ComponentChildren;
}
export function Page({children}: Props) {
  return (
    <div>
      <header class={styles.pageNav}>
        <div class={styles.info}>
          <div class={styles.siteName}>Matt_Bengston</div>
          <div>
            <a href={`https://github.com/bengsfort`} target={`_blank`}><Github /></a>
            <a href={`https://www.linkedin.com/in/mattbengston`} target={`_blank`}><LinkedIn /></a>
          </div>
        </div>
        <nav>
          <ul>
            <li><a href={`/`}>Portfolio</a></li>
            <li><a href={`/cv`}>CV</a></li>
            <li><a href={`/articles`}>Articles</a></li>
          </ul>
        </nav>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}
