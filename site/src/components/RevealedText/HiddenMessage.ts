const ACTIVE_CLASS = 'reveal-your-secrets';

const PREVIEW_DATA_ATTR = 'data-preview';
const MESSAGE_DATA_ATTR = 'data-hidden';

type State = 'preview' | 'anim-in' | 'anim-out' | 'active';

/**
 * @todo Finish animation.
 * 1. On hover: Fade out preview, one-by-one fade in message nodes.
 * 2. On leave: One-by-one fade out message nodes, pop preview back.
 *
 * Note: This effect is doable via 100% css using a clipped linear-gradient background;
 * however this is not an option in this case due to my use case requiring a link, which
 * would not use the gradient and cause the animation to look silly.
 *
 * @see https://www.youtube.com/watch?v=d10GaL6F-lA
 */
export class HiddenMessage extends HTMLElement {
  #_preview: HTMLElement;
  #_message: HTMLElement;
  #_state: State;

  constructor() {
    super();

    const preview = this.querySelector<HTMLElement>(`[${PREVIEW_DATA_ATTR}]`);
    if (!preview) {
      throw new Error(`Missing HiddenMessage ${PREVIEW_DATA_ATTR} element!`);
    }

    const message = this.querySelector<HTMLElement>(`[${MESSAGE_DATA_ATTR}]`);
    if (!message) {
      throw new Error(`Missing HiddenMessage ${MESSAGE_DATA_ATTR} element!`);
    }

    this.#_preview = preview;
    this.#_message = message;

    // Ensure we start with preview-only.
    this.classList.remove(ACTIVE_CLASS);
    this.#_state = 'preview';

    this.addEventListener('pointerleave', this.#onElementMouseOut);
    this.#_preview.addEventListener('pointerenter', this.#onPreviewMouseIn);
  }

  #onPreviewMouseIn = (): void => {
    if (this.#_state !== 'preview') {
      return;
    }

    // @todo - anim-in and start up the animation
    // Make sure the sequential node fades happen AFTER the preview fade
    this.#_state = 'active';
    this.classList.add(ACTIVE_CLASS);
  };

  #onElementMouseOut = (): void => {
    if (this.#_state === 'anim-out') {
      return;
    }

    // @todo - anim-out and start up the animation.
    this.#_state = 'preview';
    this.classList.remove(ACTIVE_CLASS);
  };
}
