let matchMediaFn: typeof window.matchMedia;

if (import.meta.env.SSR) {
  matchMediaFn = (media: string) => ({
    matches: false,
    media,
    onchange() {},
    addListener() {},
    addEventListener() {},
    removeListener() {},
    removeEventListener() {},
    dispatchEvent() {
      return false;
    },
  });
} else {
  matchMediaFn = window.matchMedia;
}

export const matchMedia = matchMediaFn;
