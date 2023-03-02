import classNames                    from 'classnames';
import {useEffect, useRef, useState} from 'preact/hooks';

import styles                        from './StarField.module.css';

type Vec2 = { x: number, y: number };

const FPS_60 = 1000 / 60;
const asPixels = (x: number) => `${x}px`;

interface Props {
  closeMovementModifier?: number;
  farMovementModifier?: number;
  maxDistance?: number;
  throttleMs?: number;
}
export function StarField({
  closeMovementModifier = 1.5,
  farMovementModifier = 0.5,
  maxDistance = 50,
  throttleMs = FPS_60,
}: Props) {
  const lastUpdatedRef = useRef<number>(Date.now());
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<Vec2>({x: 0, y: 0});

  useEffect(() => {
    const handlePointerMove = (ev: PointerEvent) => {
      const now = Date.now();

      // Only run if the tick rate has passed.
      if (!wrapperRef.current || now - lastUpdatedRef.current < throttleMs) return;

      // Only run if the element is on screen.
      const wrapperBounds = wrapperRef.current.getBoundingClientRect();
      if (window.scrollY > wrapperBounds.bottom || window.scrollY < wrapperBounds.top) return;

      const {innerWidth, innerHeight} = window;
      const halfWidth = innerWidth * 0.5;
      const halfHeight = innerHeight * 0.5;

      const xOffset = 1 - (ev.clientX / halfWidth);
      const yOffset = 1 - (ev.pageY / halfHeight);

      setOffset({
        x: xOffset,
        y: yOffset,
      });
      lastUpdatedRef.current = now;
    };

    window.addEventListener(`pointermove`, handlePointerMove);
    return () => {
      window.removeEventListener(`pointermove`, handlePointerMove);
    };
  }, [throttleMs]);

  const closeLayer: Vec2 = {
    x: offset.x * closeMovementModifier * maxDistance,
    y: offset.y * closeMovementModifier * maxDistance,
  };
  const farLayer: Vec2 = {
    x: offset.x * farMovementModifier * maxDistance,
    y: offset.y * farMovementModifier * maxDistance,
  };

  return (
    <div class={styles.wrapper} aria-hidden={`true`} ref={wrapperRef}>
      <div
        class={classNames(styles.starLayer, styles.close)}
        style={{
          [`--layer-offset-x`]: asPixels(closeLayer.x),
          [`--layer-offset-y`]: asPixels(closeLayer.y),
        }} />
      <div
        class={classNames(styles.starLayer, styles.far)}
        style={{
          [`--layer-offset-x`]: asPixels(farLayer.x),
          [`--layer-offset-y`]: asPixels(farLayer.y),
        }} />
    </div>
  );
}
