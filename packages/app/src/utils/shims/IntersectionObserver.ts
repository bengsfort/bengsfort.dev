let ObserverClass: typeof window.IntersectionObserver;

if (import.meta.env.SSR) {
  class ObserverShim {
    public root: null;
    public rootMargin: string;
    public readonly thresholds: Array<number>;

    private _cb: IntersectionObserverCallback;

    constructor(cb: IntersectionObserverCallback, _opts: IntersectionObserverInit = {}) {
      this.root = null;
      this.rootMargin = `0px 0px 0px 0px`;
      this.thresholds = [0, 1];
      this._cb = cb;
    }

    public observe() {}
    public unobserve() {}
    public disconnect() {}
    public takeRecords(): Array<IntersectionObserverEntry> {
      return [];
    }
  }

  ObserverClass = ObserverShim;
} else {
  ObserverClass = window.IntersectionObserver;
}

export const IntersectionObserver = ObserverClass;
