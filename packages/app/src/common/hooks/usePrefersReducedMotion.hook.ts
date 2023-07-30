import {useEffect, useState} from 'preact/hooks';
import {matchMedia}          from '@utils/shims';

type QueryListener = (matches: boolean) => void;

// We use a factory here so that we don't have to make media queries every time
// the hook is called. Instead, we can just make one query and then use it for
// all the hooks.
const queryFactory = () => {
  const query = matchMedia(`(prefers-reduced-motion: reduce)`);
  let cachedPrefersReducedMotion = query.matches;

  const hookCallbacks = new Set<QueryListener>();

  const backgroundListener = (e: MediaQueryListEvent) => {
    cachedPrefersReducedMotion = e.matches;
    hookCallbacks.forEach(cb => cb(e.matches));
  };

  query.addEventListener(`change`, backgroundListener);

  // We use these two functions in the hooks so that we don't have to
  // re-create a new listener doing the same thing every time the hook
  // triggers. Instead, we can have just one single listener on the query
  // and then call the callbacks that the hooks have registered whenever
  // the query changes. This way there is only one actual listener no matter
  // now many hooks are using it.
  const addListener = (cb: QueryListener) => {
    hookCallbacks.add(cb);
  };

  const removeListener = (cb: QueryListener) => {
    hookCallbacks.delete(cb);
  };

  /**
   * Returns a boolean indicating whether the user has requested the system
   * minimize the amount of motion it uses.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
   */
  return function usePrefersReducedMotionFn(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(cachedPrefersReducedMotion);

    useEffect(() => {
      addListener(setPrefersReducedMotion);
      return () => {
        removeListener(setPrefersReducedMotion);
      };
    }, []);

    return prefersReducedMotion;
  };
};

export const usePrefersReducedMotion = queryFactory();
