import styles         from './IntroSection.module.css';
import {FlyoutLabels} from './FlyoutLabels';
import {StarField}    from './StarField';
import {WavyText}     from './WavyText';

export function IntroSection() {
  const specialtyList = [
    `Front-End`,
    `React (+Native)`,
    `Node.js`,
    `Unity`,
    `Three.js`,
  ];

  return (
    <section class={styles.sectionWrapper}>
      <StarField />
      <div class={styles.textWrapper}>
        <h1 class={styles.heroHeader}>Hey, my name is <strong>Matt</strong>.</h1>
        <p class={styles.leadText}>I'm a software developer who specialises in <FlyoutLabels labels={specialtyList}>many things</FlyoutLabels> currently based in Helsinki, Finland.</p>
        <p class={styles.leadText}>I focus mainly on UI, developer tooling, and game development.</p>
      </div>
      <WavyText className={styles.scrollIndicator} text={`scroll`} />
    </section>
  );
}
