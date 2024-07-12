const ANIMATION_SHOW_SPEED_MS = 48;
const ANIMATION_HIDE_SPEED_MS = 32;
const ANIMATION_PRESENT_DURATION_MS = 2500;
const ANIMATION_IDLE_DURATION_MS = 1000;

type CarouselState = 'idle' | 'showing' | 'presenting' | 'hiding';

export class Carousel extends HTMLElement {
  #_itemList: HTMLDivElement[];

  #_activeIndex = 0;
  #_activeCharIndex = 0;
  #_lastActionTimestamp = -1;
  #_state: CarouselState = 'showing';
  #_rafHandle: number | null = null;

  constructor() {
    super();

    this.#_itemList = [...this.querySelectorAll<HTMLDivElement>('.carousel-item')];
    this.#_rafHandle = window.requestAnimationFrame(this.#tick);
  }

  public pause(): void {
    if (this.#_rafHandle === null) {
      return;
    }

    window.cancelAnimationFrame(this.#_rafHandle);
    this.#_rafHandle = null;
  }

  public resume(): void {
    if (this.#_rafHandle !== null) {
      return;
    }

    this.#_rafHandle = window.requestAnimationFrame(this.#tick);
  }

  #handleIdle(lastActDelta: number): void {
    if (lastActDelta < ANIMATION_IDLE_DURATION_MS) {
      return;
    }

    this.#_state = 'showing';
    this.#_activeIndex = (this.#_activeIndex + 1) % this.#_itemList.length;
  }

  #handlePresenting(lastActDelta: number): void {
    if (lastActDelta >= ANIMATION_PRESENT_DURATION_MS) {
      this.#_state = 'hiding';
    }
  }

  #handleShowing(lastActDelta: number, timestamp: number): void {
    if (lastActDelta < ANIMATION_SHOW_SPEED_MS) {
      return;
    }

    const activeItem = this.#_itemList[this.#_activeIndex] as HTMLDivElement;
    const character = activeItem?.children.item(this.#_activeCharIndex);

    if (!activeItem.classList.contains('active')) {
      activeItem.classList.add('active');
    }

    character?.classList.add('show');
    this.#_activeCharIndex++;
    this.#_lastActionTimestamp = timestamp;

    if (this.#_activeCharIndex >= activeItem.childElementCount) {
      this.#_state = 'presenting';
      this.#_activeCharIndex = activeItem.childElementCount - 1;
    }
  }

  #handleHiding(lastActDelta: number, timestamp: number): void {
    if (lastActDelta < ANIMATION_HIDE_SPEED_MS) {
      return;
    }

    const activeItem = this.#_itemList[this.#_activeIndex] as HTMLDivElement;
    const character = activeItem?.children.item(this.#_activeCharIndex);

    character?.classList.remove('show');
    this.#_activeCharIndex--;
    this.#_lastActionTimestamp = timestamp;

    if (this.#_activeCharIndex < 0) {
      this.#_state = 'idle';
      this.#_activeCharIndex = 0;
      activeItem.classList.remove('active');
    }
  }

  #tick = (timestamp: DOMHighResTimeStamp): void => {
    const lastActDelta = timestamp - this.#_lastActionTimestamp;

    switch (this.#_state) {
      case 'idle':
        this.#handleIdle(lastActDelta);
        break;

      case 'presenting':
        this.#handlePresenting(lastActDelta);
        break;

      case 'showing':
        this.#handleShowing(lastActDelta, timestamp);
        break;

      case 'hiding':
        this.#handleHiding(lastActDelta, timestamp);
        break;
    }

    this.#_rafHandle = window.requestAnimationFrame(this.#tick);
  };
}
