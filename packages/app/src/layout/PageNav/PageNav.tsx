import {Link}                                                  from '@bengsfort.dev/router';

import {Github, PortfolioIcon, LinkedIn, CvIcon, ArticlesIcon} from '../../common/assets/icons/index.js';
import {VisuallyHidden}                                        from '../../common/components/VisuallyHidden';

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
            <Link to={`/`} class={styles.navLink} activeClass={styles.active}>
              <PortfolioIcon role={`presentation`} class={styles.navIcon} />
              Portfolio</Link>
          </li>
          <li class={styles.navItem}>
            <Link to={`/cv`} class={styles.navLink} activeClass={styles.active}>
              <CvIcon role={`presentation`} class={styles.navIcon} />
              CV</Link>
          </li>
          <li class={styles.navItem}>
            <Link to={`/articles`} class={styles.navLink} activeClass={styles.active}>
              <ArticlesIcon role={`presentation`} class={styles.navIcon} />
              Articles</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
