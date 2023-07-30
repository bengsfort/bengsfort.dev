import {useEffect, useState} from 'preact/hooks';

import styles                from './TextCarousel.module.css';
import {useTypeTransition}   from './hooks/useTypeTransition.hook';

import {VisuallyHidden}      from '@components/VisuallyHidden';
import classNames            from 'classnames';

const listify = (items: Array<string>) => items.reduce(
  (sentence, item, i, arr) => i === arr.length - 1
    ? `${sentence} and ${item}`
    : `${sentence}${item}, `
  , ``);

interface Props {
  items: Array<string>;
  interval?: number;
}
export function TextCarousel({items, interval = 1000}: Props) {
  const [index, setIndex] = useState(0);
  const stringifiedItems = listify(items);

  const {
    currentText,
    currentTextTarget,
    typeText,
    deleteText,
  } = useTypeTransition({});

  useEffect(() => {
    if (currentText !== currentTextTarget)
      return;


    const timeout = setTimeout(() => {
      if (currentText !== ``) {
        deleteText();
        return;
      }

      const nextIndex = index === items.length - 1 ? 0 : index + 1;
      setIndex(nextIndex);
    }, interval);

    return () => {
      clearTimeout(timeout);
    };
  }, [currentText, currentTextTarget]);

  useEffect(() => {
    typeText(items[index]);
  }, [index]);

  return (
    <div class={styles.carousel}>
      <div class={classNames({
        [styles.carouselItem]: true,
        [styles.idle]: currentText === currentTextTarget,
      })} aria-hidden={`true`}>
        {currentText}
      </div>
      <VisuallyHidden>{stringifiedItems}</VisuallyHidden>
    </div>
  );
}
