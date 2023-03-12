import {Link} from '@bengsfort.dev/router';

import styles from './PageNav.module.css';

export function PageNav() {
  return (
    <header class={styles.pageNav}>
      <div class={styles.container}>
        <div class={styles.siteName}>Matt Bengston</div>
        <nav aria-label={`Main Menu`} class={styles.siteNav}>
          <ul class={styles.navList}>
            <li class={styles.navItem}>
              <Link to={`/`} class={styles.navLink} activeClass={styles.active}>
                Portfolio
              </Link>
            </li>
            <li class={styles.navItem}>
              <Link to={`/cv`} class={styles.navLink} activeClass={styles.active}>
                CV
              </Link>
            </li>
            <li class={styles.navItem}>
              <Link to={`/articles`} class={styles.navLink} activeClass={styles.active}>
                Articles
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
