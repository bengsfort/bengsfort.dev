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
  emptyDuration?: number;
  interval?: number;
  pause?: boolean;
}
export function TextCarousel({items, emptyDuration = 350, interval = 2000, pause}: Props) {
  const [index, setIndex] = useState(0);
  const stringifiedItems = listify(items);

  const {
    currentText,
    currentTextTarget,
    typeText,
    deleteText,
  } = useTypeTransition({});

  useEffect(() => {
    if (currentText !== currentTextTarget || pause)
      return;

    const isEmpty = currentText === ``;
    const timeout = setTimeout(() => {
      if (!isEmpty) {
        deleteText();
        return;
      }

      const nextIndex = index === items.length - 1 ? 0 : index + 1;
      setIndex(nextIndex);
    }, isEmpty ? emptyDuration : interval);

    return () => {
      clearTimeout(timeout);
    };
  }, [currentText, currentTextTarget, emptyDuration, interval, pause]);

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
