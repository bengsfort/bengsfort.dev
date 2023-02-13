import {Github, PortfolioIcon, LinkedIn, CvIcon, ArticlesIcon} from '../../assets/icons';
import {VisuallyHidden}                                        from '../VisuallyHidden';

import styles                                                  from './PageNav.module.css';

export function PageNav() {
  return (
    <header class={styles.pageNav}>
      <div class={styles.siteInfo}>
        <div class={styles.siteName}>Matt_Bengston</div>
        <div class={styles.socialLinks}>
          <a href={`https://github.com/bengsfort`} target={`_blank`} class={styles.socialItem}>
            <Github aria-hidden={`true`} />
            <VisuallyHidden as={`span`}>View my Github</VisuallyHidden>
          </a>
          <a href={`https://www.linkedin.com/in/mattbengston`} target={`_blank`} class={styles.socialItem}>
            <LinkedIn aria-hidden={`true`} />
            <VisuallyHidden as={`span`}>View my Linked In</VisuallyHidden>
          </a>
        </div>
      </div>
      <nav aria-label={`Main Menu`}>
        <ul class={styles.navList}>
          <li class={styles.navItem}>
            <a href={`/`} class={styles.navLink}>
              <PortfolioIcon role={`presentation`} class={styles.navIcon} />
              Portfolio</a>
          </li>
          <li class={styles.navItem}>
            <a href={`/cv`} class={styles.navLink}>
              <CvIcon role={`presentation`} class={styles.navIcon} />
              CV</a>
          </li>
          <li class={styles.navItem}>
            <a href={`/articles`} class={styles.navLink}>
              <ArticlesIcon role={`presentation`} class={styles.navIcon} />
              Articles</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
