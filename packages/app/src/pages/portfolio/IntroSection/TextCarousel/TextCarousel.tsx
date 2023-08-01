import {useEffect, useRef, useState} from 'preact/hooks';

import styles                        from './TextCarousel.module.css';
import {useTypeTransition}           from './hooks/useTypeTransition.hook';

import {VisuallyHidden}              from '@components/VisuallyHidden';
import classNames                    from 'classnames';

const listify = (items: Array<string>) => items.reduce(
  (sentence, item, i, arr) => i === arr.length - 1
    ? `${sentence} and ${item}`
    : `${sentence}${item}, `
  , ``);

interface Props {
  prefix?: string;
  items: Array<string>;
  emptyDuration?: number;
  interval?: number;
  pause?: boolean;
}
export function TextCarousel({items, prefix = ``, emptyDuration = 150, interval = 2000, pause = false}: Props) {
  const [index, setIndex] = useState(0);
  const stringifiedItems = listify(items);
  const nextIndexOverride = useRef<number | null>(null);

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

      let nextIndex = nextIndexOverride.current;
      if (nextIndex === null)
        nextIndex = index === items.length - 1 ? 0 : index + 1;

      nextIndexOverride.current = null;
      setIndex(nextIndex);
    }, isEmpty ? emptyDuration : interval);

    return () => {
      clearTimeout(timeout);
    };
  }, [currentText, currentTextTarget, emptyDuration, interval, pause]);

  useEffect(() => {
    typeText(items[index]);
  }, [items, index]);

  const handleIndicatorClicked = (i: number) => {
    if (i === index)
      return;

    nextIndexOverride.current = i;
    deleteText();
  };

  return (
    <div class={styles.carousel}>
      <div class={styles.carouselMain}>
        {prefix !== `` && <div class={styles.carouselPrefix}>{prefix}</div>}
        <div class={classNames({
          [styles.carouselItem]: true,
        })} aria-hidden={`true`}>
          {currentText}
        </div>
        <VisuallyHidden>{stringifiedItems}</VisuallyHidden>
      </div>
      <div class={styles.carouselIndicators}>
        {items.map((item, i) => (
          <div
            key={item}
            class={classNames({
              [styles.carouselIndicator]: true,
              [styles.active]: i === index,
            })}
            onClick={() => handleIndicatorClicked(i)}
          />
        ))}
      </div>
    </div>
  );
}
