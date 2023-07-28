import {MiniSection} from './MiniSection';
import styles        from './AppSection.module.css';


export function AppSection() {
  // @todo: Implement. Write copy.
  return (
    <div class={styles.sectionWrapper}>
      <div class={styles.container}>
        <h2 class={styles.header}>Apps</h2>
        <MiniSection title={`Apps`}>
          I've been lucky enough to work on a few cross-platform mobile apps over the years, primarily with React Native, where I've been able to develop a knowledge of the platform and its quirks; both from the TypeScript/JS side and the native side. I've also worked on a few desktop apps using Electron as well as natively on Mac with AppKit. I'm hoping to add more native mobile and Windows development to my toolkit in the future.
        </MiniSection>
      </div>
    </div>
  );
}
