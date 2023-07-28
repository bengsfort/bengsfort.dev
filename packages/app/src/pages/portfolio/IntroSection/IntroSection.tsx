import styles                                     from './IntroSection.module.css';
import {FlyoutLabels}                             from './FlyoutLabels';
import {StarField}                                from './StarField';
import {WavyText}                                 from './WavyText';

import {useClassOnMount, usePrefersReducedMotion} from '../../../common/hooks';

import classNames                                 from 'classnames';
import { TextCarousel } from './TextCarousel/TextCarousel';


export function IntroSection() {
  const specialtyList = [
    `UI for web`,
    `UI for games`,
    `UI for mobile`,
    `Developer tooling`,
    `Game programming`,
  ];

  const visible = useClassOnMount(styles.visible);
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section class={styles.sectionWrapper}>
      <StarField className={styles.starLayer} noAnimation={reduceMotion} />
      <div class={classNames(styles.textWrapper, visible)}>
        <div class={styles.hero}>
          <h1>Hey, my name is <strong>Matt</strong>.</h1> I'm a software developer passionate about high quality experiences that <em class={styles.emphasizedText}>feel good</em>. I specialise in
        </div>
        <TextCarousel items={specialtyList} interval={2000} transitionTime={1000} />
        <p class={styles.leadText}>I specialise in UI for web, games, and mobile as well as developer tooling and game programming.</p>
        <p class={styles.leadText}>I am currently based in Helsinki, Finland and building cool stuff with <a href="https://noice.com" target="_blank">Noice</a> (previously <a href="https://epicgames.com" target="_blank">Epic Games</a>, <a href="https://unity3d.com" target="_blank">Unity Technologies</a>).</p>
      </div>
      <WavyText className={classNames(styles.scrollIndicator, visible)} text={`scroll`} />
    </section>
  );
}
