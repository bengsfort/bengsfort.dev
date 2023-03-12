import styles                from './TechSection.module.css';

import {TransitionOnVisible} from '../../../common/components';

export function TechSection() {
  return (
    <section class={styles.sectionWrapper}>
      <TransitionOnVisible defaultStyles={styles.label} visibleStyles={styles.visible}>Hello</TransitionOnVisible>
    </section>
  );
}
