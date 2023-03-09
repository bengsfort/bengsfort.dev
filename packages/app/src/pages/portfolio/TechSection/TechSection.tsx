import classNames      from 'classnames';

import {useInViewport} from '../../../common/hooks/useInViewport.hook';

import {useRef}        from 'preact/hooks';

import styles          from './TechSection.module.css';

export function TechSection() {
  const labelRef = useRef<HTMLDivElement>(null);
  const visible = useInViewport(labelRef);

  return (
    <section class={styles.sectionWrapper}>
      <div class={classNames(styles.label, visible && styles.visible)} ref={labelRef}>Hello</div>
    </section>
  );
}
