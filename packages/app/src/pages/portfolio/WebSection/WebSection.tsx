import {MiniSection} from './MiniSection';
import styles        from './WebSection.module.css';


export function WebSection() {
  // @todo: Implement. Write copy.
  return (
    <div class={styles.sectionWrapper}>
      <div class={styles.container}>
        <h2 class={styles.header}>Web</h2>
        <MiniSection title={`Web`}>
          You can do so many cool things on the web and I love to take advantage of that. I primarily work on front-end using React and Three.js, but I also am comfortable working on back-end.
        </MiniSection>
      </div>
    </div>
  );
}
