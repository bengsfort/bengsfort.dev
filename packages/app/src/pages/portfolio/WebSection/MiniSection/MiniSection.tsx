import classNames          from 'classnames';

import {useInViewport}     from '../../../../common/hooks/useInViewport.hook';

import {ComponentChildren} from 'preact';
import {useRef}            from 'preact/hooks';

import styles              from './MiniSection.module.css';

interface Props {
  title: string;
  children: ComponentChildren;
}
export function MiniSection({title, children}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useInViewport(containerRef);

  return (
    <section ref={containerRef} class={styles.container}>
      <h2 class={classNames(styles.header, isVisible && styles.active)}>{title}</h2>
      <p class={classNames(styles.content, isVisible && styles.active)}>{children}</p>
    </section>
  );
}
