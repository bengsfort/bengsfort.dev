import styles         from './IntroSection.module.css';
import {FlyoutLabels} from './FlyoutLabels';

export function IntroSection() {
  const specialtyList = [
    `Front-End`,
    `React (+Native)`,
    `Node.js`,
    `Unity`,
    `Three.js`,
  ];

  return (
    <div class={styles.textWrapper}>
      <h1 className={styles.heroHeader}>Hey, my name is <strong>Matt</strong>.</h1>
      <p className={styles.leadText}>I'm a software developer who specialises in <FlyoutLabels labels={specialtyList}>many things</FlyoutLabels> currently based in Helsinki, Finland.</p>
      <p className={styles.leadText}>I focus mainly on UI, developer tooling, and game development.</p>
    </div>
  );
}
