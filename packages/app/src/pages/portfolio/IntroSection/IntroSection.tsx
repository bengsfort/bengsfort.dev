import styles                           from './IntroSection.module.css';
import {StarField}                      from './StarField';
import {EmployerLink}                   from './EmployerLink/EmployerLink';
import {TextCarousel}                   from './TextCarousel/TextCarousel';

import {useClassOnMount}                from '@hooks/useClassOnMount.hook';
import {useInViewport}                  from '@hooks/useInViewport.hook';
import {usePrefersReducedMotion}        from '@hooks/usePrefersReducedMotion.hook';
import {NoiceIcon, EpicIcon, UnityIcon} from '@assets/images/registry';
import classNames                       from 'classnames';
import {useRef}                         from 'preact/hooks';


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
          <span>and I specialise in</span>
        </div>
        <TextCarousel items={specialtyList} pause={!inViewport} />
        <p class={styles.leadText}>I am currently based in Helsinki, Finland and building cool stuff with <EmployerLink href={`https://noice.com`} iconUrl={NoiceIcon} label={`Noice`} /> (previously <EmployerLink href={`https://epicgames.com`} iconUrl={EpicIcon} label={`Epic Games`} />, <EmployerLink href={`https://unity3d.com`} iconUrl={UnityIcon} label={`Unity`} />).</p>
      </div>
    </section>
  );
}
