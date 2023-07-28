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
        <span class={styles.heroHeader}>I'm a software developer passionate about delivering high quality experiences that feel good.</span>
        <p class={styles.leadText}>I specialise in UI for web, games, and mobile as well as developer tooling and game programming.</p>
        <p class={styles.leadText}>I am currently based in Helsinki, Finland and building cool stuff with <a href="https://noice.com" target="_blank">Noice</a> (previously <a href="https://epicgames.com" target="_blank">Epic Games</a>, <a href="https://unity3d.com" target="_blank">Unity Technologies</a>).</p>
      </div>
      <WavyText className={classNames(styles.scrollIndicator, visible)} text={`scroll`} />
    </section>
  );
}
