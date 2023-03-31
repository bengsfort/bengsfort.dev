import styles            from './IntroSection.module.css';
import {FlyoutLabels}    from './FlyoutLabels';
import {StarField}       from './StarField';
import {WavyText}        from './WavyText';

import {useClassOnMount} from '../../../common/hooks/useClassOnMount.hook';

import classNames        from 'classnames';

import {Mountains}       from './Mountains';

export function IntroSection() {
  const specialtyList = [
    `Front-End`,
    `React (+Native)`,
    `Node.js`,
    `Unity`,
    `Three.js`,
  ];

  const visible = useClassOnMount(styles.visible);

  return (
    <section class={styles.sectionWrapper}>
      <StarField className={styles.starLayer} />
      <div class={classNames(styles.textWrapper, visible)}>
        <h1 class={styles.heroHeader}>Hey, my name is <strong>Matt</strong>.</h1>
        <p class={styles.leadText}>I'm a software developer who specialises in <FlyoutLabels labels={specialtyList}>many things</FlyoutLabels> currently based in Helsinki, Finland.</p>
        <p class={styles.leadText}>I focus mainly on UI, developer tooling, and game development.</p>
      </div>
      <div class={styles.mountainLayer} role={`presentation`}><Mountains /></div>
      <WavyText className={classNames(styles.scrollIndicator, visible)} text={`scroll`} />
    </section>
  );
}