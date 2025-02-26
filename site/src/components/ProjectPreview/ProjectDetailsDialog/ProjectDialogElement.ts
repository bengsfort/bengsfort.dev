const ACTIVE_CLASS = 'active';

const normalizeTransitionEvent = (ev: TransitionEvent): string => {
  const el = ev.target as HTMLElement;

  let result = el.nodeName;
  if ('' !== el.id) {
    result += `#${el.id}`;
  }

  const classes = [...el.classList].join('.');
  if ('' !== classes) {
    result += `.${classes}`;
  }

  return `${result}${ev.pseudoElement}_${ev.propertyName}`;
};

/**
 * Web Component for wrapping Dialog to enable more fluent transitions and interactions.
 *
 * While the native <dialog> API's, particularly the CSS animation interactions, are great,
 * they can be slightly limited when it comes to additionally animating child elements too.
 *
 * Particularly when the dialog should close; unless using the display transitions seamless
 * exit transitions can be rough. The aim of this class is to provide a wrapper that allows
 * fine grained control over all of the interactions to provide a high fidelity transitions.
 */
export class ProjectDialogElement extends HTMLElement {
  #_dialog: HTMLDialogElement;
  /**
   * Note: Given duplicates, a transition COULD be removed early as Set enforces uniqueness.
   * If this becomes a problem, can switch to a Map<HTMLElement, Set<string>> for safety.
   */
  #_animatedEls: Set<string> = new Set();
  #_videoPlayer: HTMLVideoElement;

  #_isTransitioningOut: boolean = false;

  public get isOpen(): boolean {
    return this.#_dialog.open;
  }

  constructor() {
    super();

    this.#_videoPlayer = this.querySelector('.video-player') as HTMLVideoElement;
    this.#_dialog = this.querySelector('dialog') as HTMLDialogElement;
    if (this.#_dialog.open) {
      this.#_dialog.classList.add(ACTIVE_CLASS);
    } else {
      this.#_dialog.classList.remove(ACTIVE_CLASS);
    }

    this.#_dialog.addEventListener('transitionrun', this.#handleTransitionCreated);
    this.#_dialog.addEventListener('transitionend', this.#handleTransitionEnded);
    this.#hijackDialogClose();
  }

  public show(): void {
    if (this.isOpen) {
      return;
    }

    this.#_dialog.showModal();
    this.#_dialog.classList.add(ACTIVE_CLASS);
    document.body.style.overflow = 'hidden';
    this.#_videoPlayer.play();
  }

  public hide = (): void => {
    if (!this.isOpen || this.#_isTransitioningOut) {
      return;
    }

    this.#_videoPlayer.pause();
    this.#_isTransitioningOut = true;
    this.#_dialog.classList.remove(ACTIVE_CLASS);
    document.body.style.overflow = 'inherit';
  };

  #hijackDialogClose(): void {
    window.addEventListener('keydown', this.#handleHijackClose);
    this.querySelectorAll('[data-close-modal]').forEach((btn) => {
      btn.addEventListener('click', this.hide);
    });
  }

  #handleHijackClose = (event: KeyboardEvent): void => {
    if (!this.isOpen || event.key !== 'Escape') {
      return;
    }

    event.preventDefault();
    this.hide();
  };

  #handleTransitionCreated = (event: TransitionEvent): void => {
    if (!this.#_isTransitioningOut) {
      return;
    }

    const transition = normalizeTransitionEvent(event);
    this.#_animatedEls.add(transition);
  };

  #handleTransitionEnded = (event: TransitionEvent): void => {
    if (!this.#_isTransitioningOut) {
      return;
    }

    const transition = normalizeTransitionEvent(event);
    this.#_animatedEls.delete(transition);

    if (this.#_animatedEls.size > 0) {
      return;
    }

    this.#_dialog.close();
    this.#_isTransitioningOut = false;
  };
}

customElements.define('project-dialog', ProjectDialogElement);
