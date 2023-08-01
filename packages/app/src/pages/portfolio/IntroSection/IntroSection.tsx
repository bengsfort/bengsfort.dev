import styles                    from './IntroSection.module.css';
import {StarField}               from './StarField';
import {TextCarousel}            from './TextCarousel/TextCarousel';

import {useClassOnMount}         from '@hooks/useClassOnMount.hook';
import {useInViewport}           from '@hooks/useInViewport.hook';
import {usePrefersReducedMotion} from '@hooks/usePrefersReducedMotion.hook';
import classNames                from 'classnames';
import {useRef}                  from 'preact/hooks';


export function IntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inViewport = useInViewport(sectionRef);

  const visible = useClassOnMount(styles.visible);
  const reduceMotion = usePrefersReducedMotion();

  const specialtyList = [
    `UI for web`,
    `UI for games`,
    `UI for mobile`,
    `Developer tooling`,
    `Game programming`,
  ];

  return (
    <section class={styles.sectionWrapper} ref={sectionRef}>
      <StarField noAnimation={reduceMotion || !inViewport} />
      <div class={classNames(styles.textWrapper, visible)}>
        <div class={styles.hero}>
          <h1>Hey, my name is <strong>Matt</strong>;</h1>
          and I specialise in
        </div>
        <TextCarousel items={specialtyList} pause={!inViewport} />
        <p class={styles.leadText}>I am currently based in Helsinki, Finland and building cool stuff with <a href={`https://noice.com`} target={`_blank`}>Noice</a> (previously <a href={`https://epicgames.com`} target={`_blank`}>Epic Games</a>, <a href={`https://unity3d.com`} target={`_blank`}>Unity Technologies</a>).</p>
      </div>
    </section>
  );
}
