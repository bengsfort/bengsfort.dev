import { BengsfortEvents, GameFocusChangedEvent } from '../utils/events';
import { makeLoggers } from '../utils/logging';

const { logDev } = makeLoggers('carousel');

const ITEM_SEPARATOR = ',';
const PROP_INIT = 'data-carousel';

const ANIMATION_SHOW_SPEED_MS = 32;
const ANIMATION_HIDE_SPEED_MS = 16;
const ANIMATION_PRESENT_DURATION_MS = 2500;
const ANIMATION_IDLE_DURATION_MS = 1000;

let carouselEl: HTMLDivElement | null = null;
let items: HTMLDivElement[] = [];

export function setupCarousel() {
  carouselEl = document.querySelector(`[${PROP_INIT}]`);

  if (!carouselEl) {
    return;
  }

  const itemStr = carouselEl.dataset.items ?? 'Missing data-items';
  const itemList = itemStr.split(ITEM_SEPARATOR);

  logDev(`Initializing carousel with items`, itemList);
  items = initItems(carouselEl, itemList);

  const { pause, resume } = carouselLoop(items);

  window.addEventListener(BengsfortEvents.gameFocusChanged, (ev) => {
    const { isFocused } = (ev as GameFocusChangedEvent).detail;
    if (isFocused) {
      pause();
    } else {
      resume();
    }
  });
}

function initItems(parent: HTMLDivElement, set: string[]): HTMLDivElement[] {
  return set.map((item) => {
    const el = document.createElement('div');
    el.className = 'carousel-item';
    el.dataset.carouselItem = 'true';

    let character: HTMLSpanElement;
    for (let i = 0; i < item.length; i++) {
      character = document.createElement('span');
      character.innerText = item[i];
      el.appendChild(character);
    }

    parent.appendChild(el);
    return el;
  });
}

type CarouselState = 'idle' | 'showing' | 'presenting' | 'hiding';

function carouselLoop(itemList: HTMLDivElement[]) {
  let activeIndex = 0;
  let activeCharIndex = 0;
  let lastActionTimestamp = -1;
  let state: CarouselState = 'showing';
  let rafHandle: number | null = null;

  const tick = (timestamp: DOMHighResTimeStamp) => {
    const activeItem = itemList[activeIndex];
    const character = activeItem.children.item(activeCharIndex);
    const lastActDelta = timestamp - lastActionTimestamp;

    switch (state) {
      case 'idle':
        if (lastActDelta < ANIMATION_IDLE_DURATION_MS) {
          break;
        }

        state = 'showing';
        activeIndex = (activeIndex + 1) % itemList.length;
        break;

      case 'presenting':
        if (lastActDelta >= ANIMATION_PRESENT_DURATION_MS) {
          state = 'hiding';
        }
        break;

      case 'showing':
        if (lastActDelta < ANIMATION_SHOW_SPEED_MS) {
          break;
        }

        if (!activeItem.classList.contains('active')) {
          activeItem.classList.add('active');
        }

        character?.classList.add('show');
        activeCharIndex++;
        lastActionTimestamp = timestamp;

        if (activeCharIndex >= activeItem.childElementCount) {
          state = 'presenting';
          activeCharIndex = activeItem.childElementCount - 1;
        }
        break;

      case 'hiding':
        if (lastActDelta < ANIMATION_HIDE_SPEED_MS) {
          break;
        }

        character?.classList.remove('show');
        activeCharIndex--;
        lastActionTimestamp = timestamp;

        if (activeCharIndex < 0) {
          state = 'idle';
          activeCharIndex = 0;
          activeItem.classList.remove('active');
        }
        break;
    }

    rafHandle = window.requestAnimationFrame(tick);
  };

  const pause = () => {
    if (rafHandle === null) {
      return;
    }

    window.cancelAnimationFrame(rafHandle);
    rafHandle = null;
  };

  const resume = () => {
    if (rafHandle !== null) {
      return;
    }

    rafHandle = window.requestAnimationFrame(tick);
  };

  resume();

  return {
    pause,
    resume,
  };
}
