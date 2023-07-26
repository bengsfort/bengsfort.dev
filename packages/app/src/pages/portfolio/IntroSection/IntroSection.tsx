import styles                                     from './IntroSection.module.css';
import {FlyoutLabels}                             from './FlyoutLabels';
import {StarField}                                from './StarField';
import {WavyText}                                 from './WavyText';

import {useClassOnMount, usePrefersReducedMotion} from '../../../common/hooks';

import classNames                                 from 'classnames';


export function IntroSection() {
  const specialtyList = [
    `Front-End`,
    `React (+Native)`,
    `Node.js`,
    `Unity`,
    `Three.js`,
  ];

  const visible = useClassOnMount(styles.visible);
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section class={styles.sectionWrapper}>
      <StarField className={styles.starLayer} noAnimation={reduceMotion} />
      <div class={classNames(styles.textWrapper, visible)}>
        <h1 class={styles.heroHeader}>Hey, my name is <strong>Matt</strong>.</h1>
        <p class={styles.leadText}>I'm a software developer who specialises in <FlyoutLabels labels={specialtyList}>many things</FlyoutLabels> currently based in Helsinki, Finland.</p>
        <p class={styles.leadText}>I focus mainly on UI, developer tooling, and game development.</p>
      </div>
      <WavyText className={classNames(styles.scrollIndicator, visible)} text={`scroll`} />
    </section>
  );
}
