import {MutableRef, StateUpdater, useEffect, useState} from 'preact/hooks';
import {IntersectionObserver}                          from '@utils/shims';

const observerHookFactory = (opts: IntersectionObserverInit) => {
  const targetDispatchMap = new Map<Element, StateUpdater<boolean>>();

  // Set up an observer to dispatch visibility to the cached handlers.
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const dispatcher = targetDispatchMap.get(entry.target);
      dispatcher?.(entry.isIntersecting);
    });
  }, opts);

  return function useObserverHook<T extends Element | null>(target: MutableRef<T>): boolean {
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
      if (target.current === null) return;

      targetDispatchMap.set(target.current, setVisible);
      observer.observe(target.current);

      return () => {
        if (target.current === null) return;

        observer.unobserve(target.current);
        targetDispatchMap.delete(target.current);
      };
    }, []);

    return visible;
  };
};

export const useInViewport = observerHookFactory({
  root: null,
  threshold: 1,
});
