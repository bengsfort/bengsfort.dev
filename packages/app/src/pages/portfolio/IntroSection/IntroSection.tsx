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

  // @todo: Update this copy.
  /*
  I'm a software developer passionate about delivering high quality experiences that feel good.
  I specialise in UI for web, games, and mobile as well as developer tooling and game programming.
  I'm currently based in Helsinki, Finland, and am working at Noice (previously Epic Games and Unity Technologies).
  */
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
