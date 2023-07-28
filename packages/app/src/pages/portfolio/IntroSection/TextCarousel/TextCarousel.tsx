import { useState } from "preact/hooks";
import styles from './TextCarousel.module.css';
import { useTypeTransition } from "./hooks/useTypeTransition.hook";

interface Props {
  items: string[];
  interval?: number;
  transitionTime?: number;
}
export function TextCarousel({items, interval = 1000, transitionTime = 500}: Props) {
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const handleTransitionEnd = () => {
    console.log('transition end');
    setTransitioning(false);
    setTimeout(() => {
      setIndex((index + 1) % items.length);
    }, interval);
  };

  const currentText = useTypeTransition({
    text: items[index],
    delay: interval,
    duration: transitionTime,
    onFinished: handleTransitionEnd,
  });

  return (
    <div class={styles.container}>
      <div class={styles.carouselItem}>{currentText}</div>
    </div>
  );
}
