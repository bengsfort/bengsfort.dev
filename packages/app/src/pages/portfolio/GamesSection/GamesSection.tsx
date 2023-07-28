import {MiniSection} from './MiniSection';
import styles        from './GamesSection.module.css';


export function GamesSection() {
  // @todo: Implement. Write copy.
  return (
    <div class={styles.sectionWrapper}>
      <div class={styles.container}>
        <h2 class={styles.header}>Games</h2>
        <MiniSection title={`Games`}>
        Modding games drove my interest in programming as a kid and game development continues to be a passion of mine. While difficult at times, game programming is always interesting and rewarding; and game UI's are always fun due to being able to amp up the juice to help make the game feel more alive. I've worked on a few games over the years, both professionally and as a hobbyist, and I'm always looking for more opportunities to create something fun and memorable.
        </MiniSection>
      </div>
    </div>
  );
}
