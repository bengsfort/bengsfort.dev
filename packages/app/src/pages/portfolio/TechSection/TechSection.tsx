import {MiniSection} from './MiniSection';
import styles        from './TechSection.module.css';


export function TechSection() {
  return (
    <div class={styles.sectionWrapper}>
      <div class={styles.container}>
        <MiniSection title={`Making things feel good`}>
      Whether it’s a single page app, a dashboard, a webgl experience or even a build script, my main goal is always the same - it should feel good. While the tech may change to suit the constraints and needs of the project, I always use my learnings from over a decade building complex interfaces to make sure I meet that goal as efficiently and optimally as possible.
        </MiniSection>
        <MiniSection title={`Beyond front-end`}>
      While I love making juicy visuals for the end user, I’m no stranger to dipping my toes into the waters of logic-based programming. Express servers, Game Logic in Unity or Unreal, custom Objective-C iOS webviews, C++ node modules, type-safe IPC handlers for Electron or node.js applications, custom build scripts, I happily eat it all up. I adore lower level programming and love adding new solutions to my toolkit, so I eagerly look forward to unique new challenges even outside the realm of UI.
        </MiniSection>
      </div>
    </div>
  );
}
